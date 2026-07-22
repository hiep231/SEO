"use client";

import { Suspense, use,useEffect } from "react";

import { useRouter,useSearchParams } from "next/navigation";

import { Locale } from "@repo/types";

import { localizePath } from "@/lib/i18n";

interface Props {
	params: Promise<{ lang: Locale }>;
}

function RedirectContent({ params }: Props) {
	const searchParams = useSearchParams();
	const router = useRouter();
	const { lang } = use(params);

	useEffect(() => {
		const slug = searchParams.get("slug");
		if (slug) {
			router.replace(localizePath(`/category/${slug}`, lang));
		} else {
			router.replace(localizePath("/", lang));
		}
	}, [searchParams, router, lang]);

	return (
		<main className="bg-background min-h-screen py-8 flex justify-center items-center">
			<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
		</main>
	);
}

export default function Page(props: Props) {
	return (
		<Suspense fallback={
			<main className="bg-background min-h-screen py-8 flex justify-center items-center">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
			</main>
		}>
			<RedirectContent {...props} />
		</Suspense>
	);
}
