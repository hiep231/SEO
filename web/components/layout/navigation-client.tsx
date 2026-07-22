"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
	BadgeCheck,
	LogOut,
	Menu,
	MessagesSquare,
	SearchIcon,
	ShoppingBag,
} from "lucide-react";

import { useQuery } from "@tanstack/react-query";

import { Locale } from "@repo/types";

import { logOut } from "@/redux/slices/auth-slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";

import { categoriesService } from "@/services/categories-service";

import { ButtonIcon } from "@/components/ui/button-icon";
import { ImageButton } from "@/components/ui/image-button";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/shadcn/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/shadcn/components/ui/dropdown-menu";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/shadcn/components/ui/input-group";
import { useIsMobile } from "@/shadcn/hooks/use-mobile";

import { localizePath } from "@/lib/i18n";
import { getCategoryPath, initials } from "@/lib/string-utils";
import { cn } from "@/lib/utils";

import { ProductsPageParams } from "@/types/product.type";

export function NavigationMenuClient({ locale, t }: { locale: Locale; t: any }) {
	const router = useRouter();

	const { data } = useQuery({
		queryKey: ["category-tree"],
		queryFn: () => categoriesService.getCategoryTree(),
		staleTime: 1000 * 60 * 5,
	});

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<ButtonIcon icon="menu" aria-label="Open categories menu" />
			</DropdownMenuTrigger>

			<DropdownMenuContent side="bottom" align="start" sideOffset={4} className="w-64">
				<DropdownMenuLabel>
					{t.categories}
				</DropdownMenuLabel>

				{data?.map((cat) => (
					<DropdownMenuSub key={`menu-sub-${cat.slug}`}>
						<DropdownMenuSubTrigger>{cat.name[locale]}</DropdownMenuSubTrigger>
						<DropdownMenuPortal>
							<DropdownMenuSubContent>
								{cat.children.map((subcat) => (
									<DropdownMenuItem
										key={`menu-item-${subcat.slug}`}
										onClick={() => {
											router.push(
												localizePath(getCategoryPath(subcat.slug), locale),
											);
										}}
									>
										{subcat.name[locale]}
									</DropdownMenuItem>
								))}
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export function NavLiClient({ href, name, locale }: { href: string; name: string; locale: Locale }) {
	const pathname = usePathname();
	const select = pathname === localizePath(href, locale);

	return (
		<li className="whitespace-nowrap">
			<Link
				className={cn(
					"pb-1.5 border-b-2 border-transparent hover:border-b-primary hover:text-custom-primary-foreground transition-colors leading-none",
					select && "font-bold text-primary",
				)}
				href={href}
			>
				{name}
			</Link>
		</li>
	);
}

export function SearchBarClient({ locale, t }: { locale: Locale; t: any }) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [search, setSearch] = useState<string>("");

	useEffect(() => {
		const params = Object.fromEntries(
			searchParams.entries(),
		) as ProductsPageParams;
		setSearch(params.name ? params.name : "");
	}, [searchParams]);

	return (
		<form
			className="max-w-32 sm:w-32 lg:w-48"
			onSubmit={(event) => {
				event.preventDefault();
				const params = new URLSearchParams();
				params.set("name", search ? search : "");
				router.push(
					localizePath(`/products?${params.toString()}`, locale),
				);
			}}
		>
			<InputGroup>
				<InputGroupInput
					placeholder={t.searchPlaceholder}
					value={search}
					onChange={(event) => setSearch(event.target.value)}
				/>
				<InputGroupAddon align="inline-start">
					<SearchIcon />
				</InputGroupAddon>
			</InputGroup>
		</form>
	);
}

function Badge({ children }: { children: React.ReactNode }) {
	return (
		<div
			className={cn(
				"absolute inline-flex justify-center items-center",
				"top-1.25 -right-1.25 h-3.5 w-3.5",
				"bg-primary text-white text-xs rounded-full",
			)}
		>
			{children}
		</div>
	);
}

export function RightActionsClient({ locale, t, photoOf }: { locale: Locale; t: any, photoOf: string }) {
	const router = useRouter();
	const isMobile = useIsMobile({});
	const { isAuthenticated, user } = useAppSelector((state) => state.auth);
	const { items } = useAppSelector((state) => state.cart);
	const dispatch = useAppDispatch();

	return (
		<>
			<ButtonIcon
				className="inline-flex sm:hidden"
				icon="search"
				aria-label="Search products"
				onClick={() => router.push(localizePath("/products", locale))}
			/>
			<ButtonIcon
				className="hidden sm:inline-flex"
				icon="storefront"
				aria-label="Go to Sell page"
				onClick={() => router.push(localizePath("/store/products", locale))}
			/>
			<ButtonIcon
				icon="favorite"
				aria-label="Go to Favorites page"
				onClick={() => router.push(localizePath("/favorites", locale))}
			/>
			<ButtonIcon
				className="relative"
				icon="shopping_cart"
				aria-label="Go to Cart page"
				onClick={() => router.push(localizePath("/cart", locale))}
			>
				{items.length > 0 && <Badge>{items.length}</Badge>}
			</ButtonIcon>

			{isAuthenticated && user ? (
				<div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<ImageButton
								imgUrl={user.photoUrl}
								fallback={initials(user.name)}
								alt={photoOf.replace("{{name}}", user.name)}
							/>
						</DropdownMenuTrigger>

						<DropdownMenuContent
							className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
							side={"bottom"}
							align="end"
							sideOffset={4}
						>
							<DropdownMenuLabel className="p-0 font-normal">
								<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
									<Avatar className="h-8 w-8">
										<AvatarImage src={user.photoUrl} alt={user.name} />
										<AvatarFallback>{initials(user.name)}</AvatarFallback>
									</Avatar>
									<div className="grid flex-1 text-start text-sm leading-tight">
										<span className="text-foreground truncate font-medium">
											{user.name}
										</span>
										<span className="truncate text-xs">{user.email}</span>
									</div>
								</div>
							</DropdownMenuLabel>

							<DropdownMenuSeparator />

							<DropdownMenuGroup>
								{isMobile && (
									<DropdownMenuItem
										onClick={() => {
											router.push(localizePath("/store/products", locale));
										}}
									>
										<ShoppingBag />
										{t.store}
									</DropdownMenuItem>
								)}
								<DropdownMenuItem
									onClick={() => {
										router.push(localizePath("/account", locale));
									}}
								>
									<BadgeCheck />
									{t.account}
								</DropdownMenuItem>
							</DropdownMenuGroup>

							<DropdownMenuSeparator />

							{user.role === "admin" && (
								<>
									<DropdownMenuLabel>
										{t.admin}
									</DropdownMenuLabel>

									<DropdownMenuGroup>
										<DropdownMenuItem
											onClick={() => {
												router.push(
													localizePath("/admin/messages", locale),
												);
											}}
										>
											<MessagesSquare />
											{t.messages}
										</DropdownMenuItem>

										<DropdownMenuItem
											onClick={() => {
												router.push(
													localizePath("/admin/categories", locale),
												);
											}}
										>
											<Menu />
											{t.categories}
										</DropdownMenuItem>
									</DropdownMenuGroup>

									<DropdownMenuSeparator />
								</>
							)}

							<DropdownMenuItem
								onClick={async () => {
									await dispatch(logOut());
									window.localStorage.clear();
									location.reload();
								}}
							>
								<LogOut />
								{t.logOut}
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			) : (
				<ButtonIcon
					icon="person"
					aria-label="Go to Sign In page"
					onClick={() => router.push(localizePath("/signin", locale))}
				/>
			)}
		</>
	);
}
