const clientUrl = process.env.NEXT_PUBLIC_CLIENT_URL!;
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL!;
const name = process.env.NEXT_PUBLIC_NAME!;
const email = process.env.NEXT_PUBLIC_CONTACT!;

const config = {
	/** Client url of your website e.g https://twitter.com */
	clientUrl,
	serverUrl,
	/** Name of your website e.g Twitter */
	websiteName: name,
	// SEO: keyword-first title, 50–65 chars
	title: `Mini Setup - Thế Giới Phụ Kiện Công Nghệ Chính Hãng`,
	// SEO: 140–165 chars, keyword at the start, describes user intent
	description: `Mini Setup chuyên cung cấp phụ kiện công nghệ chính hãng: tai nghe Bluetooth, sạc dự phòng GaN, bàn phím cơ, chuột không dây, ốp lưng. Giao hàng toàn quốc.`,
	keywords: [
		"phụ kiện công nghệ",
		"tai nghe bluetooth",
		"sạc dự phòng GaN",
		"ốp lưng kính cường lực",
		"bàn phím cơ",
		"chuột không dây",
		"phụ kiện máy tính",
		"phụ kiện điện thoại chính hãng",
	],
	email,
	phone: process.env.NEXT_PUBLIC_PHONE || "",
	address: {
		streetAddress: process.env.NEXT_PUBLIC_ADDRESS || "",
		addressLocality: process.env.NEXT_PUBLIC_CITY || "Hồ Chí Minh",
		addressRegion: process.env.NEXT_PUBLIC_REGION || "TP. HCM",
		postalCode: process.env.NEXT_PUBLIC_POSTAL_CODE || "700000",
		addressCountry: "VN",
	},
	social: {
		facebook:
			process.env.NEXT_PUBLIC_FACEBOOK ||
			"https://facebook.com/phukiencongnghe",
		twitter: "https://twitter.com/phukiencongnghe",
		instagram: "https://instagram.com/phukiencongnghe",
		youtube: "https://www.youtube.com/@smiley6758",
		tiktok:
			process.env.NEXT_PUBLIC_TIKTOK || "https://tiktok.com/@phukiencongnghe",
	},
	twitterHandle: "@phukiencongnghe",
	themeColor: "#009679",
	backgroundColor: "#fff",
	logo: `${clientUrl}/icon.svg`,
	openGraphImage: `${clientUrl}/og-image.png`,
	googleMapsUrl:
		process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL || "https://share.google/4xq9zLdd7Ea2evuLK",
	gscVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION || "",
};

export default config;
