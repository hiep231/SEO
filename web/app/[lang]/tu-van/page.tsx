import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/common/container";
import { Section } from "@/components/common/section";
import config from "@/lib/config";

export const metadata: Metadata = {
	title: `Tư Vấn & Đánh Giá Phụ Kiện | ${config.websiteName}`,
	description: "Cập nhật các bài viết đánh giá, hướng dẫn chọn mua phụ kiện công nghệ chất lượng nhất.",
};

const MOCK_ARTICLES = [
	{
		id: 1,
		title: "Top 5 Tai Nghe Bluetooth Đáng Mua Nhất 2026",
		slug: "top-5-tai-nghe-bluetooth-dang-mua-nhat",
		excerpt: "Khám phá danh sách 5 mẫu tai nghe không dây có chất âm tốt nhất và chống ồn hoàn hảo cho công việc và giải trí.",
		date: "2026-06-25",
	},
	{
		id: 2,
		title: "Hướng Dẫn Chọn Sạc Nhanh Chuẩn GaN Cho iPhone và MacBook",
		slug: "huong-dan-chon-sac-nhanh-chuan-gan",
		excerpt: "Công nghệ sạc GaN là gì? Tại sao bạn nên nâng cấp củ sạc của mình ngay hôm nay?",
		date: "2026-06-20",
	},
	{
		id: 3,
		title: "Bàn Phím Cơ Custom: Bắt Đầu Từ Đâu?",
		slug: "ban-phim-co-custom-bat-dau-tu-dau",
		excerpt: "Tất tần tật những điều cần biết dành cho người mới bước chân vào thế giới bàn phím cơ.",
		date: "2026-06-15",
	},
];

export default function BlogIndexPage() {
	return (
		<main className="bg-background min-h-screen py-8">
			<Container>
				<Section>
					<h1 className="text-4xl font-bold mb-4">Tư Vấn Công Nghệ</h1>
					<p className="text-muted-foreground mb-12 text-lg">
						Cẩm nang hướng dẫn mua sắm, mẹo sử dụng và tin tức công nghệ mới nhất.
					</p>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{MOCK_ARTICLES.map((article) => (
							<article key={article.id} className="border rounded-lg p-6 flex flex-col hover:shadow-md transition-shadow bg-card">
								<h2 className="text-2xl font-semibold mb-3 line-clamp-2">
									<Link href={`/tu-van/${article.slug}`} className="hover:text-primary transition-colors">
										{article.title}
									</Link>
								</h2>
								<p className="text-muted-foreground mb-4 flex-1">{article.excerpt}</p>
								<div className="text-sm text-muted-foreground">
									Đăng ngày: {article.date}
								</div>
							</article>
						))}
					</div>
				</Section>
			</Container>
		</main>
	);
}
