import { MetadataRoute } from "next";

import { locales } from "@repo/types";

import config from "@/lib/config";
import { localizeUrl } from "@/lib/i18n";
import { createProductSlug } from "@/lib/string-utils";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const getLocalizedEntries = ({
		pathname,
		lastModified,
		changeFrequency,
		priority,
	}: {
		pathname: string;
		lastModified: Date;
		changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
		priority: number;
	}): MetadataRoute.Sitemap => {
		return locales.map((locale) => ({
			url: localizeUrl(pathname, locale),
			lastModified,
			changeFrequency,
			priority,
		}));
	};

	const staticPages: MetadataRoute.Sitemap = [
		// Core pages
		...getLocalizedEntries({
			pathname: "/",
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 1,
		}),
		...getLocalizedEntries({
			pathname: "/products",
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 0.95,
		}),
		// About & Contact
		...getLocalizedEntries({
			pathname: "/about",
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		}),
		...getLocalizedEntries({
			pathname: "/contact",
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.7,
		}),
		// Blog / Advisory
		...getLocalizedEntries({
			pathname: "/tu-van",
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.85,
		}),
		// Policy pages
		...getLocalizedEntries({
			pathname: "/privacy-policy",
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 0.4,
		}),
		...getLocalizedEntries({
			pathname: "/terms-of-service",
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 0.4,
		}),
		...getLocalizedEntries({
			pathname: "/shipping-policy",
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 0.5,
		}),
		...getLocalizedEntries({
			pathname: "/refund-policy",
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 0.5,
		}),
	];

	// Dynamic product pages
	let productPages: MetadataRoute.Sitemap = [];
	try {
		const res = await fetch(`${config.serverUrl}/products`);
		if (res.ok) {
			const products: any[] = await res.json();
			productPages = products.flatMap((product) => {
				const slug = createProductSlug(product.name?.en || "", product._id);
				return getLocalizedEntries({
					pathname: `/product/${slug}`,
					lastModified: new Date(product.updatedAt || product.createdAt || Date.now()),
					changeFrequency: "weekly",
					priority: 0.9,
				});
			});
		}
	} catch (error) {
		console.error("Failed to fetch products for sitemap:", error);
	}

	// Dynamic category pages
	let categoryPages: MetadataRoute.Sitemap = [];
	try {
		const res = await fetch(`${config.serverUrl}/categories/tree`);
		if (res.ok) {
			const categoryTree: any[] = await res.json();
			const allCategories = categoryTree.flatMap((cat: any) => [...cat.children, cat]);
			categoryPages = allCategories.flatMap((category) => {
				return getLocalizedEntries({
					pathname: `/category/${category.slug}`,
					lastModified: new Date(category.updatedAt || category.createdAt || Date.now()),
					changeFrequency: "weekly",
					priority: 0.85,
				});
			});
		}
	} catch (error) {
		console.error("Failed to fetch categories for sitemap:", error);
	}

	return [...staticPages, ...productPages, ...categoryPages];
}

