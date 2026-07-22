"use client";

import { useState } from "react";

import { Locale } from "@repo/types";
import { ProductEntity } from "@repo/types";

import ProductCard from "@/components/common/product-card";
import { useI18n } from "@/components/layout/i18n-provider";

interface Props {
	initialProducts: ProductEntity[];
	lang: Locale;
}

const PAGE_SIZE = 10;

export default function CategoryProductList({ initialProducts, lang }: Props) {
	const { t } = useI18n();
	const [limit, setLimit] = useState(PAGE_SIZE);
	const visibleProducts = initialProducts.slice(0, limit);

	if (initialProducts.length === 0) {
		return (
			<div className="text-center py-12 text-muted-foreground">
				Hiện tại chưa có sản phẩm nào trong danh mục này.
			</div>
		);
	}

	return (
		<>
			<div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
				{visibleProducts.map((item) => (
					<ProductCard 
						key={item._id} 
						data={{
							_id: item._id,
							name: item.name,
							price: item.price,
							priceCompare: item.priceCompare,
							imgUrls: item.imgUrls,
							category: item.category,
							avgRatings: item.avgRatings,
							numReviews: item.numReviews,
						}} 
						locale={lang}
						dictionary={{ productPage: { actions: { addToCart: t("productPage.actions.addToCart"), addToFavorites: t("productPage.actions.addToFavorites"), removeFromFavorites: t("productPage.actions.removeFromFavorites") } } }}
					/>
				))}
			</div>

			{limit < initialProducts.length && (
				<div className="mt-10 flex justify-center">
					<button
						onClick={() => setLimit((prev) => prev + PAGE_SIZE)}
						className="px-8 py-3 border-2 border-primary text-primary font-medium rounded-xl hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm hover:shadow-md inline-block"
					>
						Xem thêm {initialProducts.length - limit} sản phẩm
					</button>
				</div>
			)}
		</>
	);
}
