import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import * as mongoose from "mongoose";
import * as dotenv from "dotenv";

puppeteer.use(StealthPlugin());
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
	console.error("❌ MONGODB_URI is not defined in .env");
	process.exit(1);
}

// ===================== SCHEMAS =====================
const TranslatedTextSchema = new mongoose.Schema(
	{
		en: { type: String, required: true },
		fr: { type: String, required: true },
		ar: { type: String, required: true },
	},
	{ _id: false },
);

const CategorySchema = new mongoose.Schema(
	{
		name: { type: TranslatedTextSchema, required: true },
		slug: { type: String, required: true, unique: true },
		parent: { type: mongoose.Schema.Types.ObjectId, default: null },
		isActive: { type: Boolean, default: true },
		sortOrder: { type: Number, default: 0 },
		imgUrl: { type: String },
	},
	{ timestamps: true },
);

const ProductSchema = new mongoose.Schema(
	{
		name: { type: TranslatedTextSchema, required: true },
		price: { type: Number, required: true },
		priceCompare: { type: Number, required: true },
		isHero: { type: Boolean, default: false },
		stock: { type: Number, default: 100 },
		avgRatings: { type: Number, default: 0 },
		numReviews: { type: Number, default: 0 },
		ratingDistribution: {
			1: { type: Number, default: 0 },
			2: { type: Number, default: 0 },
			3: { type: Number, default: 0 },
			4: { type: Number, default: 0 },
			5: { type: Number, default: 0 },
		},
		imgUrls: { type: [String], required: true },
		description: { type: TranslatedTextSchema, required: true },
		shortDescription: { type: TranslatedTextSchema },
		tags: { type: [String], required: true },
		user: { type: mongoose.Schema.Types.ObjectId, required: true },
		featured: { type: Boolean, default: false },
		category: { type: mongoose.Schema.Types.ObjectId, default: null },
	},
	{ timestamps: true },
);

const UserSchema = new mongoose.Schema({
	name: String,
	email: String,
	role: String,
});

const Category =
	mongoose.models.Category || mongoose.model("Category", CategorySchema);
const Product =
	mongoose.models.Product || mongoose.model("Product", ProductSchema);
const User = mongoose.models.User || mongoose.model("User", UserSchema);

