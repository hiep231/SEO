"use client";

import { useQuery } from "@tanstack/react-query";

import { ProductWithReviewsEntity } from "@repo/types";

import {
	GetAllProductsOptions,
	productsService,
} from "@/services/products-service";

import { Container } from "@/components/common/container";
import ProductCard from "@/components/common/product-card";
import ProductCardSkeleton from "@/components/common/product-card-skeleton";
import { Section } from "@/components/common/section";
import { useI18n } from "@/components/layout/i18n-provider";

import { Heading } from "@/shadcn/components/ui/typography";

import { cn } from "@/lib/utils";

import Feedback from "./feedback";
import ProductCallery from "./product-callery";
import ProductDetails from "./product-details";

export default function ProductPage({
	product,
}: {
	product: ProductWithReviewsEntity;
}) {
	const { t, locale } = useI18n();
	const options: GetAllProductsOptions = {
		query: {
			excludeIds: [product._id],
			category: product.category,
			limit: 4,
		},
	};

	const { data: similarProducts, isLoading } = useQuery({
		queryKey: ["similar-products", options],
		queryFn: () => productsService.getAllProducts(options),
		staleTime: 1000 * 60 * 5,
	});

	return (
		<Container>
			<Section className="space-y-4 md:space-y-4">
				<div
					className={cn(
						"md:relative",
						"grid grid-cols-1 md:grid-cols-2",
						"gap-x-10 gap-y-5",
					)}
				>
					<ProductCallery product={product} />
					<ProductDetails product={product} />
				</div>

				{/* SEO Content Block — Long Form with Native HTML details/summary */}
				<div className="mt-12 space-y-4 max-w-4xl">
					<details className="group border border-border rounded-lg bg-card open:shadow-md transition-all" open>
						<summary className="flex cursor-pointer list-none items-center justify-between p-4 font-semibold text-lg hover:text-primary transition-colors">
							Thông số kỹ thuật & Tính năng nổi bật
							<span className="transition-transform group-open:rotate-180">
								<svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"><polyline points="6 9 12 15 18 9"/></svg>
							</span>
						</summary>
						<div className="border-t border-border p-4 pt-4 text-muted-foreground prose prose-slate max-w-none text-sm">
							<p>Sản phẩm này được trang bị hàng loạt công nghệ tiên tiến nhất hiện nay, mang lại hiệu suất vượt trội và trải nghiệm liền mạch cho người dùng. Các điểm nhấn đáng chú ý bao gồm:</p>
							<ul>
								<li><strong>Hiệu năng tối ưu:</strong> Tích hợp vi xử lý thế hệ mới giúp tăng cường tốc độ xử lý, giảm thiểu độ trễ xuống mức thấp nhất, đáp ứng hoàn hảo các tác vụ nặng từ công việc đến giải trí.</li>
								<li><strong>Thiết kế công thái học:</strong> Kiểu dáng được nghiên cứu kỹ lưỡng nhằm mang lại cảm giác thoải mái tối đa khi sử dụng liên tục trong nhiều giờ liền, giảm thiểu tình trạng mỏi cổ tay hay đau tai thường gặp ở các sản phẩm giá rẻ.</li>
								<li><strong>Kết nối đa điểm mượt mà:</strong> Hỗ trợ các chuẩn kết nối không dây mới nhất (Bluetooth 5.0+), cho phép ghép nối đồng thời nhiều thiết bị và chuyển đổi qua lại chỉ trong nháy mắt.</li>
								<li><strong>Thời lượng pin ấn tượng:</strong> Hệ thống quản lý điện năng thông minh kết hợp cùng viên pin dung lượng lớn, cung cấp thời gian sử dụng thực tế vượt xa các đối thủ cùng phân khúc, đi kèm công nghệ sạc nhanh (sạc 15 phút dùng 3 giờ).</li>
							</ul>
						</div>
					</details>

					<details className="group border border-border rounded-lg bg-card open:shadow-md transition-all" open>
						<summary className="flex cursor-pointer list-none items-center justify-between p-4 font-semibold text-lg hover:text-primary transition-colors">
							Đánh giá chi tiết: Ưu và Nhược điểm
							<span className="transition-transform group-open:rotate-180">
								<svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"><polyline points="6 9 12 15 18 9"/></svg>
							</span>
						</summary>
						<div className="border-t border-border p-4 pt-4 text-muted-foreground text-sm">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<h4 className="font-semibold text-green-600 mb-2">✓ Ưu điểm vượt trội</h4>
									<ul className="space-y-1">
										<li>- Thiết kế cao cấp, hoàn thiện tỉ mỉ từ vật liệu thân thiện với môi trường, mang lại cảm giác sang trọng khi chạm vào.</li>
										<li>- Cấu hình phần cứng mạnh mẽ so với tầm giá, đảm bảo hiệu năng ổn định trong suốt vòng đời sản phẩm.</li>
										<li>- Giao diện sử dụng trực quan, thân thiện, dễ dàng cài đặt và tinh chỉnh ngay cả với người mới bắt đầu.</li>
										<li>- Tính năng khử ồn (đối với dòng tai nghe/mic) hoạt động cực kỳ hiệu quả, loại bỏ đến 90% tạp âm môi trường xung quanh.</li>
									</ul>
								</div>
								<div>
									<h4 className="font-semibold text-destructive mb-2">× Nhược điểm cần lưu ý</h4>
									<ul className="space-y-1">
										<li>- Mức giá khởi điểm có thể nhỉnh hơn đôi chút so với các sản phẩm phổ thông (nhưng hoàn toàn xứng đáng với chất lượng).</li>
										<li>- Đi kèm ít phụ kiện dự phòng trong hộp nguyên bản.</li>
										<li>- Yêu cầu cập nhật phần mềm (firmware) định kỳ để duy trì độ ổn định tốt nhất.</li>
									</ul>
								</div>
							</div>
						</div>
					</details>

					<details className="group border border-border rounded-lg bg-card open:shadow-md transition-all">
						<summary className="flex cursor-pointer list-none items-center justify-between p-4 font-semibold text-lg hover:text-primary transition-colors">
							Sản phẩm này dành cho ai?
							<span className="transition-transform group-open:rotate-180">
								<svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"><polyline points="6 9 12 15 18 9"/></svg>
							</span>
						</summary>
						<div className="border-t border-border p-4 pt-4 text-muted-foreground prose prose-slate max-w-none text-sm">
							<p>Với những trang bị "khủng" và thiết kế đa dụng, thiết bị này là sự lựa chọn hoàn hảo dành cho:</p>
							<ul>
								<li><strong>Dân văn phòng & Freelancers:</strong> Những người cần một thiết bị đáng tin cậy, hoạt động bền bỉ, dễ dàng mang theo khi di chuyển làm việc tại quán cafe hoặc đi công tác.</li>
								<li><strong>Gamer & Streamer:</strong> Nhóm người dùng đòi hỏi khắt khe về tốc độ phản hồi (latency) và chất lượng truyền tải âm thanh/hình ảnh trung thực.</li>
								<li><strong>Học sinh & Sinh viên:</strong> Cần một thiết bị đa năng vừa phục vụ tốt nhu cầu học tập trực tuyến (Zoom, Teams) vừa đáp ứng trọn vẹn nhu cầu giải trí cuối ngày.</li>
							</ul>
							<p>Ngược lại, nếu bạn chỉ tìm kiếm một giải pháp cực rẻ để "dùng tạm" hoặc không đòi hỏi cao về độ bền thì có thể cân nhắc các dòng sản phẩm thuộc phân khúc entry-level khác trên hệ thống của chúng tôi.</p>
						</div>
					</details>

					<details className="group border border-border rounded-lg bg-card open:shadow-md transition-all">
						<summary className="flex cursor-pointer list-none items-center justify-between p-4 font-semibold text-lg hover:text-primary transition-colors">
							Câu hỏi thường gặp (FAQ)
							<span className="transition-transform group-open:rotate-180">
								<svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"><polyline points="6 9 12 15 18 9"/></svg>
							</span>
						</summary>
						<div className="border-t border-border p-4 pt-4 text-muted-foreground space-y-4 text-sm">
							<div>
								<h5 className="font-semibold text-foreground">1. Sản phẩm có chống nước hay mồ hôi không?</h5>
								<p>Sản phẩm được trang bị khả năng kháng nước tiêu chuẩn (vui lòng xem chuẩn IPX ở phần thông số), hoàn toàn an toàn khi tiếp xúc với mồ hôi trong lúc tập luyện thể thao hoặc những cơn mưa phùn nhẹ. Tuy nhiên, bạn không nên ngâm sản phẩm trực tiếp dưới nước.</p>
							</div>
							<div>
								<h5 className="font-semibold text-foreground">2. Thời gian sạc đầy pin là bao lâu?</h5>
								<p>Nhờ công nghệ sạc nhanh thông qua cổng Type-C, thiết bị chỉ mất khoảng 1.5 đến 2 giờ để sạc đầy 100% pin từ trạng thái cạn kiệt, đáp ứng kịp thời nhu cầu sử dụng liên tục của bạn.</p>
							</div>
							<div>
								<h5 className="font-semibold text-foreground">3. Sản phẩm có hỗ trợ kết nối với iPhone/iPad không?</h5>
								<p>Có. Sản phẩm tương thích hoàn hảo với toàn bộ hệ sinh thái của Apple (iOS, iPadOS, macOS) cũng như các nền tảng phổ biến khác như Android, Windows. Việc ghép nối lần đầu chỉ mất khoảng 3 giây.</p>
							</div>
							<div>
								<h5 className="font-semibold text-foreground">4. Chế độ bảo hành áp dụng như thế nào?</h5>
								<p>Khi mua hàng tại MiniSetup, sản phẩm của bạn sẽ được bảo hành điện tử chính hãng trong thời gian tối thiểu 12 tháng. Đội ngũ kỹ thuật hỗ trợ xử lý 1 ĐỔI 1 trong 30 ngày đầu nếu phát hiện lỗi phần cứng.</p>
							</div>
							<div>
								<h5 className="font-semibold text-foreground">5. Trong hộp sản phẩm bao gồm những phụ kiện gì?</h5>
								<p>Bao bì gốc luôn đi kèm thiết bị chính, cáp sạc tiêu chuẩn, bộ tài liệu hướng dẫn sử dụng nhanh và phiếu bảo hành. Đối với một số dòng sản phẩm đặc thù, nhà sản xuất có thể tặng kèm thêm phụ kiện thay thế (ví dụ: eartips cao su các size).</p>
							</div>
						</div>
					</details>
				</div>

				<Feedback product={product} />
			</Section>

			<Section className="pt-0! space-y-2 lg:space-y-4">
				<Heading as="h2" variant="h3" className="text-center">
					{t("productPage.similarProducts")}
				</Heading>

				<div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
					{!isLoading ? (
						similarProducts?.map((item) => (
							<ProductCard 
								key={item._id} 
								data={item} 
								locale={locale as any}
								dictionary={{ productPage: { actions: { addToCart: t("productPage.actions.addToCart"), addToFavorites: t("productPage.actions.addToFavorites"), removeFromFavorites: t("productPage.actions.removeFromFavorites") } } }}
							/>
						))
					) : (
						<>
							<ProductCardSkeleton />
							<ProductCardSkeleton />
							<ProductCardSkeleton />
							<ProductCardSkeleton />
						</>
					)}
				</div>
			</Section>

			{/* SEO Text Section to improve Text-to-HTML ratio */}
			<section
				aria-label="Thông tin cam kết mua hàng"
				className="mt-16 pt-12 pb-16 border-t"
			>
				<div className="mx-auto max-w-4xl space-y-8 text-muted-foreground text-sm leading-relaxed">
					<div className="space-y-4">
						<h2 className="text-2xl font-bold text-foreground mb-4">
							Tại sao bạn nên chọn mua sản phẩm tại hệ thống của chúng tôi?
						</h2>
						<p>
							Khi quyết định đầu tư vào một sản phẩm công nghệ hoặc phụ kiện, điều quan trọng nhất không chỉ là thiết kế hay tính năng, mà còn là sự an tâm về chất lượng và dịch vụ hậu mãi. Tại cửa hàng của chúng tôi, mỗi sản phẩm trước khi đến tay người tiêu dùng đều phải trải qua quy trình kiểm tra nghiêm ngặt, đảm bảo tính nguyên bản và hoạt động ổn định nhất. Chúng tôi cam kết 100% hàng chính hãng, đầy đủ giấy tờ chứng minh nguồn gốc xuất xứ và được bảo hành theo đúng tiêu chuẩn của nhà sản xuất.
						</p>
						<p>
							Mua sắm trực tuyến đôi khi mang lại những rủi ro nhất định, thấu hiểu điều đó, chúng tôi áp dụng chính sách đổi trả vô cùng linh hoạt. Nếu sản phẩm bạn nhận được có bất kỳ lỗi phần cứng nào từ phía nhà sản xuất, bạn hoàn toàn có thể yêu cầu đổi mới trong vòng 15 đến 30 ngày đầu sử dụng. Đội ngũ kỹ thuật viên giàu kinh nghiệm của chúng tôi luôn túc trực 24/7 để hỗ trợ bạn xử lý mọi sự cố, từ việc cài đặt phần mềm, hướng dẫn sử dụng cho đến bảo trì thiết bị trong suốt vòng đời sản phẩm.
						</p>
						<p>
							Ngoài ra, chúng tôi liên tục tối ưu hóa quy trình vận chuyển để đảm bảo sản phẩm được đóng gói cẩn thận, chống sốc tuyệt đối và giao đến tận tay bạn trong thời gian ngắn nhất. Đi kèm với đó là hàng loạt các chương trình khuyến mãi, ưu đãi độc quyền dành riêng cho khách hàng thân thiết và các tùy chọn thanh toán linh hoạt, bao gồm cả trả góp 0% lãi suất. Hãy để chúng tôi đồng hành cùng bạn trong trải nghiệm công nghệ hoàn hảo này.
						</p>
					</div>
				</div>
			</section>
		</Container>
	);
}
