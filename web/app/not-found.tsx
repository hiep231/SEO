import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "404 - Trang Không Tìm Thấy | Phụ Kiện Công Nghệ",
	description:
		"Trang bạn đang tìm kiếm không tồn tại. Hãy quay về trang chủ hoặc khám phá các sản phẩm phụ kiện công nghệ chính hãng của chúng tôi.",
	robots: { index: false, follow: true },
};

export default function NotFound() {
	return (
		<html lang="vi">
			<body>
				<main
					style={{
						minHeight: "100vh",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						fontFamily: "system-ui, sans-serif",
						background: "linear-gradient(135deg, #f0fdf9 0%, #e6f7f3 100%)",
						padding: "2rem",
						textAlign: "center",
					}}
				>
					<div
						style={{
							background: "#fff",
							borderRadius: "1.5rem",
							boxShadow: "0 8px 32px rgba(0,150,121,0.1)",
							padding: "3rem 4rem",
							maxWidth: "560px",
							width: "100%",
						}}
					>
						{/* Large 404 */}
						<div
							style={{
								fontSize: "7rem",
								fontWeight: 900,
								lineHeight: 1,
								background: "linear-gradient(135deg, #009679 0%, #00c49a 100%)",
								WebkitBackgroundClip: "text",
								WebkitTextFillColor: "transparent",
								marginBottom: "1rem",
							}}
						>
							404
						</div>

						<h1
							style={{
								fontSize: "1.75rem",
								fontWeight: 700,
								color: "#1a1a1a",
								marginBottom: "0.75rem",
							}}
						>
							Trang Không Tìm Thấy
						</h1>

						<p
							style={{
								color: "#6b7280",
								marginBottom: "2rem",
								lineHeight: 1.6,
								fontSize: "1rem",
							}}
						>
							Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển. Hãy
							kiểm tra lại đường dẫn hoặc quay về trang chủ.
						</p>

						{/* Navigation links */}
						<nav aria-label="Điều hướng trang 404">
							<ul
								style={{
									listStyle: "none",
									padding: 0,
									margin: 0,
									display: "flex",
									flexDirection: "column",
									gap: "0.75rem",
								}}
							>
								<li>
									<Link
										href="/vi"
										id="not-found-home-link"
										style={{
											display: "inline-block",
											background: "linear-gradient(135deg, #009679, #00c49a)",
											color: "#fff",
											padding: "0.75rem 2rem",
											borderRadius: "0.5rem",
											textDecoration: "none",
											fontWeight: 600,
											fontSize: "1rem",
											transition: "opacity 0.2s",
										}}
									>
										🏠 Về Trang Chủ
									</Link>
								</li>
								<li>
									<Link
										href="/vi/products"
										id="not-found-products-link"
										style={{
											display: "inline-block",
											border: "2px solid #009679",
											color: "#009679",
											padding: "0.75rem 2rem",
											borderRadius: "0.5rem",
											textDecoration: "none",
											fontWeight: 600,
											fontSize: "1rem",
										}}
									>
										🛍️ Xem Tất Cả Sản Phẩm
									</Link>
								</li>
								<li>
									<Link
										href="/vi/contact"
										id="not-found-contact-link"
										style={{
											color: "#009679",
											textDecoration: "underline",
											fontSize: "0.9rem",
										}}
									>
										Liên hệ hỗ trợ
									</Link>
								</li>
							</ul>
						</nav>

						{/* Helpful links */}
						<div
							style={{
								marginTop: "2rem",
								paddingTop: "1.5rem",
								borderTop: "1px solid #e5e7eb",
								display: "flex",
								gap: "1.5rem",
								justifyContent: "center",
								flexWrap: "wrap",
							}}
						>
							{[
								{ href: "/vi/products", label: "Tai nghe" },
								{ href: "/vi/products", label: "Sạc dự phòng" },
								{ href: "/vi/products", label: "Bàn phím cơ" },
								{ href: "/vi/about", label: "Giới thiệu" },
							].map((item) => (
								<Link
									key={item.label}
									href={item.href}
									style={{
										color: "#6b7280",
										textDecoration: "none",
										fontSize: "0.875rem",
									}}
								>
									{item.label}
								</Link>
							))}
						</div>
					</div>
				</main>
			</body>
		</html>
	);
}
