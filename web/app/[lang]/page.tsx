import { Suspense } from "react";

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ArrowRight, Clock, Truck } from "lucide-react";

import { Locale } from "@repo/types";

import { productsService } from "@/services/products-service";

import { Container } from "@/components/common/container";
import ProductCard from "@/components/common/product-card";
import ProductCardSkeleton from "@/components/common/product-card-skeleton";
import { Section } from "@/components/common/section";
import Categories from "@/components/homepage/categories";
import Testimonials from "@/components/homepage/testimonials";
import WhyChooseUs from "@/components/homepage/why-choose-us";

import { Button } from "@/shadcn/components/ui/button";

import { getDictionary } from "@/lib/dictionaries";
import { generateLocaleAlternates } from "@/lib/generate";
import { localizePath } from "@/lib/i18n";
import { getCategoryPath } from "@/lib/string-utils";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
	const { lang } = await params;

	return {
		alternates: generateLocaleAlternates("/", lang),
	};
}

export default async function Page({
	params,
}: {
	params: Promise<{ lang: Locale }>;
}) {
	const { lang } = await params;
	const dictionary = await getDictionary(lang);

	return (
		<>
			<Container>
				{/* Hero Section */}
				<section className="relative overflow-hidden py-12 md:py-16">
					<div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
						<div className="flex flex-col justify-center space-y-6">
							<div className="space-y-4">
								<h1 className="font-display text-4xl leading-tight font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:leading-[1.1]">
									MiniSetup - <br className="hidden md:block" />
									<span className="bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
										Nền Tảng Phụ Kiện Công Nghệ Chính Hãng
									</span>
								</h1>
								<p className="max-w-2xl text-lg text-muted-foreground md:text-xl leading-relaxed">
									Khám phá các sản phẩm công nghệ được tuyển chọn: tai nghe Bluetooth, phụ kiện điện thoại, thiết bị gaming, đồ gia dụng thông minh với thông tin chi tiết và đánh giá minh bạch.
								</p>
							</div>
							<div className="flex flex-col gap-3 sm:flex-row">
								<Button className="group" size="lg" asChild>
									<Link href={localizePath(getCategoryPath("tai-nghe"), lang)}>
										{dictionary.home.hero.shopNow}{" "}
										<ArrowRight className="h-4 w-4 rtl:rotate-180 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
									</Link>
								</Button>
							</div>
							<div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
								<div className="flex items-center gap-1.5">
									<Truck className="h-5 w-5 text-primary/70" />
									<span>{dictionary.home.hero.freeShipping}</span>
								</div>
								<div className="flex items-center gap-1.5">
									<Clock className="h-5 w-5 text-primary/70" />
									<span>{dictionary.home.hero.support}</span>
								</div>
							</div>
						</div>
						<div className="relative mx-auto hidden aspect-square w-full max-w-md overflow-hidden rounded-xl border shadow-lg lg:block">
							<div className="absolute inset-0 z-10 via-transparent to-transparent" />
							<Image
								alt="Shopping experience"
								className="object-cover"
								fill
								priority
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								src="/img/hero.jpeg"
							/>
						</div>
					</div>
					<div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" />
				</section>

				<Section className="py-12 bg-muted/30">
					<div className="max-w-3xl mx-auto text-center space-y-4">
						<p className="text-muted-foreground text-lg leading-relaxed">
							Thương hiệu{" "}
							<strong className="text-foreground">Mini Setup</strong> ra đời
							với sứ mệnh mang đến cho bạn những giải pháp tối ưu để{" "}
							<strong className="text-foreground">
								setup góc làm việc tối giản
							</strong>{" "}
							và hiện đại. Chúng tôi cung cấp các dòng{" "}
							<strong className="text-foreground">phụ kiện IT</strong> đa
							dạng, từ bàn phím cơ, chuột không dây đến các thiết bị tiện ích,
							giúp không gian làm việc của bạn gọn gàng, tinh tế và truyền cảm
							hứng.
						</p>
						<p className="text-muted-foreground text-lg leading-relaxed">
							Mỗi sản phẩm tại Mini Setup đều được tuyển chọn kỹ lưỡng, đảm
							bảo <strong className="text-foreground">chất lượng cao</strong>,
							thiết kế sang trọng và công năng vượt trội. Chúng tôi luôn đồng
							hành cùng bạn trong hành trình kiến tạo một không gian số chuyên
							nghiệp, nâng cao hiệu suất công việc và thể hiện phong cách cá
							nhân.
						</p>
					</div>
				</Section>

				<Categories lang={lang} />

				<Suspense
					fallback={<FeaturedProductsSkeleton dictionary={dictionary} />}
				>
					<FeaturedProductsSection lang={lang} dictionary={dictionary} />
				</Suspense>

				<WhyChooseUs />

				<Section className="space-y-2 lg:space-y-4 pt-12 border-t">
					<div className="mb-8 flex flex-col items-center text-center">
						<h2 className="font-display text-3xl leading-tight font-bold tracking-tight md:text-4xl">
							Tư Vấn & Đánh Giá
						</h2>
						<div className="mt-2 h-1 w-12 rounded-full bg-primary" />
						<p className="mt-4 max-w-2xl text-center text-muted-foreground md:text-lg">
							Cập nhật kiến thức và mẹo hay nhất để lựa chọn phụ kiện công nghệ
							phù hợp.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{[
							{
								id: 1,
								title: "Top 5 Tai Nghe Bluetooth Đáng Mua Nhất 2026",
								slug: "top-5-tai-nghe-bluetooth-dang-mua-nhat",
							},
							{
								id: 2,
								title:
									"Hướng Dẫn Chọn Sạc Nhanh Chuẩn GaN Cho iPhone và MacBook",
								slug: "huong-dan-chon-sac-nhanh-chuan-gan",
							},
							{
								id: 3,
								title: "Bàn Phím Cơ Custom: Bắt Đầu Từ Đâu?",
								slug: "ban-phim-co-custom-bat-dau-tu-dau",
							},
						].map((article) => (
							<article
								key={article.id}
								className="border rounded-lg p-6 bg-card hover:shadow-md transition-shadow"
							>
								<h3 className="text-xl font-semibold mb-3">
									<Link
										href={localizePath(`/tu-van/${article.slug}`, lang)}
										className="hover:text-primary transition-colors"
									>
										{article.title}
									</Link>
								</h3>
								<Link
									href={localizePath(`/tu-van/${article.slug}`, lang)}
									className="text-sm text-primary font-medium flex items-center group"
								>
									Đọc tiếp
									<ArrowRight className="ml-1 h-3 w-3 rtl:rotate-180 transition-transform duration-300 group-hover:translate-x-1" />
								</Link>
							</article>
						))}
					</div>

					<div className="mt-8 flex justify-center">
						<Link href={localizePath("/tu-van", lang)}>
							<Button variant="outline">Xem tất cả bài viết</Button>
						</Link>
					</div>
				</Section>
			</Container>

			{/* SEO Content Block — Long Form for Text/HTML Ratio */}
			<Section className="bg-muted/50 py-12 md:py-16 mt-12 border-y">
				<Container>
					<div className="mx-auto max-w-4xl space-y-6 text-muted-foreground text-sm leading-relaxed">
						<h2 className="text-2xl font-bold text-foreground">MiniSetup - Nền tảng mua sắm phụ kiện công nghệ chính hãng</h2>
						<p>
							Chào mừng bạn đến với Mini Setup — điểm đến lý tưởng và đáng tin cậy hàng đầu dành cho những tín đồ đam mê công nghệ. Trong kỷ nguyên số hóa, việc sở hữu các thiết bị ngoại vi và phụ kiện điện tử chất lượng đóng vai trò then chốt trong việc tối ưu hóa năng suất làm việc, bảo vệ sức khỏe và thể hiện phong cách cá nhân của mỗi người dùng.
						</p>

						<h3 className="text-xl font-semibold text-foreground mt-8">Khám phá sản phẩm công nghệ nổi bật</h3>
						<p>
							Tại MiniSetup, chúng tôi cung cấp đa dạng các dòng sản phẩm công nghệ chính hãng, đáp ứng mọi nhu cầu từ làm việc văn phòng đến giải trí chuyên nghiệp:
						</p>
						<ul className="list-disc pl-5 space-y-2 mt-2">
							<li><strong>Tai nghe không dây:</strong> Các mẫu tai nghe Bluetooth, True Wireless, Headphone chống ồn chủ động (ANC) mang lại trải nghiệm âm thanh tuyệt đỉnh.</li>
							<li><strong>Bàn phím cơ & Chuột gaming:</strong> Tối ưu hóa trải nghiệm gõ phím và độ chuẩn xác với các thiết kế công thái học bảo vệ cổ tay.</li>
							<li><strong>Sạc nhanh & Cáp sạc:</strong> Các thiết bị củ sạc GaN siêu nhỏ gọn, cáp sạc siêu bền chuẩn an toàn quốc tế (MFi, PD) bảo vệ pin tối đa.</li>
							<li><strong>Phụ kiện điện thoại:</strong> Ốp lưng, kính cường lực, giá đỡ thông minh đa dạng mẫu mã.</li>
						</ul>
						<p className="mt-2">Mỗi sản phẩm đều được chọn lọc khắt khe dựa trên 3 tiêu chí: <strong>chất lượng, thiết kế và trải nghiệm sử dụng</strong>.</p>

						<h3 className="text-xl font-semibold text-foreground mt-8">Cách chọn phụ kiện công nghệ phù hợp (Buying Guide)</h3>
						<p>
							Khi đứng trước hàng ngàn sự lựa chọn, việc tìm ra sản phẩm "chân ái" không hề dễ dàng. Ví dụ, khi lựa chọn <strong>tai nghe Bluetooth</strong>, người dùng nên quan tâm đến các yếu tố cốt lõi sau:
						</p>
						<ol className="list-decimal pl-5 space-y-2 mt-2">
							<li><strong>Chất lượng âm thanh:</strong> Dải âm bass sâu hay treble trong trẻo phù hợp với gu âm nhạc của bạn.</li>
							<li><strong>Thời lượng pin:</strong> Các mẫu tai nghe cao cấp hiện nay cung cấp từ 20 đến 40 giờ sử dụng liên tục.</li>
							<li><strong>Công nghệ chống ồn:</strong> Tính năng ANC (Active Noise Cancellation) là bắt buộc nếu bạn thường xuyên làm việc ở nơi công cộng.</li>
							<li><strong>Khả năng tương thích:</strong> Hỗ trợ kết nối liền mạch đa thiết bị (Multipoint Connection) giữa iOS, Android và Laptop.</li>
							<li><strong>Giá thành:</strong> Đầu tư vào hàng chính hãng mang lại giá trị sử dụng lâu dài thay vì các sản phẩm trôi nổi mau hỏng.</li>
						</ol>

						<h3 className="text-xl font-semibold text-foreground mt-8">Câu hỏi thường gặp (FAQ)</h3>
						<div className="space-y-4 mt-4">
							<div>
								<h4 className="text-base font-semibold text-foreground">MiniSetup bán những sản phẩm gì?</h4>
								<p className="mt-1">Chúng tôi chuyên phân phối các loại phụ kiện công nghệ chính hãng bao gồm: tai nghe, loa bluetooth, bàn phím, chuột máy tính, cáp sạc, sạc dự phòng và đồ gia dụng thông minh từ các thương hiệu lớn.</p>
							</div>
							<div>
								<h4 className="text-base font-semibold text-foreground">Sản phẩm tại MiniSetup có chính hãng không?</h4>
								<p className="mt-1">100% sản phẩm bán ra tại MiniSetup đều là hàng chính hãng, nguyên seal, nguyên kiện, có đầy đủ hóa đơn chứng từ và được bảo hành trực tiếp từ nhà sản xuất hoặc trung tâm ủy quyền.</p>
							</div>
							<div>
								<h4 className="text-base font-semibold text-foreground">Làm sao để chọn sản phẩm phù hợp với nhu cầu?</h4>
								<p className="mt-1">Bạn có thể tham khảo các bài viết tư vấn, thông số kỹ thuật chi tiết trên website hoặc nhắn tin trực tiếp cho đội ngũ CSKH của chúng tôi để được tư vấn miễn phí 24/7 dựa trên ngân sách và mục đích sử dụng thực tế của bạn.</p>
							</div>
						</div>
					</div>
				</Container>
			</Section>

			<Testimonials dictionary={dictionary} />
		</>
	);
}

