// module.exports = {
// 	turbopack: {},
// 	reactStrictMode: true,
// 	images: {
// 		remotePatterns: [
// 			{
// 				protocol: "https",
// 				hostname: "res.cloudinary.com",
// 			},
// 			{
// 				protocol: "https",
// 				hostname: "i.etsystatic.com",
// 			},
// 			{
// 				protocol: "https",
// 				hostname: "cdn.hstatic.net",
// 			},
// 			{
// 				protocol: "https",
// 				hostname: "theme.hstatic.net",
// 			},
// 			{
// 				protocol: "https",
// 				hostname: "product.hstatic.net",
// 			},
// 			{
// 				protocol: "https",
// 				hostname: "images.unsplash.com",
// 			},
// 			{
// 				protocol: "https",
// 				hostname: "images.dmca.com",
// 			},
// 		],
// 		formats: ["image/avif", "image/webp"],
// 	},
// };

module.exports = {
	output: "export",
	trailingSlash: true,
	turbopack: {},
	reactStrictMode: true,
	images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
			},
			{
				protocol: "https",
				hostname: "i.etsystatic.com",
			},
			{
				protocol: "https",
				hostname: "cdn.hstatic.net",
			},
			{
				protocol: "https",
				hostname: "product.hstatic.net",
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
			{
				protocol: "https",
				hostname: "images.dmca.com",
			},
		],
		formats: ["image/avif", "image/webp"],
	},
};
