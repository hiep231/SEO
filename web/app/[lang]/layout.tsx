import "./globals.css";

import { Suspense } from "react";

import { Metadata, Viewport } from "next";
import { Cairo, Poppins } from "next/font/google";
import { notFound } from "next/navigation";

import {
	BreadcrumbList,
	LocalBusiness,
	Organization,
	WebPage,
	WebSite,
	WithContext,
} from "schema-dts";
import { Toaster } from "sonner";

import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Locale, locales } from "@repo/types";

import AppProviders from "@/redux/app-providers";

import AppStateInit from "@/components/layout/app-state-init";
import Banner from "@/components/layout/banner";
import SvgSprite from "@/components/ui/svg-sprite";
import Footer from "@/components/layout/footer";
import { I18nProvider } from "@/components/layout/i18n-provider";
import Navigation from "@/components/layout/navigation";

import { DirectionProvider } from "@/shadcn/components/ui/direction";
import { TooltipProvider } from "@/shadcn/components/ui/tooltip";

import config from "@/lib/config";
import { getDictionary } from "@/lib/dictionaries";
import { generateOgMetadata, generateTwitterMetadata } from "@/lib/generate";
import { getDirection, hasLocale, localizePath } from "@/lib/i18n";
import { localizeUrl } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-poppins",
	display: "swap",
});

const cairo = Cairo({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-cairo",
	display: "swap",
});

export const metadata: Metadata = {
	title: {
		default: "Mini Setup - Phụ Kiện Công Nghệ | minisetup.page.gd",
		template: `%s | minisetup.page.gd`,
	},
	description: "Chào mừng đến với Mini Setup (minisetup.page.gd). Cửa hàng chuyên cung cấp phụ kiện công nghệ tối giản: sạc GaN, cáp, tai nghe, bàn phím. Nâng tầm góc làm việc của bạn ngay hôm nay!",
	keywords: config.keywords,
	authors: [
		{
			name: config.websiteName,
			url: config.clientUrl,
		},
	],
	openGraph: {
		...generateOgMetadata({
			title: "Mini Setup - Thế Giới Phụ Kiện | minisetup.page.gd",
			description: "Ghé thăm Mini Setup (minisetup.page.gd) để tìm kiếm các phụ kiện công nghệ, setup góc làm việc tối giản và chất lượng nhất.",
			path: "/",
			type: "website",
		}),
		title: "Mini Setup - Thế Giới Phụ Kiện | minisetup.page.gd",
		description: "Ghé thăm Mini Setup (minisetup.page.gd) để tìm kiếm các phụ kiện công nghệ, setup góc làm việc tối giản và chất lượng nhất.",
		url: "https://minisetup.page.gd/",
		type: "website",
	},
	twitter: generateTwitterMetadata({
		title: config.title,
		description: config.description,
	}),
	icons: {
		icon: "/icon.svg",
	},
	manifest: "/manifest.webmanifest",
	robots: {
		index: true,
		follow: true,
	},

	creator: config.websiteName,
	publisher: config.websiteName,

	appleWebApp: {
		capable: true,
		statusBarStyle: "black-translucent",
		title: config.websiteName,
	},

	metadataBase: new URL(config.clientUrl),

	// Google Search Console verification
	...(config.gscVerification
		? { verification: { google: config.gscVerification } }
		: {}),
};

export const viewport: Viewport = {
	themeColor: config.themeColor,
	width: "device-width",
	initialScale: 1,
	maximumScale: 5,
	viewportFit: "cover",
};

