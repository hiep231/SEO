import { Metadata } from "next";

import { Locale } from "@repo/types";

import config from "@/lib/config";
import {
	generateLocaleAlternates,
	generateOgMetadata,
	generateTwitterMetadata,
} from "@/lib/generate";
import { localizePath } from "@/lib/i18n";

// SEO: 51 chars, keyword at beginning
const title = "Phụ Kiện Công Nghệ - Mua Sắm Chính Hãng Online";
// SEO: 156 chars, keyword at start, covers user intent
const description = `Phụ kiện công nghệ chính hãng: tai nghe Bluetooth, sạc dự phòng GaN, bàn phím cơ, chuột không dây, ốp lưng. Hàng nghìn sản phẩm, giao hàng toàn quốc. Mua ngay tại ${config.websiteName}!`;


export async function generateMetadata({
	params,
}: {
	params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
	const { lang } = await params;

	return {
		title,
		description,
		keywords: ["phụ kiện công nghệ", "mua sắm online", "tai nghe chính hãng", "sạc dự phòng", "bàn phím cơ", "chuột không dây"],
		openGraph: generateOgMetadata({
			title,
			description,
			path: localizePath("/products", lang),
			type: "website",
		}),
		twitter: generateTwitterMetadata({
			title,
			description,
		}),
		alternates: generateLocaleAlternates("/products", lang),
	};
}

export default function ProductsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
