import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/common/container";
import { Section } from "@/components/common/section";
import config from "@/lib/config";

interface Props {
	params: Promise<{ slug: string }>;
}

const MOCK_ARTICLES = [
	{
		id: 1,
		title: "Top 5 Tai Nghe Bluetooth Đáng Mua Nhất 2026",
		slug: "top-5-tai-nghe-bluetooth-dang-mua-nhat",
		content: "<p>Thị trường tai nghe Bluetooth ngày càng đa dạng. Trong bài viết này, chúng tôi sẽ gợi ý cho bạn 5 mẫu tai nghe đáng mua nhất dựa trên tiêu chí chất âm, thời lượng pin và thiết kế.</p><h3>1. AirPods Pro 2</h3><p>Đỉnh cao chống ồn và hệ sinh thái mượt mà.</p><h3>2. Sony WH-1000XM5</h3><p>Chống ồn ấn tượng, phù hợp cho dân văn phòng.</p>",
		date: "2026-06-25",
	},
	{
		id: 2,
		title: "Hướng Dẫn Chọn Sạc Nhanh Chuẩn GaN Cho iPhone và MacBook",
		slug: "huong-dan-chon-sac-nhanh-chuan-gan",
		content: "<p>GaN (Gallium Nitride) là công nghệ sạc tiên tiến giúp giảm kích thước củ sạc nhưng vẫn giữ nguyên công suất mạnh mẽ.</p><h3>Tại sao nên dùng sạc GaN?</h3><p>Ít tỏa nhiệt, kích thước nhỏ và an toàn cho thiết bị.</p>",
		date: "2026-06-20",
	},
	{
		id: 3,
		title: "Bàn Phím Cơ Custom: Bắt Đầu Từ Đâu?",
		slug: "ban-phim-co-custom-bat-dau-tu-dau",
		content: "<p>Chơi bàn phím cơ không chỉ là công cụ nhập liệu mà còn là thú vui. Để bắt đầu, bạn cần hiểu về Switch, Keycap và Kit.</p><h3>Các loại Switch phổ biến</h3><p>Blue (Clicky), Brown (Tactile), Red (Linear).</p>",
		date: "2026-06-15",
	},
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const article = MOCK_ARTICLES.find(a => a.slug === slug);

	if (!article) {
		return {
			title: "Article Not Found",
		};
	}

	return {
		title: `${article.title} | ${config.websiteName}`,
		description: article.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + "...",
	};
}

export default async function BlogDetailPage({ params }: Props) {
	const { slug } = await params;
	const article = MOCK_ARTICLES.find(a => a.slug === slug);

	if (!article) {
		notFound();
	}

	return (
		<main className="bg-background min-h-screen py-10">
			<Container className="max-w-4xl">
				<article className="prose prose-lg dark:prose-invert max-w-none">
					<header className="mb-10 text-center">
						<h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{article.title}</h1>
						<div className="text-muted-foreground">
							Đăng ngày: {article.date}
						</div>
					</header>
					
					<div 
						className="space-y-6 text-foreground"
						dangerouslySetInnerHTML={{ __html: article.content }} 
					/>
				</article>

				<aside className="mt-16 pt-8 border-t">
					<h2 className="text-2xl font-semibold mb-4">Bạn có thể quan tâm</h2>
					<div className="text-muted-foreground italic">
						Đang cập nhật các bài viết liên quan...
					</div>
				</aside>
			</Container>
		</main>
	);
}