export async function generateStaticParams(): Promise<{ lang: Locale }[]> {
	return locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ lang: string }>;
}>) {
	const { lang } = await params;

	if (!hasLocale(lang)) {
		notFound();
	}

	const locale = lang as Locale;
	const dictionary = await getDictionary(locale);
	const direction = getDirection(locale);

	const homepageSchema = generateHomepageSchema(locale);

	return (
		<html
			lang={locale}
			dir={direction}
			className={cn(
				poppins.variable,
				cairo.variable,
				poppins.variable,
				"font-poppins",
			)}
		>
			<head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(homepageSchema),
					}}
				/>
			</head>
			<body
				className={cn("min-h-screen bg-background")}
				suppressHydrationWarning={true}
			>
				<AppProviders>
					<DirectionProvider dir={direction}>
						<SvgSprite />
						<I18nProvider dictionary={dictionary} locale={locale}>
							<AppStateInit />
							<Analytics />
							<SpeedInsights />
							<Toaster />
							{/* <Chatbot /> */}

							<Banner locale={locale} />

							<Navigation locale={locale} />

							{/* Page */}
							<TooltipProvider>
								<main>{children}</main>
							</TooltipProvider>

							<Footer locale={locale} />
						</I18nProvider>
					</DirectionProvider>
				</AppProviders>
			</body>
			<GoogleAnalytics gaId="G-DMW0E2PQZL" />
		</html>
	);
}

export function generateHomepageSchema(locale: Locale) {
	const webpage: WithContext<WebPage> = {
		"@context": "https://schema.org",
		"@type": "WebPage",
		name: config.websiteName,
		description: config.description,
		url: localizeUrl("/", locale),
		image: config.openGraphImage,
	};

	return {
		"@context": "https://schema.org",
		"@graph": [
			generateOrganizationSchema(locale),
			generateLocalBusinessSchema(locale),
			generateEcommerceSchema(locale),
			generateBreadcrumbSchema(locale),
			webpage,
		],
	};
}

export function generateOrganizationSchema(
	locale: Locale,
): WithContext<Organization> {
	return {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: config.websiteName,
		url: localizeUrl("/", locale),
		logo: config.logo,
		description: config.description,
		email: config.email,
		telephone: config.phone || undefined,
		sameAs: [
			config.social?.facebook,
			(config.social as any)?.youtube,
		].filter(Boolean),
		contactPoint: {
			"@type": "ContactPoint",
			contactType: "Customer Service",
			email: config.email,
			telephone: config.phone || undefined,
		},
	};
}

export function generateLocalBusinessSchema(
	locale: Locale,
): WithContext<LocalBusiness> {
	return {
		"@context": "https://schema.org",
		"@type": "LocalBusiness",
		name: config.websiteName,
		url: localizeUrl("/", locale),
		image: config.openGraphImage,
		logo: config.logo,
		description: config.description,
		email: config.email,
		telephone: config.phone || undefined,
		address: {
			"@type": "PostalAddress",
			streetAddress: config.address.streetAddress || undefined,
			addressLocality: config.address.addressLocality,
			addressRegion: config.address.addressRegion,
			postalCode: config.address.postalCode,
			addressCountry: config.address.addressCountry,
		},
		hasMap: config.googleMapsUrl,
		sameAs: [
			config.social?.facebook,
			(config.social as any)?.youtube,
		].filter(Boolean),
	};
}

export function generateEcommerceSchema(locale: Locale): WithContext<WebSite> {
	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: config.websiteName,
		url: localizeUrl("/", locale),
		description: config.description,
		image: config.openGraphImage,
		potentialAction: {
			"@type": "SearchAction",
			target: {
				"@type": "EntryPoint",
				urlTemplate: localizeUrl(
					"/products?search={search_term_string}",
					locale,
				),
			},
			// @ts-ignore - query-input is required by Google but not in schema-dts
			"query-input": "required name=search_term_string",
		},
		publisher: generateOrganizationSchema(locale),
	};
}

export function generateBreadcrumbSchema(
	locale: Locale,
): WithContext<BreadcrumbList> {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{
				"@type": "ListItem",
				position: 1,
				name: locale === "vi" ? "Trang chủ" : "Home",
				item: localizeUrl("/", locale),
			},
			{
				"@type": "ListItem",
				position: 2,
				name: locale === "vi" ? "Phụ Kiện Công Nghệ" : "Tech Accessories",
				item: localizeUrl("/products", locale),
			},
		],
	};
}

