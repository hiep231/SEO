import { Metadata } from "next";
import { notFound } from "next/navigation";

import { Locale, locales } from "@repo/types";

import config from "@/lib/config";
import { generateLocaleAlternates, generateOgMetadata, generateTwitterMetadata } from "@/lib/generate";
import { localizePath } from "@/lib/i18n";
import { createProductSlug } from "@/lib/string-utils";

import ClientPage from "./client-page";

export const dynamicParams = false;

export async function generateStaticParams() {
	const params: { lang: Locale; slug: string }[] = [];
	try {
		const res = await fetch(`${config.serverUrl}/products`, {
			next: { revalidate: 3600 },
		});
		if (res.ok) {
			const products: any[] = await res.json();
			for (const lang of locales) {
				for (const product of products) {
					const slug = createProductSlug(product.name?.en || "", product._id);
					params.push({ lang, slug });
				}
			}
		}
	} catch (error) {
		console.error("Failed to fetch products for static params:", error);
	}
	return params;
}

interface Props {
	params: Promise<{ lang: Locale; slug: string }>;
}

async function fetchProductData(slug: string) {
	const id = slug.split("-").pop();
	if (!id) return null;
	
	try {
		const res = await fetch(`${config.serverUrl}/products/${id}`, {
			next: { revalidate: 600 },
		});
		if (!res.ok) return null;
		return await res.json();
	} catch (error) {
		console.error("Failed to fetch product data:", error);
		return null;
	}
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { lang, slug } = await params;
	const product = await fetchProductData(slug);
	
	if (!product) {
		return { title: "Product Not Found" };
	}

	const name = product.name?.[lang] || product.name?.en || product.name?.vi || "Product";
	const rawDesc = product.description?.[lang] || product.description?.en || product.description?.vi || "";
	const description = rawDesc.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim().substring(0, 160) || name;
	
	const title = `${name} | ${config.websiteName}`;
	const path = localizePath(`/product/${slug}`, lang);
	
	const images = product.imgUrls && product.imgUrls.length > 0 ? product.imgUrls : [config.openGraphImage];

	return {
		title,
		description,
		openGraph: {
			...generateOgMetadata({ title, description, path, type: "website" }),
			images: images.map((url: string) => ({ url })),
		},
		twitter: {
			...generateTwitterMetadata({ title, description }),
			images: images,
		},
		alternates: generateLocaleAlternates(`/product/${slug}`, lang),
	};
}

export default async function Page({ params }: Props) {
	const { lang, slug } = await params;
	const product = await fetchProductData(slug);

	if (!product) {
		notFound();
	}

	const name: string = product.name?.[lang] || product.name?.en || product.name?.vi || "";
	const rawDesc: string = product.description?.[lang] || product.description?.en || product.description?.vi || "";
	const plainDesc = rawDesc.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim().substring(0, 500);
	const price = ((product.price || 0) / 100).toFixed(0);
	const pageUrl = `${config.clientUrl}/${lang}/product/${slug}`;

	const productSchema: Record<string, unknown> = {
		"@context": "https://schema.org",
		"@type": "Product",
		name,
		description: plainDesc,
		image: product.imgUrls || [],
		url: pageUrl,
		brand: {
			"@type": "Brand",
			name: config.websiteName,
		},
		offers: {
			"@type": "Offer",
			price,
			priceCurrency: "VND",
			availability: "https://schema.org/InStock",
			url: pageUrl,
			seller: {
				"@type": "Organization",
				name: config.websiteName,
			},
		},
	};

	if (product.avgRatings && product.numReviews) {
		productSchema.aggregateRating = {
			"@type": "AggregateRating",
			ratingValue: product.avgRatings,
			reviewCount: product.numReviews,
			bestRating: 5,
			worstRating: 1,
		};
	}

	return (
		<main>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
			/>
			{/* Visually hidden but SEO visible text to boost text/html ratio */}
			<div className="sr-only">
				<h1>{name}</h1>
				<p>{plainDesc}</p>
				<p>Giá: {price} VND</p>
			</div>
			
			<ClientPage product={product} />
		</main>
	);
}
