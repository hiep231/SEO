import { Metadata } from "next";
import { notFound } from "next/navigation";

import { ItemList,WithContext } from "schema-dts";

import { Locale, locales, ProductEntity,PublicCategoryTree } from "@repo/types";

import { Container } from "@/components/common/container";

import config from "@/lib/config";
import {
	generateLocaleAlternates,
	generateOgMetadata,
	generateTwitterMetadata,
} from "@/lib/generate";
import { localizePath } from "@/lib/i18n";

import CategoryProductList from "../components/category-product-list";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Props {
	params: Promise<{ lang: Locale; slug: string }>;
}

// ─── Static Params ────────────────────────────────────────────────────────────
export const dynamicParams = false;

export async function generateStaticParams() {
	const params: { lang: Locale; slug: string }[] = [];
	try {
		const res = await fetch(`${config.serverUrl}/categories/tree`, {
			next: { revalidate: 3600 },
		});
		if (res.ok) {
			const categoryTree: PublicCategoryTree[] = await res.json();
			const allCategories = categoryTree.flatMap((cat) => [
				...( cat.children ?? []),
				cat,
			]);
			for (const lang of locales) {
				for (const category of allCategories) {
					params.push({ lang, slug: category.slug });
				}
			}
		}
	} catch (error) {
		console.error("Failed to fetch categories for static params:", error);
	}
	return params;
}

// ─── Server-side Data Fetching ─────────────────────────────────────────────────
async function fetchCategoryAndProducts(slug: string): Promise<{
	category: PublicCategoryTree | null;
	products: ProductEntity[];
}> {
	try {
		const catRes = await fetch(`${config.serverUrl}/categories/tree`, {
			next: { revalidate: 3600 },
		});
		if (!catRes.ok) return { category: null, products: [] };

		const categoryTree: PublicCategoryTree[] = await catRes.json();
		const allCategories = categoryTree.flatMap((cat) => [
			...(cat.children ?? []),
			cat,
		]);
		const category = allCategories.find((c) => c.slug === slug) ?? null;

		if (!category) return { category: null, products: [] };

		const prodRes = await fetch(
			`${config.serverUrl}/products?category=${category._id}`,
			{ next: { revalidate: 600 } },
		);
		const products: ProductEntity[] = prodRes.ok ? await prodRes.json() : [];

		return { category, products };
	} catch (error) {
		console.error("Failed to fetch category data:", error);
		return { category: null, products: [] };
	}
}

// ─── Dynamic Metadata ─────────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { lang, slug } = await params;
	const { category } = await fetchCategoryAndProducts(slug);

	const categoryName =
		category?.name[lang] ?? category?.name["vi"] ?? slug;

	const title = `${categoryName} Chính Hãng - Giá Tốt | ${config.websiteName}`;
	const description = `Mua ${categoryName} chính hãng, giá tốt, bảo hành dài hạn tại ${config.websiteName}. Hàng nghìn sản phẩm ${categoryName} đa dạng, giao hàng toàn quốc nhanh chóng.`;
	const path = localizePath(`/category/${slug}`, lang);

	return {
		title,
		description,
		keywords: [
			categoryName,
			`${categoryName} chính hãng`,
			`mua ${categoryName}`,
			`${categoryName} giá rẻ`,
			`${categoryName} chất lượng`,
		],
		openGraph: generateOgMetadata({ title, description, path, type: "website" }),
		twitter: generateTwitterMetadata({ title, description }),
		alternates: generateLocaleAlternates(`/category/${slug}`, lang),
	};
}

// ─── JSON-LD Schema ────────────────────────────────────────────────────────────
function generateItemListSchema(
	products: ProductEntity[],
	lang: Locale,
	slug: string,
): WithContext<ItemList> {
	return {
		"@context": "https://schema.org",
		"@type": "ItemList",
		url: `${config.clientUrl}/${lang}/category/${slug}`,
		numberOfItems: products.length,
		itemListElement: products.slice(0, 20).map((product, index) => ({
			"@type": "ListItem",
			position: index + 1,
			url: `${config.clientUrl}/${lang}/product/${encodeURIComponent(product.name.en?.toLowerCase().replace(/\s+/g, "-") ?? product._id)}-${product._id}`,
			name: product.name[lang] ?? product.name["vi"],
		})),
	};
}

