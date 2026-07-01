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
	title: `${name} - Phụ Kiện Công Nghệ Máy Tính Chính Hãng`,
	description: `Mua sắm phụ kiện công nghệ, điện thoại, máy tính chính hãng tại ${name}. Chuyên cung cấp tai nghe, sạc dự phòng, ốp lưng, bàn phím cơ chất lượng cao.`,
	keywords: [
		"phụ kiện công nghệ",
		"tai nghe bluetooth",
		"sạc dự phòng",
		"ốp lưng kính cường lực",
		"bàn phím cơ",
		"chuột không dây"
	],
	email,
	phone: "",
	social: {
		twitter: "https://twitter.com/phukiencongnghe",
		instagram: "https://instagram.com/phukiencongnghe",
		youtube: "https://youtube.com/@phukiencongnghe",
	},
	twitterHandle: "@phukiencongnghe",
	themeColor: "#009679",
	backgroundColor: "#fff",
	logo: `${clientUrl}/icon.svg`,
	openGraphImage: `${clientUrl}/og-image.png`,
};

export default config;