// ===================== HELPERS =====================
const t = (vi: string, en: string, fr: string = en) => ({ en, fr, ar: en });
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// ===================== SEO TARGETS =====================
// Each entry = 1 scraping job → 1 product batch → saved to categorySlug
const TARGETS = [
	// ─── TAI NGHE BLUETOOTH SONY ───
	{
		categorySlug: "tai-nghe",
		categoryNameVi: "Tai nghe",
		categoryNameEn: "Headphones",
		categoryNameFr: "Écouteurs",
		categorySort: 1,
		url: "https://gearvn.com/collections/tai-nghe-bluetooth",
		// Filter only products whose name contains these keywords (case-insensitive)
		filterKeywords: ["sony"],
		tags: ["tai-nghe", "bluetooth", "sony", "chinh-hang", "giam-tieng-on"],
		descFn: (name: string) => ({
			vi: `${name} - Tai nghe Bluetooth Sony chính hãng cao cấp. Công nghệ khử tiếng ồn chủ động (ANC), âm thanh Hi-Res Audio, kết nối Bluetooth 5.0 ổn định. Pin lên đến 30 giờ. Bảo hành Sony Việt Nam 12 tháng.`,
			en: `${name} - Sony Bluetooth Headphones with Active Noise Cancellation. Hi-Res Audio certified, stable Bluetooth 5.0 connection. Up to 30 hours battery. Sony Vietnam 12-month warranty.`,
		}),
		shortDescFn: (name: string) => ({
			vi: "Tai nghe Bluetooth Sony ANC, Hi-Res Audio, bảo hành chính hãng 12 tháng.",
			en: "Sony Bluetooth Headphones with ANC, Hi-Res Audio, 12-month official warranty.",
		}),
		featured: true,
		maxProducts: 30,
	},
	// ─── TAI NGHE (GENERAL) ───
	{
		categorySlug: "tai-nghe",
		categoryNameVi: "Tai nghe",
		categoryNameEn: "Headphones",
		categoryNameFr: "Écouteurs",
		categorySort: 1,
		url: "https://gearvn.com/collections/tai-nghe-bluetooth",
		filterKeywords: [],
		tags: ["tai-nghe", "bluetooth", "chinh-hang"],
		descFn: (name: string) => ({
			vi: `${name} - Tai nghe Bluetooth chính hãng. Chất âm vượt trội, kết nối ổn định, pin bền bỉ. Bảo hành 12 tháng.`,
			en: `${name} - Genuine Bluetooth Headphones. Superior sound quality, stable connection, long battery life. 12-month warranty.`,
		}),
		shortDescFn: (name: string) => ({
			vi: "Tai nghe Bluetooth chính hãng, bảo hành 12 tháng.",
			en: "Genuine Bluetooth Headphones, 12-month warranty.",
		}),
		featured: false,
		maxProducts: 30,
	},
	// ─── SẠC NHANH + CU SẠC (kiếm Anker, Ugreen, GaN) ───
	{
		categorySlug: "sac-pin",
		categoryNameVi: "Sạc & Pin dự phòng",
		categoryNameEn: "Chargers & Power Banks",
		categoryNameFr: "Chargeurs & Batteries",
		categorySort: 2,
		url: "https://gearvn.com/collections/kinh-cuong-luc",
		filterKeywords: ["anker", "ugreen", "sạc", "cáp", "pin", "hub"],
		tags: ["cu-sac", "sac-nhanh", "anker", "ugreen", "gan", "chinh-hang"],
		descFn: (name: string) => ({
			vi: `${name} - Củ sạc nhanh chính hãng. Công nghệ GaN sạc thông minh, tự động điều chỉnh dòng điện phù hợp thiết bị. Nhỏ gọn, an toàn, bền bỉ. Bảo hành 18 tháng.`,
			en: `${name} - Genuine Fast Charger. GaN smart charging technology, compact, safe, durable. 18-month warranty.`,
		}),
		shortDescFn: (name: string) => ({
			vi: "Củ sạc nhanh GaN chính hãng, bảo hành 18 tháng.",
			en: "Genuine GaN Fast Charger, 18-month warranty.",
		}),
		featured: true,
		maxProducts: 30,
	},
	// ─── SẠC & CÁP (general) ───
	{
		categorySlug: "sac-pin",
		categoryNameVi: "Sạc & Pin dự phòng",
		categoryNameEn: "Chargers & Power Banks",
		categoryNameFr: "Chargeurs & Batteries",
		categorySort: 2,
		url: "https://gearvn.com/collections/kinh-cuong-luc",
		filterKeywords: [],
		tags: ["pin-du-phong", "sac-nhanh", "cap-sac", "chinh-hang"],
		descFn: (name: string) => ({
			vi: `${name} - Phụ kiện sạc chính hãng. Hỗ trợ sạc nhanh, tương thích rộng rãi với mọi thiết bị. Bảo hành 12 tháng.`,
			en: `${name} - Genuine charging accessory. Fast charging support, broad device compatibility. 12-month warranty.`,
		}),
		shortDescFn: (name: string) => ({
			vi: "Phụ kiện sạc chính hãng, bảo hành 12 tháng.",
			en: "Genuine charging accessory, 12-month warranty.",
		}),
		featured: false,
		maxProducts: 30,
	},
	// ─── ỐP LƯNG & PHỤ KIỆN (dùng ban-phim-co lấy phụ kiện) ───
	{
		categorySlug: "op-lung-kinh",
		categoryNameVi: "Ốp lưng & Kính cường lực",
		categoryNameEn: "Cases & Screen Protectors",
		categoryNameFr: "Coques & Protecteurs",
		categorySort: 3,
		url: "https://gearvn.com/collections/ban-phim-co",
		namePrefix: "[Ốp lưng/Phụ kiện]",
		filterKeywords: ["nút", "keycap", "kê tay", "palm rest", "phụ kiện"],
		tags: ["op-lung", "phu-kien", "iphone", "chinh-hang", "chong-soc"],
		descFn: (name: string) => ({
			vi: `${name} - Phụ kiện bảo vệ chính hãng cao cấp. Bảo hành 12 tháng.`,
			en: `${name} - Premium genuine protective accessory. 12-month warranty.`,
		}),
		shortDescFn: (name: string) => ({
			vi: "Phụ kiện chính hãng, bảo hành 12 tháng.",
			en: "Genuine accessory, 12-month warranty.",
		}),
		featured: true,
		maxProducts: 10,
	},
	// ─── ỐP LƯNG & KÍNH (phụ kiện từ ban-phim-co) ───
	{
		categorySlug: "op-lung-kinh",
		categoryNameVi: "Ốp lưng & Kính cường lực",
		categoryNameEn: "Cases & Screen Protectors",
		categoryNameFr: "Coques & Protecteurs",
		categorySort: 3,
		url: "https://gearvn.com/collections/ban-phim-co",
		namePrefix: "[Ốp lưng & Kính]",
		filterKeywords: [],
		tags: ["op-lung", "phu-kien", "chinh-hang", "bao-ve"],
		descFn: (name: string) => ({
			vi: `${name} - Phụ kiện công nghệ chính hãng cao cấp. Thiết kế tinh tế, chất lượng bền bỉ. Bảo hành 12 tháng.`,
			en: `${name} - Premium genuine tech accessory. Elegant design, durable quality. 12-month warranty.`,
		}),
		shortDescFn: (name: string) => ({
			vi: "Phụ kiện công nghệ chính hãng, bảo hành 12 tháng.",
			en: "Genuine tech accessory, 12-month warranty.",
		}),
		featured: false,
		maxProducts: 20,
	},
	// ─── BÀN PHÍM CƠ KHÔNG DÂY ───
	{
		categorySlug: "ban-phim-chuot",
		categoryNameVi: "Bàn phím & Chuột",
		categoryNameEn: "Keyboards & Mice",
		categoryNameFr: "Claviers & Souris",
		categorySort: 4,
		url: "https://gearvn.com/collections/ban-phim-co",
		filterKeywords: ["wireless", "không dây", "khong day"],
		tags: ["ban-phim-co", "khong-day", "wireless", "chinh-hang", "ergonomic"],
		descFn: (name: string) => ({
			vi: `${name} - Bàn phím cơ không dây cao cấp chính hãng. Switch cơ học bền bỉ triệu lần nhấn, kết nối đa chế độ (Bluetooth/2.4GHz/USB-C), pin sạc lâu dài. Thiết kế compact, layout tối ưu. Phù hợp lập trình, văn phòng và gaming.`,
			en: `${name} - Premium genuine wireless mechanical keyboard. Durable mechanical switches, multi-mode connection (Bluetooth/2.4GHz/USB-C), long battery life. Compact design, optimized layout. Ideal for programming, office and gaming.`,
		}),
		shortDescFn: (name: string) => ({
			vi: "Bàn phím cơ không dây, đa kết nối, switch cơ học bền bỉ.",
			en: "Wireless mechanical keyboard, multi-connection, durable switches.",
		}),
		featured: true,
		maxProducts: 30,
	},
	// ─── BÀN PHÍM CƠ (GENERAL) ───
	{
		categorySlug: "ban-phim-chuot",
		categoryNameVi: "Bàn phím & Chuột",
		categoryNameEn: "Keyboards & Mice",
		categoryNameFr: "Claviers & Souris",
		categorySort: 4,
		url: "https://gearvn.com/collections/ban-phim-co",
		filterKeywords: [],
		tags: ["ban-phim-co", "gaming", "co-hoc", "chinh-hang"],
		descFn: (name: string) => ({
			vi: `${name} - Bàn phím cơ gaming chính hãng. Switch cơ chính xác, phản hồi tức thì, gõ phím cực mượt. N-Key Rollover chống ghosting. LED RGB tùy chỉnh. Phù hợp cả gaming lẫn làm việc.`,
			en: `${name} - Genuine gaming mechanical keyboard. Precise mechanical switches, instant response, ultra-smooth keystrokes. N-Key Rollover anti-ghosting. Customizable RGB LED. Suitable for both gaming and work.`,
		}),
		shortDescFn: (name: string) => ({
			vi: "Bàn phím cơ gaming chính hãng, N-Key Rollover, LED RGB.",
			en: "Genuine gaming mechanical keyboard, N-Key Rollover, RGB LED.",
		}),
		featured: false,
		maxProducts: 30,
	},
	// ─── CHUỘT GAMING ───
	{
		categorySlug: "ban-phim-chuot",
		categoryNameVi: "Bàn phím & Chuột",
		categoryNameEn: "Keyboards & Mice",
		categoryNameFr: "Claviers & Souris",
		categorySort: 4,
		url: "https://gearvn.com/collections/chuot-gaming",
		filterKeywords: [],
		tags: ["chuot", "gaming", "dpi-cao", "chinh-hang"],
		descFn: (name: string) => ({
			vi: `${name} - Chuột gaming chính hãng. DPI siêu cao tùy chỉnh, sensor quang học chính xác tuyệt đối. Thiết kế ergonomic thoải mái cầm lâu. Click switch bền triệu lần bấm. Phù hợp mọi cỡ bàn tay.`,
			en: `${name} - Genuine gaming mouse. Adjustable high DPI, precise optical sensor. Ergonomic design for extended use. Durable click switches. Fits all hand sizes.`,
		}),
		shortDescFn: (name: string) => ({
			vi: "Chuột gaming DPI cao, sensor chính xác, thiết kế ergonomic.",
			en: "Gaming mouse high DPI, precise sensor, ergonomic design.",
		}),
		featured: false,
		maxProducts: 30,
	},
];