function FeaturedProductsSkeleton({ dictionary }: { dictionary: any }) {
	return (
		<Section className="space-y-2 lg:space-y-4">
			<div className="mb-8 flex flex-col items-center text-center">
				<h2 className="font-display text-3xl leading-tight font-bold tracking-tight md:text-4xl">
					{dictionary.home.featuredProducts}
				</h2>
				<div className="mt-2 h-1 w-12 rounded-full bg-primary" />
				<p className="mt-4 max-w-2xl text-center text-muted-foreground md:text-lg">
					{dictionary.home.featuredProductsDescription}
				</p>
			</div>
			<div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
				<ProductCardSkeleton />
				<ProductCardSkeleton />
				<ProductCardSkeleton />
				<ProductCardSkeleton />
			</div>
		</Section>
	);
}

async function FeaturedProductsSection({
	lang,
	dictionary,
}: {
	lang: Locale;
	dictionary: any;
}) {
	const featuredProducts = await productsService.getAllProducts({
		query: {
			featured: true,
			limit: 4,
		},
	});

	return (
		<Section className="space-y-2 lg:space-y-4">
			<div className="mb-8 flex flex-col items-center text-center">
				<h2 className="font-display text-3xl leading-tight font-bold tracking-tight md:text-4xl">
					{dictionary.home.featuredProducts}
				</h2>
				<div className="mt-2 h-1 w-12 rounded-full bg-primary" />
				<p className="mt-4 max-w-2xl text-center text-muted-foreground md:text-lg">
					{dictionary.home.featuredProductsDescription}
				</p>
			</div>

			<div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
				{featuredProducts.map((item) => (
					<ProductCard key={item._id} data={item} locale={lang} dictionary={dictionary} />
				))}
			</div>

			<div className="mt-10 flex justify-center">
				<Link href={localizePath("/products", lang)}>
					<Button className="group" size="lg" variant="outline">
						{dictionary.home.viewAllProducts}
						<ArrowRight className="ml-2 h-4 w-4 rtl:rotate-180 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
					</Button>
				</Link>
			</div>
		</Section>
	);
}
