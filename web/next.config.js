const withPWA = require("next-pwa")({
	dest: "public",
	register: true,
	skipWaiting: true,
	scope: "/app",
	sw: "sw.js",
	disable: process.env.NODE_ENV === "development",
});

module.exports = withPWA({
	turbopack: {},
	cacheComponents: true,
	reactStrictMode: true,
	images: {
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
		],
		formats: ["image/avif", "image/webp"],
	},
});
