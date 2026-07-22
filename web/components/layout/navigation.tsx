import { Suspense } from "react";

import Link from "next/link";

import { Locale } from "@repo/types";

import { getDictionary } from "@/lib/dictionaries";
import { localizePath } from "@/lib/i18n";
import { getCategoryPath } from "@/lib/string-utils";
import { cn } from "@/lib/utils";

import { Container } from "../common/container";
import { 
	NavigationMenuClient, 
	NavLiClient, 
	RightActionsClient, 
	SearchBarClient} from "./navigation-client";

export default async function Navigation({ locale }: { locale: Locale }) {
	const dictionary = await getDictionary(locale);

	return (
		<nav className="border-b-2 sticky top-0 z-50 bg-white">
			<Container className="flex items-center justify-between gap-4 h-16 md:h-20">
				{/* Left side: Menu + Logo */}
				<div className="flex-1 flex items-center gap-0 md:gap-4">
					<NavigationMenuClient locale={locale} t={{ categories: dictionary.navigation.actions.categories }} />
					<Logo className="hidden lg:block" locale={locale} />
					<Suspense fallback={<div className="max-w-32 sm:w-32 lg:w-48 h-10 bg-muted animate-pulse rounded" />}>
						<SearchBarClient locale={locale} t={{ searchPlaceholder: dictionary.navigation.searchPlaceholder }} />
					</Suspense>
				</div>

				{/* Middle: Links */}
				<ul className="flex-2 hidden md:flex items-center justify-center gap-4 lg:gap-8">
					<NavLiClient href={localizePath(getCategoryPath("tai-nghe"), locale)} name="Tai nghe" locale={locale} />
					<NavLiClient href={localizePath(getCategoryPath("sac-pin"), locale)} name="Sạc & Pin" locale={locale} />
					<NavLiClient href={localizePath(getCategoryPath("op-lung-kinh"), locale)} name="Ốp lưng & Kính" locale={locale} />
					<NavLiClient href={localizePath(getCategoryPath("ban-phim-chuot"), locale)} name="Bàn phím & Chuột" locale={locale} />
					<NavLiClient href={localizePath("/tu-van", locale)} name="Tư vấn" locale={locale} />
				</ul>
				<Logo className="block sm:hidden" locale={locale} />

				{/* Right side: Icons */}
				<div className="flex-1 flex items-center justify-end">
					<RightActionsClient 
						locale={locale} 
						t={dictionary.navigation.actions} 
						photoOf={dictionary.photoOf}
					/>
				</div>
			</Container>
		</nav>
	);
}

function Logo({ className, locale }: { className?: string; locale: Locale }) {
	return (
		<Link
			className={cn(
				"font-bold text-lg hover:text-primary transition-colors whitespace-nowrap",
				className,
			)}
			href={localizePath("/", locale)}
		>
			Phụ Kiện Công Nghệ
		</Link>
	);
}
