import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Locale } from "@repo/types";
import { categoriesService } from "@/services/categories-service";
import { productsService } from "@/services/products-service";
import { Container } from "@/components/common/container";
import ProductCard from "@/components/common/product-card";
import { Section } from "@/components/common/section";
import config from "@/lib/config";
import { generateLocaleAlternates, generateOgMetadata, generateTwitterMetadata } from "@/lib/generate";
import { localizePath } from "@/lib/i18n";

interface Props {
	params: Promise<{ slug: string; lang: Locale }>;
}

export default async function CategoryPage({ params }: Props) {
	const { slug, lang } = await params;

	const categoryTree = await categoriesService.getCategoryTree();
	const categories = categoryTree.flatMap((cat) => [...cat.children, cat]);
	const targetCategory = categories.find((c) => c.slug === slug);

	if (!targetCategory) {
		notFound();
	}

	const products = await productsService.getAllProducts({
		query: { category: targetCategory._id },
	});

	return (
		<main className="bg-background min-h-screen py-8">
			<Container>
				<Section>
					<h1 className="text-3xl font-bold mb-6">{targetCategory.name[lang]}</h1>
					<p className="text-muted-foreground mb-8">
						Khám phá danh sách các sản phẩm {targetCategory.name[lang].toLowerCase()} chính hãng, chất lượng tốt nhất tại {config.websiteName}.
					</p>

					{products.length === 0 ? (
						<div className="text-center py-12 text-muted-foreground">
							Hiện tại chưa có sản phẩm nào trong danh mục này.
						</div>
					) : (
						<div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
							{products.map((item) => (
								<ProductCard key={item._id} data={item} />
							))}
						</div>
					)}
				</Section>
			</Container>
		</main>
	);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug, lang } = await params;

	const categoryTree = await categoriesService.getCategoryTree();
	const categories = categoryTree.flatMap((cat) => [...cat.children, cat]);
	const targetCategory = categories.find((c) => c.slug === slug);

	if (!targetCategory) {
		return {
			title: "Category Not Found",
			description: "This category does not exist",
			robots: "noindex, follow",
		};
	}

	const categoryName = targetCategory.name[lang];
	const path = `/category/${slug}`;

	return {
		title: `${categoryName} Chính Hãng | ${config.websiteName}`,
		description: `Mua sắm ${categoryName.toLowerCase()} chính hãng, giá tốt nhất. Phụ kiện công nghệ cao cấp, bảo hành 1 đổi 1.`,
		keywords: [categoryName, "chính hãng", "mua sắm", "công nghệ", config.websiteName],
		authors: [{ name: config.websiteName }],
		openGraph: generateOgMetadata({
			title: `${categoryName} Chính Hãng`,
			description: `Mua sắm ${categoryName.toLowerCase()} chính hãng, giá tốt nhất.`,
			path: localizePath(path, lang),
			type: "website",
		}),
		twitter: generateTwitterMetadata({
			title: `${categoryName} Chính Hãng`,
			description: `Mua sắm ${categoryName.toLowerCase()} chính hãng, giá tốt nhất.`,
		}),
		alternates: generateLocaleAlternates(path, lang),
	};
}
