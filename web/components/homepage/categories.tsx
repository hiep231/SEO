import Image from "next/image";
import Link from "next/link";

import { Locale } from "@repo/types";

import { categoriesService } from "@/services/categories-service";

import { getDictionary } from "@/lib/dictionaries";
import { localizePath } from "@/lib/i18n";
import { getCategoryPath } from "@/lib/string-utils";

export default async function Categories({ lang }: { lang: Locale }) {
	const dictionary = await getDictionary(lang);
	const t = (key: string) => {
		// Quick helper for deeply nested keys used in this component
		if (key === "home.categories.title") return dictionary.home.categories.title;
		if (key === "home.categories.description") return dictionary.home.categories.description;
		if (key === "product") return dictionary.product;
		if (key === "products") return dictionary.products;
		return key;
	};

	let categoryTree: any[] = [];
	try {
		categoryTree = await categoriesService.getCategoryTree();
	} catch (err) {
		console.error("Failed to fetch categories:", err);
	}

	if (!categoryTree || categoryTree.length === 0) return null;

	return (
		<section className="py-12 md:py-16">
			<div className="mb-8 flex flex-col items-center text-center">
				<h2 className="font-display text-3xl leading-tight font-bold tracking-tight md:text-4xl">
					{t("home.categories.title")}
				</h2>
				<div className="mt-2 h-1 w-12 rounded-full bg-primary" />
				<p className="mt-4 max-w-2xl text-center text-muted-foreground">
					{t("home.categories.description")}
				</p>
			</div>

			<div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
				{categoryTree.map((category) => (
					<Link
						aria-label={`Browse ${category.name[lang]} products`}
						className="group relative flex flex-col space-y-4 overflow-hidden rounded-2xl border bg-card shadow transition-all duration-300 hover:shadow-lg"
						href={localizePath(getCategoryPath(category.slug), lang)}
						key={category.slug}
					>
						<div className="relative aspect-4/3 overflow-hidden">
							<div className="absolute inset-0 z-10 bg-linear-to-t from-background/80 to-transparent" />
							{category.imgUrl ? (
								<Image
									alt={category.name[lang]}
									className="object-cover transition duration-300 group-hover:scale-105"
									fill
									sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
									src={category.imgUrl}
								/>
							) : (
								<div className="absolute inset-0 bg-muted transition duration-300 group-hover:scale-105" />
							)}
						</div>
						<div className="relative z-20 -mt-6 p-4">
							<div className="mb-1 text-lg font-medium">
								{category.name[lang]}
							</div>
							<p className="text-sm text-muted-foreground">
								{(category.productCount === 1
									? t("product")
									: t("products")
								).replace("{{count}}", String(category.productCount))}
							</p>
						</div>
					</Link>
				))}
			</div>
		</section>
	);
}
