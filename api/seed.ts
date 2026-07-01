import * as mongoose from "mongoose";
import * as dotenv from "dotenv";

// Load environment variables from api/.env
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
	console.error("MONGODB_URI is not defined in .env");
	process.exit(1);
}

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

const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);
const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
const User = mongoose.models.User || mongoose.model("User", UserSchema);

// Helpers
const t = (text: string) => ({ en: text, fr: text, ar: text });

async function seed() {
	try {
		console.log("Connecting to MongoDB...");
		await mongoose.connect(MONGODB_URI as string);
		console.log("Connected successfully!");

		// Clear existing data
		console.log("Clearing existing products and categories...");
		await Product.deleteMany({});
		await Category.deleteMany({});

		// Find or create a user to assign products to
		let adminUser = await User.findOne({ role: "admin" });
		if (!adminUser) {
			console.log("No admin user found. Creating a dummy admin user...");
			adminUser = await User.create({
				name: "Admin Dummy",
				email: "admin@dummy.com",
				role: "admin",
			});
		}

		console.log("Seeding categories...");
		const categoriesData = [
			{ name: t("Tai nghe"), slug: "tai-nghe", imgUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60" },
			{ name: t("Sạc & Pin"), slug: "sac-pin", imgUrl: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=500&auto=format&fit=crop&q=60" },
			{ name: t("Ốp lưng & Kính"), slug: "op-lung-kinh", imgUrl: "https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?w=500&auto=format&fit=crop&q=60" },
			{ name: t("Bàn phím & Chuột"), slug: "ban-phim-chuot", imgUrl: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&auto=format&fit=crop&q=60" },
		];

		const insertedCategories = await Category.insertMany(categoriesData);
		const catMap = {
			"tai-nghe": insertedCategories.find((c) => c.slug === "tai-nghe")?._id,
			"sac-pin": insertedCategories.find((c) => c.slug === "sac-pin")?._id,
			"op-lung-kinh": insertedCategories.find((c) => c.slug === "op-lung-kinh")?._id,
			"ban-phim-chuot": insertedCategories.find((c) => c.slug === "ban-phim-chuot")?._id,
		};

		console.log("Seeding products...");
		const productsData = [
			// Tai Nghe
			{
				name: t("Tai nghe Bluetooth AirPods Pro 2"),
				price: 5990000,
				priceCompare: 6500000,
				imgUrls: ["https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&auto=format&fit=crop&q=60"],
				description: t("Tai nghe AirPods Pro 2 chống ồn chủ động xuất sắc, âm thanh chuẩn H2 chip, thời lượng pin 30h. Lựa chọn tuyệt vời cho người dùng hệ sinh thái Apple."),
				shortDescription: t("Chống ồn chủ động, Chip H2, Pin 30h"),
				tags: ["apple", "airpods", "tai-nghe-bluetooth"],
				category: catMap["tai-nghe"],
				isHero: true,
				featured: true,
			},
			{
				name: t("Tai nghe Chụp tai Sony WH-1000XM5"),
				price: 7990000,
				priceCompare: 8500000,
				imgUrls: ["https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&auto=format&fit=crop&q=60"],
				description: t("Tai nghe Sony WH-1000XM5 với khả năng chống ồn hàng đầu, âm thanh Hi-Res, thiết kế siêu nhẹ, pin 30h. Phù hợp cho công việc và giải trí."),
				shortDescription: t("Chống ồn đỉnh cao, Hi-Res Audio"),
				tags: ["sony", "headphone", "chong-on"],
				category: catMap["tai-nghe"],
			},
			{
				name: t("Tai nghe Bluetooth Marshall Major IV"),
				price: 3590000,
				priceCompare: 4200000,
				imgUrls: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=60"],
				description: t("Tai nghe Marshall Major IV thiết kế cổ điển, thời lượng pin ấn tượng lên tới 80 giờ, âm bass mạnh mẽ, hỗ trợ sạc không dây."),
				shortDescription: t("Pin 80h, Thiết kế cổ điển"),
				tags: ["marshall", "headphone", "bluetooth"],
				category: catMap["tai-nghe"],
				featured: true,
			},
			{
				name: t("Tai nghe Samsung Galaxy Buds 2 Pro"),
				price: 3990000,
				priceCompare: 4500000,
				imgUrls: ["https://images.unsplash.com/photo-1572569438065-2449cb8a501f?w=800&auto=format&fit=crop&q=60"],
				description: t("Galaxy Buds 2 Pro mang đến trải nghiệm âm thanh 24-bit Hi-Fi ấn tượng, thiết kế nhỏ gọn, chống ồn chủ động thông minh."),
				shortDescription: t("Âm thanh 24-bit Hi-Fi, Chống ồn ANC"),
				tags: ["samsung", "galaxy-buds", "tai-nghe-bluetooth"],
				category: catMap["tai-nghe"],
			},
			{
				name: t("Tai nghe JBL Tune 510BT"),
				price: 1090000,
				priceCompare: 1390000,
				imgUrls: ["https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=60"],
				description: t("Tai nghe chụp tai JBL Tune 510BT với công nghệ JBL Pure Bass Sound, pin 40h, sạc nhanh 5 phút dùng 2 giờ."),
				shortDescription: t("JBL Pure Bass, Pin 40h"),
				tags: ["jbl", "headphone", "gia-re"],
				category: catMap["tai-nghe"],
			},

			// Sạc & Pin
			{
				name: t("Củ sạc nhanh Anker Nano Pro 20W"),
				price: 350000,
				priceCompare: 450000,
				imgUrls: ["https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=60"],
				description: t("Sạc nhanh Anker Nano Pro 20W kích thước siêu nhỏ gọn, hỗ trợ sạc nhanh cho iPhone 15/14 series an toàn và ổn định."),
				shortDescription: t("Siêu nhỏ gọn, Sạc nhanh 20W"),
				tags: ["anker", "sac-nhanh", "iphone"],
				category: catMap["sac-pin"],
				featured: true,
			},
			{
				name: t("Pin sạc dự phòng Baseus Bipow 20000mAh"),
				price: 450000,
				priceCompare: 600000,
				imgUrls: ["https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&auto=format&fit=crop&q=60"],
				description: t("Pin dự phòng Baseus dung lượng 20000mAh, hỗ trợ sạc nhanh 20W, tích hợp màn hình LED hiển thị % pin. Sạc được 3 thiết bị cùng lúc."),
				shortDescription: t("Dung lượng 20000mAh, Sạc nhanh 20W"),
				tags: ["baseus", "pin-du-phong", "20000mah"],
				category: catMap["sac-pin"],
			},
			{
				name: t("Củ sạc Ugreen Nexode 65W GaN"),
				price: 890000,
				priceCompare: 1190000,
				imgUrls: ["https://images.unsplash.com/photo-1615526675159-e248c3021d3f?w=800&auto=format&fit=crop&q=60"],
				description: t("Sạc Ugreen Nexode 65W sử dụng công nghệ GaN, 3 cổng sạc (2 Type-C, 1 USB-A) sạc nhanh được cho cả MacBook và điện thoại."),
				shortDescription: t("Công nghệ GaN, Sạc Laptop/Điện thoại"),
				tags: ["ugreen", "gan", "sac-macbook"],
				category: catMap["sac-pin"],
				isHero: true,
			},
			{
				name: t("Pin dự phòng Samsung 10000mAh Type-C"),
				price: 550000,
				priceCompare: 790000,
				imgUrls: ["https://images.unsplash.com/photo-1622445272461-c6580cab6efa?w=800&auto=format&fit=crop&q=60"],
				description: t("Pin sạc dự phòng chính hãng Samsung dung lượng 10000mAh, vỏ kim loại sang trọng, hỗ trợ sạc nhanh chuẩn PD và SFC."),
				shortDescription: t("Chính hãng Samsung, Sạc siêu nhanh"),
				tags: ["samsung", "pin-du-phong", "chinh-hang"],
				category: catMap["sac-pin"],
			},
			{
				name: t("Sạc không dây Apple MagSafe Charger"),
				price: 1090000,
				priceCompare: 1290000,
				imgUrls: ["https://images.unsplash.com/photo-1611078734062-8e80d4407ab4?w=800&auto=format&fit=crop&q=60"],
				description: t("Sạc không dây MagSafe chính hãng Apple, công suất 15W, hít nam châm chắc chắn cho dòng iPhone 12 trở lên."),
				shortDescription: t("Sạc không dây 15W, Apple chính hãng"),
				tags: ["apple", "magsafe", "sac-khong-day"],
				category: catMap["sac-pin"],
				featured: true,
			},

			// Ốp lưng & Kính
			{
				name: t("Ốp lưng chống sốc Spigen Liquid Air iPhone 15 Pro"),
				price: 450000,
				priceCompare: 550000,
				imgUrls: ["https://images.unsplash.com/photo-1541877888863-71f016dbbf8b?w=800&auto=format&fit=crop&q=60"],
				description: t("Ốp lưng Spigen Liquid Air thiết kế hoạ tiết tam giác chống bám vân tay, công nghệ Air Cushion bảo vệ 4 góc cực tốt."),
				shortDescription: t("Chống sốc chuẩn quân đội, Siêu nhẹ"),
				tags: ["spigen", "op-lung", "iphone-15-pro"],
				category: catMap["op-lung-kinh"],
				featured: true,
			},
			{
				name: t("Kính cường lực Nillkin CP+ Pro iPhone 15 Pro Max"),
				price: 250000,
				priceCompare: 350000,
				imgUrls: ["https://plus.unsplash.com/premium_photo-1681313824743-15bc9e29a999?w=800&auto=format&fit=crop&q=60"],
				description: t("Kính cường lực Nillkin tràn viền 3D, độ cứng 9H, chống trầy xước và va đập hiệu quả, phủ nano chống vân tay trơn láng."),
				shortDescription: t("Cường lực 9H, Chống vân tay"),
				tags: ["nillkin", "kinh-cuong-luc", "iphone-15-pro-max"],
				category: catMap["op-lung-kinh"],
			},
			{
				name: t("Ốp lưng UAG Pathfinder Galaxy S24 Ultra"),
				price: 1100000,
				priceCompare: 1350000,
				imgUrls: ["https://images.unsplash.com/photo-1601593346740-925612772716?w=800&auto=format&fit=crop&q=60"],
				description: t("Ốp lưng UAG Pathfinder Series với cấu trúc tổ ong siêu bền, đạt chuẩn rơi thả của quân đội Mỹ, thiết kế hầm hố nam tính."),
				shortDescription: t("Bảo vệ tối đa, Chuẩn quân đội Mỹ"),
				tags: ["uag", "op-lung-s24", "chong-soc"],
				category: catMap["op-lung-kinh"],
			},
			{
				name: t("Kính cường lực Kingkong chống nhìn trộm"),
				price: 150000,
				priceCompare: 200000,
				imgUrls: ["https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=800&auto=format&fit=crop&q=60"],
				description: t("Kính cường lực Kingkong chống nhìn trộm 30 độ, bảo vệ quyền riêng tư nơi công cộng, vuốt chạm mượt mà."),
				shortDescription: t("Chống nhìn trộm, Vuốt cực mượt"),
				tags: ["kingkong", "kinh-chong-nhin-trom"],
				category: catMap["op-lung-kinh"],
			},
			{
				name: t("Ốp lưng trong suốt Magsafe Apple iPhone 15 Pro"),
				price: 1290000,
				priceCompare: 1450000,
				imgUrls: ["https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=800&auto=format&fit=crop&q=60"],
				description: t("Ốp lưng trong suốt (Clear Case) chính hãng Apple, hỗ trợ Magsafe lực hút mạnh, phủ lớp chống ố vàng cao cấp."),
				shortDescription: t("Chống ố vàng, Hỗ trợ Magsafe"),
				tags: ["apple", "op-lung-trong-suot", "magsafe"],
				category: catMap["op-lung-kinh"],
			},

			// Bàn phím & Chuột
			{
				name: t("Chuột không dây Logitech MX Master 3S"),
				price: 2490000,
				priceCompare: 2890000,
				imgUrls: ["https://images.unsplash.com/photo-1615663245857-ac1eeb5304af?w=800&auto=format&fit=crop&q=60"],
				description: t("Chuột Logitech MX Master 3S với cảm biến 8000 DPI, nút click tĩnh âm siêu êm, cuộn từ tính MagSpeed siêu nhanh. Chuột công thái học tốt nhất cho lập trình và thiết kế."),
				shortDescription: t("Click tĩnh âm, DPI 8000"),
				tags: ["logitech", "chuot-khong-day", "cong-thai-hoc"],
				category: catMap["ban-phim-chuot"],
				isHero: true,
				featured: true,
			},
			{
				name: t("Bàn phím cơ Keychron K8 Pro Bluetooth"),
				price: 2690000,
				priceCompare: 3000000,
				imgUrls: ["https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&auto=format&fit=crop&q=60"],
				description: t("Bàn phím cơ Keychron K8 Pro hỗ trợ QMK/VIA, lót foam tiêu âm, keycap PBT double-shot, switch Gateron Pro gõ êm mượt."),
				shortDescription: t("Tùy biến QMK/VIA, Layout TKL"),
				tags: ["keychron", "ban-phim-co", "bluetooth"],
				category: catMap["ban-phim-chuot"],
			},
			{
				name: t("Chuột chơi game không dây Razer DeathAdder V2 X HyperSpeed"),
				price: 1290000,
				priceCompare: 1590000,
				imgUrls: ["https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=800&auto=format&fit=crop&q=60"],
				description: t("Razer DeathAdder V2 X với công nghệ không dây HyperSpeed siêu tốc, cảm biến 14K DPI, hỗ trợ dùng cả pin AA lẫn AAA cực kì tiện dụng."),
				shortDescription: t("HyperSpeed, Form cầm thoải mái"),
				tags: ["razer", "chuot-gaming", "esports"],
				category: catMap["ban-phim-chuot"],
			},
			{
				name: t("Bàn phím không dây Logitech MX Keys Advanced"),
				price: 2790000,
				priceCompare: 3200000,
				imgUrls: ["https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=60"],
				description: t("Bàn phím Logitech MX Keys với thiết kế mỏng sang trọng, phím gõ êm ái với rãnh tròn, cảm biến đèn nền thông minh tự sáng khi chạm tay."),
				shortDescription: t("Gõ êm ái, Đèn nền thông minh"),
				tags: ["logitech", "ban-phim", "van-phong"],
				category: catMap["ban-phim-chuot"],
			},
			{
				name: t("Bàn phím cơ Akko 3098B Multi-modes"),
				price: 1890000,
				priceCompare: 2200000,
				imgUrls: ["https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=800&auto=format&fit=crop&q=60"],
				description: t("Bàn phím Akko 3098B với thiết kế màu sắc trẻ trung bắt mắt, kết nối 3 chế độ (Type-C, 2.4Ghz, Bluetooth), switch Akko CS bấm nảy nhẹ."),
				shortDescription: t("3 chế độ kết nối, Phím phối màu đẹp"),
				tags: ["akko", "ban-phim-co", "gaming"],
				category: catMap["ban-phim-chuot"],
				featured: true,
			},
		];

		const insertedProducts = await Product.insertMany(
			productsData.map((p) => ({
				...p,
				user: adminUser._id,
				avgRatings: Math.floor(Math.random() * 2) + 4, // 4 or 5
				numReviews: Math.floor(Math.random() * 50) + 10,
				ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 5, 5: 10 },
				stock: Math.floor(Math.random() * 100) + 10,
			})),
		);

		console.log(`✅ Successfully seeded 4 categories and ${insertedProducts.length} products!`);
		process.exit(0);
	} catch (error) {
		console.error("❌ Seeding failed:");
		console.error(error);
		process.exit(1);
	}
}

seed();