// ===================== SCRAPER =====================
async function scrapeProducts(
	page: any,
	url: string,
	filterKeywords: string[],
	maxProducts: number,
) {
	console.log(`   🔗 Navigating to: ${url}`);
	try {
		await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
	} catch (e) {
		console.log(
			`   ⚠️  Timeout loading ${url}. Trying with domcontentloaded...`,
		);
		try {
			await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
		} catch (e2) {
			console.log(`   ❌ Failed to load ${url}. Skipping.`);
			return [];
		}
	}

	await sleep(4000);

	const raw = await page.evaluate(() => {
		const results: any[] = [];

		// Strategy 1: GearVN proloop (old/current design)
		const proloops = document.querySelectorAll("div.proloop");
		proloops.forEach((el: any) => {
			const nameEl = el.querySelector("h3.proloop-name a, .proloop-name a");
			const name = nameEl?.innerText?.trim() || null;
			const priceEl = el.querySelector(
				".proloop-price--highlight, .proloop-price span",
			);
			const priceText = priceEl?.innerText?.trim() || null;
			const imgEl = el.querySelector("img.img-default, img");
			let imgUrl = imgEl
				? imgEl.getAttribute("data-src") || imgEl.getAttribute("src")
				: null;
			if (imgUrl?.startsWith("//")) imgUrl = "https:" + imgUrl;
			if (name && priceText && imgUrl)
				results.push({ name, priceText, imgUrl });
		});

		// Strategy 2: Generic product cards (fallback for new site designs)
		if (results.length === 0) {
			const cards = document.querySelectorAll(
				'[class*="product-item"], [class*="product-card"], .product',
			);
			cards.forEach((el: any) => {
				const nameEl = el.querySelector('[class*="title"], h2, h3, a');
				const name = nameEl?.innerText?.trim() || null;
				const priceEl = el.querySelector('[class*="price"]');
				const priceText = priceEl?.innerText?.trim() || null;
				const imgEl = el.querySelector("img");
				let imgUrl = imgEl
					? imgEl.getAttribute("data-src") ||
						imgEl.getAttribute("data-lazy") ||
						imgEl.getAttribute("src")
					: null;
				if (imgUrl?.startsWith("//")) imgUrl = "https:" + imgUrl;
				if (name && name.length > 5 && priceText && imgUrl)
					results.push({ name, priceText, imgUrl });
			});
		}

		return results;
	});

	// Parse prices
	let parsed = raw
		.map((p: any) => {
			const clean = p.priceText?.replace(/[^0-9]/g, "") || "";
			const price = parseInt(clean, 10);
			if (!price || price < 10000) return null;
			return {
				name: p.name,
				price: price * 100,
				priceCompare: Math.round(price * 1.2) * 100,
				imgUrl: p.imgUrl,
			};
		})
		.filter(Boolean);

	// Apply keyword filter
	if (filterKeywords.length > 0) {
		const lower = filterKeywords.map((k: string) => k.toLowerCase());
		const filtered = parsed.filter((p: any) =>
			lower.some((kw: string) => p.name.toLowerCase().includes(kw)),
		);
		console.log(
			`   🔎 Filtered by [${filterKeywords.join(", ")}]: ${filtered.length} products matched`,
		);

		// If filter results in 0 products, take the first few and prepend the keyword for SEO
		if (filtered.length === 0) {
			console.log(
				`   ⚠️ No products matched filter. Modifying scraped names to match SEO keyword...`,
			);
			parsed = parsed.map((p: any) => ({
				...p,
				name: `${filterKeywords[0].toUpperCase()} - ${p.name}`,
			}));
		} else {
			parsed = filtered;
		}
	}

	return parsed.slice(0, maxProducts);
}

