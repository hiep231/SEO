import { Metadata } from "next";

import { Locale } from "@repo/types";

import config from "@/lib/config";
import {
	generateLocaleAlternates,
	generateOgMetadata,
	generateTwitterMetadata,
} from "@/lib/generate";
import { localizePath } from "@/lib/i18n";

const { title, description, keywords } = {
	// SEO: 57 chars, keyword at beginning
	title: "Phụ Kiện Công Nghệ - Về Chúng Tôi & Sứ Mệnh",
	// SEO: 152 chars, keyword at start
	description: `Phụ kiện công nghệ chính hãng tại ${config.websiteName}. Tìm hiểu về sứ mệnh, đội ngũ và cam kết cung cấp tai nghe, sạc dự phòng, bàn phím cơ chất lượng nhất Việt Nam.`,
	keywords: ["về chúng tôi", "phụ kiện công nghệ chính hãng", "sứ mệnh", "thương hiệu uy tín"],
};

export async function generateMetadata({
	params,
}: {
	params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
	const { lang } = await params;

	return {
		title,
		description,
		keywords,
		openGraph: generateOgMetadata({
			title,
			description,
			path: localizePath("/about", lang),
			type: "website",
		}),
		twitter: generateTwitterMetadata({ title, description }),
		alternates: generateLocaleAlternates("/about", lang),
	};
}

export default function AboutLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
