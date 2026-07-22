import Image from "next/image";
import Link from "next/link";

import Stars from "@/components/ui/stars";

import { Card } from "@/shadcn/components/ui/card";

import { localizePath } from "@/lib/i18n";
import { formatPrice, getProductPath } from "@/lib/string-utils";

import { MinimalProduct, ProductCardFavorite, ProductCardAddToCart } from "./product-card-client";

type ProductCardProps = {
	data: MinimalProduct;
	locale: "en" | "vi";
	dictionary: any;
};

export default function ProductCard({ data, locale, dictionary }: ProductCardProps) {
	return (
		<Card className="group relative flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
			<ProductCardFavorite 
				data={data} 
				addToFavoritesLabel={dictionary.productPage.actions.addToFavorites}
				removeFromFavoritesLabel={dictionary.productPage.actions.removeFromFavorites}
			/>

			<Link
				href={localizePath(
					getProductPath(data.name.en, data._id),
					locale,
				)}
				className="overflow-hidden bg-white aspect-square relative"
			>
				<Image
					className="object-contain w-full h-full mix-blend-multiply transition-transform duration-500 group-hover:scale-110 p-4"
					src={data.imgUrls[0] || ""}
					alt={`Mua ${data.name[locale]} chính hãng`}
					fill
					sizes="(max-width: 768px) 50vw, 33vw"
					loading="lazy"
				/>
			</Link>

			<div className="relative p-4 md:p-5 flex flex-col flex-1 bg-zinc-50/50">
				<h3 className="line-clamp-2 overflow-hidden text-ellipsis mb-2 text-sm md:text-base font-medium group-hover:text-primary transition-colors min-h-[2.5rem] md:min-h-[3rem]">
					{data.name[locale]}
				</h3>

				<Stars
					className="mt-auto mb-3"
					size={16}
					value={data.avgRatings}
					total={data.numReviews}
				/>

				<div className="flex items-end justify-between mt-2">
					<div className="flex flex-col">
						{data.priceCompare > data.price && (
							<span className="text-muted-foreground line-through leading-none text-xs md:text-sm mb-1">
								{formatPrice(data.priceCompare / 100, locale)}
							</span>
						)}
						<span className="leading-none font-bold text-base md:text-xl text-primary">
							{formatPrice(data.price / 100, locale)}
						</span>
					</div>

					<ProductCardAddToCart 
						data={data} 
						addToCartLabel={dictionary.productPage.actions.addToCart} 
					/>
				</div>
			</div>
		</Card>
	);
}