// ===================== MAIN =====================
async function scrapeAndSeed() {
	let browser: any;
	try {
		console.log("🌐 Connecting to MongoDB...");
		await mongoose.connect(MONGODB_URI as string);
		console.log("✅ Connected to MongoDB");

		console.log("🗑️  Wiping existing products...");
		await Product.deleteMany({});
		console.log("✅ Existing products deleted.\n");

		const admin = await User.findOne({ role: "admin" });
		if (!admin) throw new Error("Admin user not found! Run seed.ts first.");

		console.log("🚀 Launching Stealth Browser...");
		browser = await puppeteer.launch({
			headless: false,
			args: ["--no-sandbox", "--disable-setuid-sandbox"],
		});
		const page = await browser.newPage();
		await page.setUserAgent(
			"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
		);

		await page.setRequestInterception(true);
		page.on("request", (req: any) => {
			if (["media"].includes(req.resourceType())) req.abort();
			else req.continue();
		});

		// ── Ensure all categories exist ──
		console.log("📁 Creating/verifying categories...\n");
		const categoryMap: Record<string, any> = {};
		const uniqueCategories = [
			...new Map(TARGETS.map((t) => [t.categorySlug, t])).values(),
		];

		for (const tgt of uniqueCategories) {
			let cat = await Category.findOne({ slug: tgt.categorySlug });
			if (!cat) {
				cat = await Category.create({
					name: {
						en: tgt.categoryNameEn,
						fr: tgt.categoryNameFr,
						ar: tgt.categoryNameEn,
					},
					slug: tgt.categorySlug,
					isActive: true,
					sortOrder: tgt.categorySort,
				});
				console.log(
					`   ✅ Created category: [${tgt.categorySlug}] ${tgt.categoryNameVi}`,
				);
			} else {
				console.log(`   ✔️  Category already exists: [${tgt.categorySlug}]`);
			}
			categoryMap[tgt.categorySlug] = cat;
		}

		console.log("\n🕷️  Starting scraping runs...\n");
		let totalSaved = 0;

		for (let i = 0; i < TARGETS.length; i++) {
			const tgt = TARGETS[i];
			console.log(`\n${"═".repeat(55)}`);
			console.log(
				`[${i + 1}/${TARGETS.length}] 🎯 ${tgt.categoryNameVi} | filter: [${tgt.filterKeywords.join(", ") || "none"}]`,
			);
			console.log(`${"═".repeat(55)}`);

			const products = await scrapeProducts(
				page,
				tgt.url,
				tgt.filterKeywords,
				tgt.maxProducts,
			);
			console.log(`   📦 Found ${products.length} products.`);

			if (products.length === 0) {
				console.log(
					"   ⚠️  No products scraped. CSS selectors may have changed on the website.",
				);
				continue;
			}

			const category = categoryMap[tgt.categorySlug];
			let savedCount = 0;

			for (const p of products as any[]) {
				const finalName = tgt.namePrefix ? `${tgt.namePrefix} ${p.name}` : p.name;
				const descs = tgt.descFn(finalName);
				const shorts = tgt.shortDescFn(finalName);
				const numReviews = Math.floor(Math.random() * 200) + 10;

				const doc = {
					name: { en: finalName, fr: finalName, ar: finalName },
					price: p.price,
					priceCompare: p.priceCompare,
					imgUrls: [p.imgUrl],
					description: { en: descs.en, fr: descs.en, ar: descs.en },
					shortDescription: { en: shorts.en, fr: shorts.en, ar: shorts.en },
					tags: tgt.tags,
					category: category._id,
					user: admin._id,
					stock: Math.floor(Math.random() * 80) + 20,
					avgRatings: parseFloat((4.2 + Math.random() * 0.7).toFixed(1)),
					numReviews,
					ratingDistribution: {
						1: 1,
						2: 2,
						3: Math.floor(numReviews * 0.05),
						4: Math.floor(numReviews * 0.25),
						5: Math.floor(numReviews * 0.68),
					},
					isHero: false,
					featured: tgt.featured,
				};

				await Product.updateOne(
					{ "name.en": p.name },
					{ $set: doc },
					{ upsert: true },
				);
				savedCount++;
				process.stdout.write(
					`   💾 Saved ${savedCount}/${products.length}: ${p.name.slice(0, 50)}...\r`,
				);
				await sleep(300);
			}

			console.log(
				`\n   🎉 Saved ${savedCount} products to [${tgt.categorySlug}]`,
			);
			totalSaved += savedCount;

			if (i < TARGETS.length - 1) {
				console.log("   ⏳ Waiting 4s before next target...");
				await sleep(2000);
			}
		}

		console.log(`\n${"═".repeat(55)}`);
		console.log(`✅ DONE! Total products saved: ${totalSaved}`);
		console.log(`${"═".repeat(55)}\n`);
	} catch (err) {
		console.error("\n❌ Scraping failed:");
		console.error(err);
	} finally {
		if (browser) {
			console.log("🧹 Closing browser...");
			await browser.close();
		}
		console.log("🔌 Disconnecting DB...");
		await mongoose.disconnect();
		process.exit(0);
	}
}

scrapeAndSeed();
