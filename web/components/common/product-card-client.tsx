"use client";

import { ProductEntity } from "@repo/types";

import { ButtonIcon } from "@/components/ui/button-icon";

import { useCart } from "@/hooks/use-cart";
import { useToggleFavorite } from "@/hooks/use-toggle-favorite";

// Only taking the minimal necessary fields to reduce JSON Payload
export type MinimalProduct = Pick<
	ProductEntity,
	"_id" | "name" | "price" | "priceCompare" | "imgUrls" | "category" | "avgRatings" | "numReviews"
>;

export function ProductCardFavorite({ 
	data, 
	removeFromFavoritesLabel,
	addToFavoritesLabel,
}: { 
	data: MinimalProduct;
	removeFromFavoritesLabel: string;
	addToFavoritesLabel: string;
}) {
	// Cast MinimalProduct to ProductEntity for the hooks since they expect ProductEntity
	// We only access the fields we passed, so this cast is safe.
	const { isFavorite, addToFavorites, removeFromFavorites } =
		useToggleFavorite(data as unknown as ProductEntity);

	return (
		<div className="absolute z-10 top-2 inset-e-2">
			{isFavorite ? (
				<ButtonIcon
					className="scale-[.85] hover:scale-100 shadow-md transition-transform bg-white/80 backdrop-blur-sm"
					styleClass="filter-(--filter-primary)"
					icon="favorite_fill"
					aria-label={removeFromFavoritesLabel}
					onClick={removeFromFavorites}
				/>
			) : (
				<ButtonIcon
					className="scale-[.85] hover:scale-100 shadow-md transition-transform bg-white/80 backdrop-blur-sm"
					icon="favorite"
					aria-label={addToFavoritesLabel}
					onClick={addToFavorites}
				/>
			)}
		</div>
	);
}

export function ProductCardAddToCart({
	data,
	addToCartLabel
}: {
	data: MinimalProduct;
	addToCartLabel: string;
}) {
	const { addToCart } = useCart();
	return (
		<ButtonIcon
			className="shadow-sm hover:shadow-md transition-all hover:scale-105"
			icon="shopping_cart"
			aria-label={addToCartLabel}
			variant="primary"
			onClick={() => {
				addToCart(data as unknown as ProductEntity);
			}}
		/>
	);
}