// ─── Page Component ────────────────────────────────────────────────────────────
export default async function Page({ params }: Props) {
	const { lang, slug } = await params;
	const { category, products } = await fetchCategoryAndProducts(slug);

	if (!category) {
		notFound();
	}

	const categoryName = category.name[lang] ?? category.name["vi"] ?? slug;
	const itemListSchema = generateItemListSchema(products, lang, slug);

	return (
		<main className="bg-background min-h-screen py-8">
			{/* JSON-LD: ItemList schema for product listing */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
			/>

			<Container>
				{/* ── SEO Header ─────────────────────────────────────────────── */}
				<header className="mb-10">
					{/* H1: luôn visible — không dùng sr-only (tránh cloaking risk) */}
					<h1 className="text-3xl font-bold mb-4 text-foreground">
						{categoryName}
					</h1>

					<div className="text-muted-foreground text-sm space-y-3 leading-relaxed max-w-3xl">
						<p>
							<strong>{categoryName}</strong> chính hãng là lựa chọn phổ biến và thiết yếu cho người dùng cần nâng tầm trải nghiệm âm thanh, thao tác làm việc hoặc giải trí hàng ngày. Với sự phát triển của công nghệ, việc đầu tư vào các thiết bị ngoại vi chất lượng không chỉ giúp tăng năng suất mà còn bảo vệ sức khỏe và mang lại sự tiện lợi tối đa.
						</p>
						<p>
							MiniSetup tự hào cung cấp bộ sưu tập <strong>{categoryName.toLowerCase()}</strong> đa dạng từ nhiều thương hiệu hàng đầu thế giới với nhiều phân khúc giá khác nhau. Dù bạn là dân văn phòng, game thủ chuyên nghiệp hay người dùng phổ thông, chúng tôi đều có sẵn những sản phẩm phù hợp đi kèm chế độ bảo hành 1 đổi 1 và dịch vụ hậu mãi chuẩn quốc tế.
						</p>
					</div>
				</header>

				{/* ── Product Listing (Client for load-more interactivity) ──── */}
				<section aria-label="Danh sách sản phẩm" className="py-4 lg:py-8">
					<CategoryProductList
						initialProducts={products}
						lang={lang}
					/>
				</section>

				{/* ── SEO & FAQ Section ──────────────────────────────────────── */}
				<section
					aria-label="Thông tin tư vấn và câu hỏi thường gặp"
					className="mt-16 pt-12 pb-16 border-t"
				>
					<div className="mx-auto max-w-4xl space-y-6 text-muted-foreground text-sm leading-relaxed">
						<h2 className="text-2xl font-bold text-foreground mb-4">
							Tại sao nên mua {categoryName} tại {config.websiteName}?
						</h2>
						<p>
							Với nhiều năm kinh nghiệm trong lĩnh vực phân phối phụ kiện công
							nghệ chính hãng, {config.websiteName} luôn đặt chất lượng sản
							phẩm và sự hài lòng của khách hàng lên hàng đầu. Chúng tôi hợp
							tác trực tiếp với các nhà sản xuất và nhà phân phối ủy quyền chính
							thức, đảm bảo mọi sản phẩm {categoryName.toLowerCase()} đều đáp
							ứng tiêu chuẩn kiểm định nghiêm ngặt nhất trước khi đến tay người
							tiêu dùng.
						</p>

						{/* Long Form SEO Content to boost Text/HTML ratio */}
						<div className="mt-14 pt-10 border-t border-border">
							<h3 className="text-xl font-bold text-foreground mb-6">
								Cẩm nang toàn tập: Hướng dẫn chọn mua {categoryName} chuẩn nhất
							</h3>
							<div className="space-y-6 text-muted-foreground">
								<p>
									Khi công nghệ ngày càng phát triển, việc sở hữu các thiết bị <strong>{categoryName}</strong> chất lượng không chỉ là nhu cầu giải trí mà còn là yếu tố thiết yếu để nâng cao năng suất làm việc. Tuy nhiên, giữa hàng ngàn sản phẩm đang được bày bán trên thị trường với đủ mọi mức giá, từ hàng chính hãng cao cấp đến hàng trôi nổi không rõ nguồn gốc, việc đưa ra quyết định mua sắm thông minh trở thành một thách thức lớn đối với nhiều người tiêu dùng. Thấu hiểu điều đó, {config.websiteName} đã xây dựng chuyên trang này không chỉ để cung cấp sản phẩm mà còn là nơi chia sẻ kiến thức, giúp bạn chọn được thiết bị hoàn hảo nhất.
								</p>
								
								<h4 className="text-lg font-semibold text-foreground mt-8 mb-3">1. Chọn theo nhu cầu sử dụng</h4>
								<p>
									Để lựa chọn được một sản phẩm ưng ý, bạn cần xác định rõ mục đích sử dụng chính của mình. Nếu bạn là dân văn phòng, ưu tiên hàng đầu nên là sự nhỏ gọn, tính thẩm mỹ và tính cơ động. Trong khi đó, nếu bạn là một game thủ, các yếu tố như độ trễ thấp (low latency), tần số phản hồi nhanh và hệ thống đèn LED RGB đồng bộ lại là những tiêu chí không thể bỏ qua. Những thiết bị chống ồn chủ động (ANC) sẽ là cứu cánh tuyệt vời cho những ai thường xuyên làm việc ở nơi công cộng hoặc di chuyển nhiều.
								</p>

								<h4 className="text-lg font-semibold text-foreground mt-8 mb-3">2. Chọn theo thời lượng pin và sạc</h4>
								<p>
									Đối với các thiết bị không dây như <strong>{categoryName}</strong>, thời lượng pin là yếu tố sống còn. Các mẫu sản phẩm cao cấp hiện nay thường cung cấp khả năng sử dụng liên tục từ 20 đến 40 giờ chỉ với một lần sạc. Bạn cũng nên ưu tiên các thiết bị có hỗ trợ công nghệ sạc nhanh (Fast Charging) thông qua cổng USB-C để tiết kiệm tối đa thời gian chờ đợi, đảm bảo không làm gián đoạn công việc hay trải nghiệm giải trí của bạn.
								</p>

								<h4 className="text-lg font-semibold text-foreground mt-8 mb-3">3. Chọn theo khả năng tương thích thiết bị</h4>
								<p>
									Trước khi quyết định mua hàng, hãy luôn kiểm tra kỹ khả năng tương thích của <strong>{categoryName}</strong> với hệ sinh thái thiết bị bạn đang sở hữu (iOS, Android, Windows, macOS). Tính năng kết nối đa điểm (Multipoint Connection) cho phép chuyển đổi mượt mà giữa điện thoại và laptop là một điểm cộng rất lớn. Hãy luôn đọc kỹ bảng thông số kỹ thuật mà chúng tôi cung cấp ở mỗi trang chi tiết sản phẩm để đưa ra quyết định chính xác nhất.
								</p>

								<h4 className="text-lg font-semibold text-foreground mt-8 mb-3">4. Những lầm tưởng phổ biến khi mua đồ công nghệ</h4>
								<p>
									Nhiều người dùng thường mắc sai lầm khi cho rằng "thông số càng cao thì càng tốt". Thực tế, một chiếc tai nghe có dải tần số cực rộng chưa chắc đã nghe hay hơn một chiếc tai nghe được tinh chỉnh âm bổng (treble) và âm trầm (bass) phù hợp với gu âm nhạc của bạn. Một củ sạc công suất 140W sẽ trở nên dư thừa và lãng phí nếu thiết bị của bạn chỉ hỗ trợ sạc tối đa 20W. 
								</p>
								<p>
									Ngoài ra, không phải cứ thương hiệu lớn nhất là sản phẩm sẽ tốt nhất trong mọi phân khúc. Hiện nay, có rất nhiều thương hiệu công nghệ mới nổi đang cung cấp các sản phẩm với chất lượng build cực kỳ xuất sắc, tích hợp công nghệ tiên tiến mà mức giá lại vô cùng dễ tiếp cận. {config.websiteName} luôn nỗ lực đa dạng hóa danh mục sản phẩm, từ các hãng truyền thống danh tiếng đến các thương hiệu "ngon, bổ, rẻ" đang làm mưa làm gió trên cộng đồng mạng, mang lại nhiều sự lựa chọn hơn cho khách hàng.
								</p>

								<h4 className="text-lg font-semibold text-foreground mt-8 mb-3">5. Cam kết vàng từ {config.websiteName}</h4>
								<p>
									Khi chọn mua bất kỳ sản phẩm <strong>{categoryName}</strong> nào tại hệ thống của chúng tôi, bạn hoàn toàn có thể an tâm tuyệt đối về chất lượng và dịch vụ. Chúng tôi áp dụng quy trình kiểm định 3 bước nghiêm ngặt trước khi nhập hàng. Mọi sản phẩm đến tay bạn đều đảm bảo nguyên tem, nguyên mác (seal), kèm theo hóa đơn chứng từ hợp lệ. 
								</p>
								<p>
									Đặc biệt, chính sách bảo hành 1 ĐỔI 1 trong 30 ngày đầu tiên (nếu có lỗi phần cứng từ nhà sản xuất) và chế độ bảo hành chính hãng từ 12-24 tháng sẽ bảo vệ quyền lợi tối đa cho người tiêu dùng. Đội ngũ chuyên gia công nghệ của chúng tôi luôn trực tuyến 24/7, sẵn sàng hỗ trợ cài đặt phần mềm, hướng dẫn kết nối, giải quyết sự cố kỹ thuật và tư vấn nâng cấp trọn đời. Hãy để {config.websiteName} đồng hành cùng bạn trên con đường chinh phục và làm chủ công nghệ!
								</p>
							</div>
						</div>

						{/* FAQ Section */}
						<div className="mt-14 pt-10 border-t border-border">
							<h3 className="text-xl font-bold text-foreground mb-6">
								Câu hỏi thường gặp (FAQ) khi chọn mua {categoryName}
							</h3>
							<div className="space-y-6">
								<div>
									<h4 className="text-base font-semibold text-foreground">Sản phẩm {categoryName} có được bảo hành toàn quốc không?</h4>
									<p className="text-muted-foreground mt-1">Có. Tất cả các thiết bị {categoryName} chính hãng bán ra tại hệ thống đều được bảo hành trên toàn quốc tại các trung tâm bảo hành ủy quyền của hãng. Ngoài ra, bạn cũng có thể gửi trực tiếp về cửa hàng để được hỗ trợ tiếp nhận bảo hành nhanh chóng.</p>
								</div>
								<div>
									<h4 className="text-base font-semibold text-foreground">Làm sao để biết {categoryName} nào tương thích với thiết bị của tôi?</h4>
									<p className="text-muted-foreground mt-1">Trong mỗi trang chi tiết sản phẩm, chúng tôi luôn cập nhật đầy đủ phần thông số kỹ thuật (Specifications) và danh sách thiết bị hỗ trợ. Nếu bạn vẫn còn phân vân, đừng ngần ngại liên hệ với đội ngũ CSKH qua hotline hoặc khung chat để được kiểm tra độ tương thích chính xác 100% trước khi đặt hàng.</p>
								</div>
								<div>
									<h4 className="text-base font-semibold text-foreground">Tôi có thể đổi trả nếu mua nhầm sản phẩm không?</h4>
									<p className="text-muted-foreground mt-1">Chúng tôi hỗ trợ chính sách đổi trả trong vòng 7 ngày đầu tiên nếu sản phẩm chưa qua sử dụng, còn nguyên seal và hộp. Đối với trường hợp mua nhầm, vui lòng giữ sản phẩm ở tình trạng hoàn hảo nhất và liên hệ ngay với chúng tôi để được hướng dẫn thủ tục đổi sản phẩm mới phù hợp hơn.</p>
								</div>
								<div>
									<h4 className="text-base font-semibold text-foreground">Shop có hỗ trợ giao hàng hỏa tốc trong ngày không?</h4>
									<p className="text-muted-foreground mt-1">Có. Đối với các khách hàng ở khu vực nội thành, chúng tôi có dịch vụ giao hàng hỏa tốc (nhận hàng trong 2-4 tiếng). Đối với các tỉnh thành khác, thời gian giao hàng tiêu chuẩn sẽ từ 2-4 ngày làm việc thông qua các đối tác vận chuyển uy tín.</p>
								</div>
							</div>
						</div>
					</div>
				</section>
			</Container>
		</main>
	);
}
