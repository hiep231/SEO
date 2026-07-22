// Server Component — No "use client" directive
// H1 và SEO content render server-side để Google đọc được ngay từ HTML đầu tiên

import { Suspense } from "react";

import { ChevronDown } from "lucide-react";

import { Container } from "@/components/common/container";

import ProductsClient from "./components/products-client";

export default function Page() {
	return (
		<Container>
			{/* ── SEO Header — Server-rendered ────────────────────────────── */}
			{/* H1 xuất hiện trong View Source HTML, Google đọc được ngay */}
			<section className="py-4 lg:py-8">
				<h1 className="font-display text-3xl font-bold tracking-tight text-foreground mb-6">
					Tất cả sản phẩm công nghệ chính hãng
				</h1>

				{/* Filter/Sort/Product List — Client Component (cần interactivity) */}
				<Suspense fallback={<div className="h-96" />}>
					<ProductsClient />
				</Suspense>
			</section>

			{/* ── SEO & FAQ Section — Server-rendered ─────────────────────── */}
			{/* Static content không cần JS → render server-side, tăng Text/HTML ratio */}
			<section
				aria-label="Thông tin mua sắm và câu hỏi thường gặp"
				className="mt-16 pt-12 pb-16 border-t"
			>
				<div className="mx-auto max-w-4xl space-y-8 text-muted-foreground text-sm leading-relaxed">
					<div className="space-y-4">
						<h2 className="text-2xl font-bold text-foreground mb-4">
							Khám phá hàng ngàn sản phẩm công nghệ chính hãng với giá tốt nhất
						</h2>
						<p>
							Chào mừng bạn đến với trang danh sách sản phẩm tổng hợp tại cửa
							hàng của chúng tôi. Tại đây, chúng tôi tự hào mang đến cho khách
							hàng một hệ sinh thái sản phẩm công nghệ đa dạng, phong phú từ
							các thiết bị thông minh, phụ kiện máy tính, âm thanh cho đến các
							thiết bị mạng chất lượng cao. Mục tiêu của chúng tôi là đáp ứng
							mọi nhu cầu mua sắm công nghệ của người tiêu dùng hiện đại, từ
							làm việc, giải trí cho đến học tập, với một trải nghiệm mua sắm
							tiện lợi và an toàn tuyệt đối.
						</p>
						<p>
							Tất cả các sản phẩm đang được bán trên nền tảng của chúng tôi
							đều được cam kết 100% là hàng chính hãng. Chúng tôi hợp tác trực
							tiếp với các thương hiệu công nghệ hàng đầu và các nhà phân phối
							ủy quyền uy tín trên toàn thế giới. Điều này đảm bảo rằng mỗi
							sản phẩm khi đến tay khách hàng đều nguyên seal, mới 100%, có
							nguồn gốc xuất xứ rõ ràng và đáp ứng đầy đủ các tiêu chuẩn kiểm
							định khắt khe nhất của nhà sản xuất.
						</p>
						<p>
							Khi mua sắm tại đây, bạn không chỉ được trải nghiệm sự đa dạng về
							mẫu mã mà còn được tận hưởng mức giá vô cùng cạnh tranh. Chúng
							tôi liên tục cập nhật các chương trình khuyến mãi, ưu đãi độc
							quyền, flash sale và chính sách giảm giá dành cho khách hàng thân
							thiết. Bên cạnh đó, hệ thống bộ lọc thông minh cho phép bạn dễ
							dàng tìm kiếm sản phẩm theo tên, danh mục, mức giá và đánh giá,
							giúp tiết kiệm tối đa thời gian mua sắm.
						</p>
					</div>

					<div className="mt-10 pt-10 border-t border-border">
						<h3 className="text-xl font-bold text-foreground mb-6">
							Câu hỏi thường gặp khi mua sắm trực tuyến (FAQ)
						</h3>
						<div className="space-y-4">
							<details className="group rounded-xl border bg-card p-5 hover:shadow-md transition-all duration-200">
								<summary className="font-semibold text-base cursor-pointer list-none flex justify-between items-center text-foreground">
									<span>
										1. Làm thế nào để tôi có thể tìm kiếm và chọn mua sản phẩm phù hợp nhất?
									</span>
									<span className="transition duration-300 group-open:rotate-180 text-muted-foreground flex-shrink-0 ml-4">
										<ChevronDown className="w-6 h-6" />
									</span>
								</summary>
								<div className="mt-4 pt-4 border-t border-border/50 text-sm text-muted-foreground leading-relaxed space-y-3">
									<p>Chúng tôi đã tích hợp công cụ tìm kiếm và bộ lọc cực kỳ mạnh mẽ ngay trên trang này. Bạn có thể gõ trực tiếp tên sản phẩm vào thanh tìm kiếm, hoặc sử dụng các bộ lọc để khoanh vùng theo thương hiệu, danh mục (như bàn phím, chuột, tai nghe...), mức giá mà bạn mong muốn, hoặc thậm chí là dựa trên đánh giá 5 sao từ những người mua trước.</p>
									<p>Nếu bạn vẫn đang phân vân, đừng ngần ngại liên hệ ngay với đội ngũ chăm sóc khách hàng của chúng tôi qua khung chat trực tuyến hoặc hotline. Chúng tôi luôn sẵn sàng lắng nghe và đưa ra tư vấn chính xác, tối ưu chi phí nhất.</p>
								</div>
							</details>

							<details className="group rounded-xl border bg-card p-5 hover:shadow-md transition-all duration-200">
								<summary className="font-semibold text-base cursor-pointer list-none flex justify-between items-center text-foreground">
									<span>
										2. Thời gian giao hàng dự kiến và chi phí vận chuyển là bao nhiêu?
									</span>
									<span className="transition duration-300 group-open:rotate-180 text-muted-foreground flex-shrink-0 ml-4">
										<ChevronDown className="w-6 h-6" />
									</span>
								</summary>
								<div className="mt-4 pt-4 border-t border-border/50 text-sm text-muted-foreground leading-relaxed space-y-3">
									<p>Ngay sau khi hệ thống xác nhận đơn hàng của bạn thành công, chúng tôi sẽ tiến hành đóng gói và giao cho đơn vị vận chuyển trong thời gian sớm nhất. Đối với các đơn hàng tại khu vực nội thành, thời gian giao hàng thường chỉ mất từ 1 đến 2 ngày làm việc. Đối với khu vực ngoại thành và các tỉnh thành khác, thời gian dao động từ 3 đến 5 ngày làm việc.</p>
									<p>Đặc biệt, chúng tôi thường xuyên có các mã miễn phí vận chuyển (Freeship) áp dụng cho các đơn hàng đạt giá trị tối thiểu hoặc trong các sự kiện ưu đãi hàng tháng.</p>
								</div>
							</details>

							<details className="group rounded-xl border bg-card p-5 hover:shadow-md transition-all duration-200">
								<summary className="font-semibold text-base cursor-pointer list-none flex justify-between items-center text-foreground">
									<span>
										3. Nếu sản phẩm tôi nhận được bị lỗi, tôi có thể đổi trả hay không?
									</span>
									<span className="transition duration-300 group-open:rotate-180 text-muted-foreground flex-shrink-0 ml-4">
										<ChevronDown className="w-6 h-6" />
									</span>
								</summary>
								<div className="mt-4 pt-4 border-t border-border/50 text-sm text-muted-foreground leading-relaxed space-y-3">
									<p>Hoàn toàn được! Sự hài lòng của khách hàng là ưu tiên số một của chúng tôi. Chúng tôi áp dụng chính sách lỗi 1 đổi 1 trong vòng 7 đến 30 ngày (tùy thuộc vào quy định của từng ngành hàng) nếu sản phẩm phát sinh lỗi kỹ thuật do nhà sản xuất.</p>
									<p>Điều kiện để được hỗ trợ đổi trả rất đơn giản: sản phẩm cần còn nguyên vẹn, không có dấu hiệu rơi vỡ, va đập, vô nước, còn đầy đủ hộp, phụ kiện đi kèm và hóa đơn mua hàng. Quý khách chỉ cần liên hệ với bộ phận hỗ trợ kỹ thuật, chúng tôi sẽ hướng dẫn chi tiết quy trình đổi mới nhanh chóng nhất.</p>
								</div>
							</details>
						</div>
					</div>
				</div>
			</section>
		</Container>
	);
}
