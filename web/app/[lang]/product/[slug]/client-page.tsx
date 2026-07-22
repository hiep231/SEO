"use client";

import ProductPageClient from "../components/product-page";

export default function ClientPage({ product }: { product: any }) {
	return <ProductPageClient product={product} />;
}

