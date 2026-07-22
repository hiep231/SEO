import { Metadata } from "next";
import Link from "next/link";

import { Locale } from "@repo/types";

import { Container } from "@/components/common/container";
import { Section } from "@/components/common/section";

import config from "@/lib/config";
import { localizePath } from "@/lib/i18n";
import { getCategoryPath } from "@/lib/string-utils";

import { MOCK_ARTICLES } from "../page";

interface Props {
	params: Promise<{ lang: Locale; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const article = MOCK_ARTICLES.find((a) => a.slug === slug);
	if (!article) return {};
	return {
		title: `${article.title} | ${config.websiteName}`,
		description: article.excerpt,
		keywords: article.tags,
		openGraph: {
			title: article.title,
			description: article.excerpt,
			type: "article",
			publishedTime: article.date,
			tags: article.tags,
		},
	};
}

export async function generateStaticParams() {
	return MOCK_ARTICLES.map((article) => ({
		slug: article.slug,
	}));
}

// Simple markdown-like renderer for the article content
function renderContent(raw: string) {
	const lines = raw.split("\n");
	const elements: React.ReactNode[] = [];
	let i = 0;
	let key = 0;

	while (i < lines.length) {
		const line = lines[i].trimEnd();

		// H2
		if (line.startsWith("## ")) {
			elements.push(
				<h2 key={key++} className="text-2xl font-bold mt-10 mb-4 text-foreground border-b pb-2">
					{line.slice(3)}
				</h2>,
			);
		}
		// H3
		else if (line.startsWith("### ")) {
			elements.push(
				<h3 key={key++} className="text-xl font-semibold mt-6 mb-3 text-foreground">
					{line.slice(4)}
				</h3>,
			);
		}
		// H4
		else if (line.startsWith("#### ")) {
			elements.push(
				<h4 key={key++} className="text-lg font-semibold mt-4 mb-2 text-foreground">
					{line.slice(5)}
				</h4>,
			);
		}
		// HR
		else if (line === "---") {
			elements.push(<hr key={key++} className="my-8 border-border" />);
		}
		// Table
		else if (line.startsWith("|")) {
			const tableLines: string[] = [];
			while (i < lines.length && lines[i].trim().startsWith("|")) {
				tableLines.push(lines[i]);
				i++;
			}
			const [headerLine, , ...dataLines] = tableLines;
			const headers = headerLine
				.split("|")
				.map((h) => h.trim())
				.filter(Boolean);
			const rows = dataLines.map((dl) =>
				dl
					.split("|")
					.map((d) => d.trim())
					.filter(Boolean),
			);
			elements.push(
				<div key={key++} className="overflow-x-auto my-6 rounded-lg border">
					<table className="w-full text-sm">
						<thead className="bg-muted">
							<tr>
								{headers.map((h, hi) => (
									<th key={hi} className="px-4 py-3 text-left font-semibold">
										{h}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{rows.map((row, ri) => (
								<tr key={ri} className="border-t even:bg-muted/30">
									{row.map((cell, ci) => (
										<td key={ci} className="px-4 py-3">
											{cell}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>,
			);
			continue;
		}
		// Blockquote
		else if (line.startsWith("> ")) {
			elements.push(
				<blockquote
					key={key++}
					className="border-l-4 border-primary bg-primary/5 pl-4 py-3 my-4 italic text-foreground/80 rounded-r-lg"
				>
					{line.slice(2)}
				</blockquote>,
			);
		}
		// Bullet list item
		else if (line.startsWith("- ")) {
			const listItems: string[] = [];
			while (i < lines.length && lines[i].trimEnd().startsWith("- ")) {
				listItems.push(lines[i].trimEnd().slice(2));
				i++;
			}
			elements.push(
				<ul key={key++} className="list-disc list-inside space-y-1 my-4 pl-2 text-foreground/90">
					{listItems.map((item, li) => (
						<li key={li} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
					))}
				</ul>,
			);
			continue;
		}
		// Bold paragraph with emoji
		else if (line.match(/^[🥇🥈🥉🟢🟡🔴🔵🟤🔴]/)) {
			elements.push(
				<p
					key={key++}
					className="my-3 text-foreground/90 leading-relaxed"
					dangerouslySetInnerHTML={{ __html: formatInline(line) }}
				/>,
			);
		}
		// Empty line
		else if (line === "") {
			// skip
		}
		// Normal paragraph
		else if (line.length > 0) {
			elements.push(
				<p
					key={key++}
					className="my-3 text-foreground/90 leading-relaxed"
					dangerouslySetInnerHTML={{ __html: formatInline(line) }}
				/>,
			);
		}

		i++;
	}

	return elements;
}

function formatInline(text: string): string {
	// Bold **text**
	text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
	// Italic *text*
	text = text.replace(/\*(.+?)\*/g, "<em>$1</em>");
	// Inline code `code`
	text = text.replace(
		/`(.+?)`/g,
		'<code class="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">$1</code>',
	);
	return text;
}

export default async function ArticlePage({ params }: Props) {
	const { lang, slug } = await params;
	const article = MOCK_ARTICLES.find((a) => a.slug === slug);

	if (!article) {
		return (
			<Container>
				<Section className="py-20 text-center">
					<h1 className="text-3xl font-bold mb-4">Bài viết không tồn tại</h1>
					<Link href={localizePath("/tu-van", lang)} className="text-primary hover:underline">
						&larr; Quay lại danh sách tư vấn
					</Link>
				</Section>
			</Container>
		);
	}

	const otherArticles = MOCK_ARTICLES.filter((a) => a.slug !== slug).slice(0, 2);

	return (
		<main className="bg-background min-h-screen py-8">
			<Container>
				<div className="max-w-3xl mx-auto">
					{/* Breadcrumb */}
					<nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
						<Link href={localizePath("/", lang)} className="hover:text-foreground transition-colors">
							Trang chủ
						</Link>
						<span>/</span>
						<Link href={localizePath("/tu-van", lang)} className="hover:text-foreground transition-colors">
							Tư vấn
						</Link>
						<span>/</span>
						<span className="text-foreground line-clamp-1">{article.title}</span>
					</nav>

					{/* Article Header */}
					<header className="mb-8">
						<span className="inline-block text-xs font-semibold uppercase tracking-wide text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">
							{article.category}
						</span>
						<h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">{article.title}</h1>
						<p className="text-lg text-muted-foreground italic leading-relaxed mb-6">{article.excerpt}</p>

						<div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-y py-4">
							<span>📅 {article.date}</span>
							<span>⏱ {article.readTime}</span>
							<div className="flex flex-wrap gap-1">
								{article.tags.map((tag) => (
									<span key={tag} className="border rounded px-2 py-0.5 text-xs">
										#{tag}
									</span>
								))}
							</div>
						</div>
					</header>

					{/* Article Body */}
					<Section className="prose-article">
						{renderContent(article.content)}
					</Section>

					{/* CTA Box */}
					<div className="mt-12 p-6 bg-primary/5 border border-primary/20 rounded-xl text-center">
						<h3 className="text-xl font-bold mb-2">Tìm kiếm sản phẩm phù hợp?</h3>
						<p className="text-muted-foreground mb-4 text-sm">
							Khám phá đầy đủ danh mục phụ kiện công nghệ chính hãng tại MiniSetup – được tư vấn bởi chuyên gia.
						</p>
						<Link
							href={localizePath(getCategoryPath(article.category === "Tai nghe" ? "tai-nghe" : article.category === "Sạc & Pin dự phòng" ? "sac-pin" : "ban-phim-chuot"), lang)}
							className="inline-block bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
						>
							Xem sản phẩm liên quan →
						</Link>
					</div>

					{/* Related articles */}
					{otherArticles.length > 0 && (
						<div className="mt-12">
							<h3 className="text-xl font-bold mb-6">Bài viết liên quan</h3>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
								{otherArticles.map((rel) => (
									<Link
										key={rel.slug}
										href={localizePath(`/tu-van/${rel.slug}`, lang)}
										className="block border rounded-xl p-5 hover:shadow-md hover:border-primary/40 transition-all group bg-card"
									>
										<span className="text-xs text-primary font-semibold uppercase tracking-wide">{rel.category}</span>
										<h4 className="font-semibold mt-2 mb-2 group-hover:text-primary transition-colors leading-snug">
											{rel.title}
										</h4>
										<p className="text-sm text-muted-foreground line-clamp-2">{rel.excerpt}</p>
										<div className="text-xs text-muted-foreground mt-3">{rel.readTime}</div>
									</Link>
								))}
							</div>
						</div>
					)}

					{/* Back link */}
					<div className="mt-12 border-t pt-8">
						<Link
							href={localizePath("/tu-van", lang)}
							className="text-primary hover:underline font-medium"
						>
							&larr; Quay lại danh sách tư vấn
						</Link>
					</div>
				</div>
			</Container>
		</main>
	);
}
