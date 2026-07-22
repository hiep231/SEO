import Image from "next/image";
import Link from "next/link";

import {
	Facebook,
	MapPin,
	Phone,
	Youtube,
} from "lucide-react";

import { Locale } from "@repo/types";

import { categoriesService } from "@/services/categories-service";

import { Button } from "@/shadcn/components/ui/button";

import config from "@/lib/config";
import { getDictionary } from "@/lib/dictionaries";
import { localizePath } from "@/lib/i18n";
import { getCategoryPath } from "@/lib/string-utils";
import { cn } from "@/lib/utils";

import { Container } from "../common/container";

export default async function Footer({
	className,
	locale,
}: {
	className?: string;
	locale: Locale;
}) {
	const categoryTree = await getCategoryTree();
	const dictionary = await getDictionary(locale);

	return (
		<footer className={cn("border-t bg-background", className)}>
			<Container className="py-12">
				{/* Global SEO Block */}
				<div className="mb-12 border-b pb-8 text-sm text-muted-foreground space-y-4 leading-relaxed">
					<h2 className="font-semibold text-foreground text-lg">Hệ sinh thái phụ kiện công nghệ chính hãng hàng đầu</h2>
					<p>
						Chúng tôi tự hào là đại lý phân phối chính hãng các sản phẩm công nghệ, linh kiện điện tử và phụ kiện cao cấp. Sứ mệnh của chúng tôi là mang lại trải nghiệm mua sắm trực tuyến (shopping online) tuyệt vời nhất cho tín đồ công nghệ Việt Nam. Với hàng ngàn mặt hàng đa dạng bao gồm tai nghe true wireless (TWS), tai nghe chụp tai chống ồn (ANC), loa bluetooth di động, sạc nhanh thông minh chuẩn PD/GaN, cáp sạc bọc dù siêu bền, ốp lưng chống sốc, kính cường lực bảo vệ màn hình điện thoại, cho đến các thiết bị ngoại vi như bàn phím cơ custom và chuột gaming siêu nhẹ, chúng tôi luôn cập nhật liên tục để đón đầu mọi xu hướng công nghệ trên thế giới. Tất cả các thiết bị đều được nhập khẩu chính ngạch, có tem nhãn chứng nhận, giấy tờ xuất xứ rõ ràng và được cam kết bảo hành 1 đổi 1 trong thời gian dài từ các nhà sản xuất danh tiếng.
					</p>
					<p>
						Bên cạnh đó, chúng tôi nỗ lực xây dựng một cộng đồng người yêu công nghệ vững mạnh thông qua các chuyên mục blog tư vấn, bài viết đánh giá chuyên sâu (review), so sánh hiệu năng sản phẩm một cách khách quan và các video hướng dẫn sử dụng chi tiết nhất. Bạn sẽ không bao giờ phải băn khoăn hay lạc lối khi lựa chọn sản phẩm phù hợp với nhu cầu sử dụng thực tế và ngân sách tài chính của cá nhân. Hàng tháng, hệ thống luôn triển khai các chương trình siêu khuyến mãi, giảm giá sốc (Mega Sale, Flash Sale), tặng kèm phụ kiện độc quyền và miễn phí giao hàng (Freeship) tận nhà trên phạm vi toàn quốc. Đội ngũ chuyên viên chăm sóc khách hàng nhiệt tình, am hiểu kỹ thuật luôn túc trực và sẵn sàng hỗ trợ bạn giải quyết mọi sự cố 24/7. Khám phá ngay hôm nay để kiến tạo nên một phong cách sống số năng động, hiện đại, tiện nghi và thông minh hơn bao giờ hết.
					</p>
				</div>
				
				<div className="grid grid-cols-1 gap-8 md:grid-cols-4">
					{/* Brand + Social + Address */}
					<div className="space-y-4 md:col-span-1">
						<Link className="flex items-center gap-2" href={localizePath("/", locale)}>
							<span className="bg-linear-to-r from-primary to-primary/70 bg-clip-text text-xl font-bold tracking-tight text-transparent">
								Phụ Kiện Công Nghệ
							</span>
						</Link>
						<p className="text-sm text-muted-foreground">
							{dictionary.footer.description}
						</p>

						{/* Business Address for Local SEO */}
						<address className="not-italic text-sm text-muted-foreground space-y-1">
							{config.address.streetAddress && (
								<div className="flex items-start gap-1.5">
									<MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary/70" />
									<span>
										{config.address.streetAddress},{" "}
										{config.address.addressLocality},{" "}
										{config.address.addressRegion}
									</span>
								</div>
							)}
							{config.phone && (
								<div className="flex items-center gap-1.5">
									<Phone className="h-4 w-4 shrink-0 text-primary/70" />
									<a
										href={`tel:${config.phone}`}
										className="hover:text-foreground transition-colors"
									>
										{config.phone}
									</a>
								</div>
							)}
							{config.googleMapsUrl && (
								<div>
									<a
										href={config.googleMapsUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="text-primary/80 hover:text-primary text-xs underline"
									>
										Xem trên Google Maps
									</a>
								</div>
							)}
						</address>

						{/* Social Media Icons */}
						<div className="flex flex-wrap gap-2">
							{config.social.facebook && (
								<Button
									className="h-8 w-8 rounded-full"
									size="icon"
									variant="ghost"
									asChild
								>
									<a
										href={config.social.facebook}
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Facebook"
									>
										<Facebook className="h-4 w-4" />
									</a>
								</Button>
							)}
							{config.social.youtube && (
								<Button
									className="h-8 w-8 rounded-full"
									size="icon"
									variant="ghost"
									asChild
								>
									<a
										href={config.social.youtube}
										target="_blank"
										rel="noopener noreferrer"
										aria-label="YouTube"
									>
										<Youtube className="h-4 w-4" />
									</a>
								</Button>
							)}
						</div>
					</div>

					{/* Shop categories */}
					<div>
						<h3 className="mb-4 text-sm font-semibold">
							{dictionary.footer.shopTitle}
						</h3>
						<ul className="space-y-2 text-sm">
							<li>
								<Link
									className="text-muted-foreground hover:text-foreground"
									href={localizePath("/", locale)}
								>
									{dictionary.footer.allProducts}
								</Link>
							</li>
							{categoryTree.map((cat) => (
								<li key={`category-${cat.name[locale]}`}>
									<Link
										className="text-muted-foreground hover:text-foreground"
										href={localizePath(
											getCategoryPath(cat.slug),
											locale,
										)}
									>
										{cat.name[locale]}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Company */}
					<div>
						<h3 className="mb-4 text-sm font-semibold">Công ty</h3>
						<ul className="space-y-2 text-sm">
							<li>
								<Link
									className="text-muted-foreground hover:text-foreground"
									href={localizePath("/about", locale)}
								>
									Giới thiệu
								</Link>
							</li>
							<li>
								<Link
									className="text-muted-foreground hover:text-foreground"
									href={localizePath("/contact", locale)}
								>
									Liên hệ
								</Link>
							</li>
							<li>
								<Link
									className="text-muted-foreground hover:text-foreground"
									href={localizePath("/tu-van", locale)}
								>
									Tư vấn & Đánh giá
								</Link>
							</li>
							<li>
								<a
									className="text-muted-foreground hover:text-foreground"
									href="https://groupthree.great-site.net/"
									target="_blank"
									rel="noopener noreferrer"
									title="Đối tác Group Three"
								>
									Đối tác Group Three
								</a>
							</li>
						</ul>
					</div>

					{/* Policies */}
					<div>
						<h3 className="mb-4 text-sm font-semibold">Chính sách</h3>
						<ul className="space-y-2 text-sm">
							<li>
								<Link
									className="text-muted-foreground hover:text-foreground"
									href={localizePath("/shipping-policy", locale)}
								>
									Chính sách bảo hành
								</Link>
							</li>
							<li>
								<Link
									className="text-muted-foreground hover:text-foreground"
									href={localizePath("/refund-policy", locale)}
								>
									Chính sách đổi trả
								</Link>
							</li>
							<li>
								<Link
									className="text-muted-foreground hover:text-foreground"
									href={localizePath("/privacy-policy", locale)}
								>
									{dictionary.footer.privacy}
								</Link>
							</li>
							<li>
								<Link
									className="text-muted-foreground hover:text-foreground"
									href={localizePath("/terms-of-service", locale)}
								>
									{dictionary.footer.terms}
								</Link>
							</li>
						</ul>
					</div>
				</div>

				{/* Bottom bar */}
				<div className="mt-12 border-t pt-8">
					<div className="flex flex-col items-center justify-between gap-4 md:flex-row">
						<p className="text-sm text-muted-foreground">
							&copy; {new Date().getFullYear()} {config.websiteName}.{" "}
							{dictionary.footer.allRightsReserved}
						</p>

						<div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
							<Link
								className="hover:text-foreground"
								href={localizePath("/privacy-policy", locale)}
							>
								{dictionary.footer.privacy}
							</Link>
							<Link
								className="hover:text-foreground"
								href={localizePath("/terms-of-service", locale)}
							>
								{dictionary.footer.terms}
							</Link>
							<Link className="hover:text-foreground" href="/sitemap.xml">
								{dictionary.footer.sitemap}
							</Link>

							{/* DMCA Badge — copyright protection */}
							<a
								href="https://www.dmca.com/Protection/Status.aspx?ID=placeholder"
								title="DMCA.com Protection Status"
								target="_blank"
								rel="noopener noreferrer"
								id="footer-dmca-badge"
								aria-label="DMCA Protection Status"
							>
								<Image
									src="https://images.dmca.com/Badges/dmca_protected_sml_120m.png"
									alt="DMCA Protected"
									width={65}
									height={22}
									loading="lazy"
									unoptimized
								/>
							</a>
						</div>
					</div>
				</div>
			</Container>
		</footer>
	);
}

async function getCategoryTree() {
	return await categoriesService.getCategoryTree();
}


