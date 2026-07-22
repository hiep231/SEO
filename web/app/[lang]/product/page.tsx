"use client";

import { Suspense, use,useEffect } from "react";

import { useRouter,useSearchParams } from "next/navigation";

import { Locale } from "@repo/types";

import { localizePath } from "@/lib/i18n";

interface Props {
	params: Promise<{ lang: Locale }>;
}

/**
 * Legacy redirect handler.
 * Redirects from old URL format: /product?slug=xxx
 * to new SEO-friendly format: /product/xxx
 *
 * This ensures that old bookmarks, backlinks, and indexed URLs
 * continue to work by automatically forwarding users.
 */
function RedirectContent({ params }: Props) {
	const searchParams = useSearchParams();
	const router = useRouter();
	const { lang } = use(params);

	useEffect(() => {
		const slug = searchParams.get("slug");
		if (slug) {
			// Redirect to new SEO-friendly URL
			router.replace(localizePath(`/product/${slug}`, lang));
		} else {
			// No slug provided, redirect to products listing
			router.replace(localizePath("/products", lang));
		}
	}, [searchParams, router, lang]);

	return (
		<div className="min-h-screen py-12 flex justify-center items-center">
			<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
		</div>
	);
}

export default function Page(props: Props) {
	return (
		<Suspense fallback={
			<div className="min-h-screen py-12 flex justify-center items-center">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
			</div>
		}>
			<RedirectContent {...props} />
		</Suspense>
	);
}
