"use client";

import Image from "next/image";
import Link from "next/link";

import { ProductEntity } from "@repo/types";

import { useI18n } from "@/components/layout/i18n-provider";
import { ButtonIcon } from "@/components/ui/button-icon";
import Stars from "@/components/ui/stars";

import { useIsMobile } from "@/shadcn/hooks/use-mobile";

import { localizePath } from "@/lib/i18n";
import { createProductSlug, formatPrice } from "@/lib/string-utils";
import { cn } from "@/lib/utils";

import { useCart } from "@/hooks/use-cart";
import { useToggleFavorite } from "@/hooks/use-toggle-favorite";

type ProductCardProps = {
	data: ProductEntity;
};

export default function ProductCard({ data }: ProductCardProps) {
	const { locale, t } = useI18n();

	const isMobile = useIsMobile({});
	const { isFavorite, addToFavorites, removeFromFavorites } =
		useToggleFavorite(data);
	const { addToCart } = useCart();

	return (
		<div
			className={cn(
				"group relative flex flex-col overflow-hidden bg-card text-card-foreground",
				"border rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1",
			)}
		>
			<div className="absolute z-10 top-2 inset-e-2">
				{isFavorite ? (
					<ButtonIcon
						className="scale-[.85] hover:scale-100 shadow-md transition-transform bg-white/80 backdrop-blur-sm"
						styleClass="filter-(--filter-primary)"
						icon="favorite_fill"
						aria-label={t("productPage.actions.removeFromFavorites")}
						onClick={removeFromFavorites}
					/>
				) : (
					<ButtonIcon
						className="scale-[.85] hover:scale-100 shadow-md transition-transform bg-white/80 backdrop-blur-sm"
						icon="favorite"
						aria-label={t("productPage.actions.addToFavorites")}
						onClick={addToFavorites}
					/>
				)}
			</div>

			<Link
				href={localizePath(
					`/product/${createProductSlug(data.name.en, data._id)}`,
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

			<div className="relative p-4 md:p-5 flex flex-col flex-1 justify-between bg-zinc-50/50">
				<div className="flex flex-col h-full">
					<h3 className="line-clamp-2 overflow-hidden text-ellipsis mb-2 text-sm md:text-base font-medium group-hover:text-primary transition-colors min-h-[2.5rem] md:min-h-[3rem]">
						{data.name[locale]}
					</h3>

					<div className="mt-auto mb-3">
						<Stars
							size={isMobile ? 14 : 16}
							value={data.avgRatings}
							total={data.numReviews}
						/>
					</div>
				</div>

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

					<ButtonIcon
						className="shadow-sm hover:shadow-md transition-all hover:scale-105"
						icon="shopping_cart"
						aria-label={t("productPage.actions.addToCart")}
						variant="primary"
						onClick={() => {
							addToCart(data);
						}}
					/>
				</div>
			</div>
		</div>
	);
}
