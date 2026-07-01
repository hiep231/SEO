import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';

// 1. Add Stealth Plugin to bypass basic protections (like Cloudflare)
puppeteer.use(StealthPlugin());

// Load Environment Variables
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("❌ MONGODB_URI is not defined in .env");
    process.exit(1);
}

// 2. Mongoose Schemas (Matching NestJS Product Schema)
const TranslatedTextSchema = new mongoose.Schema({
    en: { type: String, required: true },
    fr: { type: String, required: true },
    ar: { type: String, required: true },
}, { _id: false });

const CategorySchema = new mongoose.Schema({
    name: { type: TranslatedTextSchema, required: true },
    slug: { type: String, required: true, unique: true },
    parent: { type: mongoose.Schema.Types.ObjectId, default: null },
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
    imgUrl: { type: String },
}, { timestamps: true });

const ProductSchema = new mongoose.Schema({
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
}, { timestamps: true });

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    role: String,
});

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
const User = mongoose.models.User || mongoose.model('User', UserSchema);

// Helper for translation format
const t = (text: string) => ({ en: text, fr: text, ar: text });

// Custom Sleep Utility
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 3. Scraping Configuration
const TARGETS = [
    { url: 'https://gearvn.com/collections/ban-phim-co', slug: 'ban-phim-chuot', nameEn: 'Keyboards & Mice', nameVi: 'Bàn phím & Chuột' },
    { url: 'https://gearvn.com/collections/tai-nghe-bluetooth', slug: 'tai-nghe', nameEn: 'Headphones', nameVi: 'Tai nghe Bluetooth' },
    { url: 'https://gearvn.com/collections/phu-kien-apple', slug: 'sac-pin', nameEn: 'Chargers & Power Banks', nameVi: 'Sạc nhanh & Pin dự phòng' },
    { url: 'https://gearvn.com/collections/balo-tui-chong-soc', slug: 'op-lung-kinh', nameEn: 'Cases & Screen Protectors', nameVi: 'Ốp lưng & Kính cường lực' }
];

async function scrapeAndSeed() {
    let browser;
    try {
        console.log("🌐 Connecting to MongoDB...");
        await mongoose.connect(MONGODB_URI as string);
        console.log("✅ Connected to MongoDB");

        console.log("🗑️ Wiping existing products for a clean slate...");
        await Product.deleteMany({});
        console.log("✅ All existing products deleted.");

        const admin = await User.findOne({ role: 'admin' });
        if (!admin) {
            throw new Error(`Admin user not found in DB. Run seed.ts first!`);
        }

        console.log(`🚀 Launching Puppeteer Stealth Browser...`);
        browser = await puppeteer.launch({
            headless: false,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();
        
        // Block tracking/ads to speed up loading
        await page.setRequestInterception(true);
        page.on('request', (req) => {
            if (['image', 'stylesheet', 'font'].includes(req.resourceType())) {
                req.continue(); // allow images for extraction
            } else if (['media', 'other'].includes(req.resourceType())) {
                req.abort();
            } else {
                req.continue();
            }
        });

        for (const target of TARGETS) {
            console.log(`\n=========================================`);
            console.log(`🎯 TARGET CATEGORY: ${target.nameVi}`);
            
            console.log(`🔍 Checking category: ${target.slug}`);
            let category = await Category.findOne({ slug: target.slug });

            if (!category) {
                console.log(`✨ Category '${target.slug}' not found. Creating it automatically...`);
                category = await Category.create({
                    name: t(target.nameVi),
                    slug: target.slug,
                    isActive: true,
                    sortOrder: 0
                });
                console.log(`✅ Category '${target.slug}' created successfully.`);
            }

            console.log(`🔗 Navigating to: ${target.url}`);
            try {
                await page.goto(target.url, { waitUntil: 'networkidle2', timeout: 60000 });
            } catch(e) {
                console.log(`⚠️ Failed to load ${target.url}. Skipping...`);
                continue;
            }

            console.log("⏳ Waiting for product grid to render...");
            // Use a generic delay instead of a strict selector wait to avoid timeouts
            await sleep(5000); 

            console.log("🔍 Extracting product data...");
            const scrapedProducts = await page.evaluate(() => {
                // Exact GearVN selectors based on DOM inspection
                const items = Array.from(document.querySelectorAll('div.proloop'));
                const results: any[] = [];

                items.slice(0, 30).forEach((el: any) => {
                    // Name is in h3.proloop-name > a
                    const nameEl = el.querySelector('h3.proloop-name a');
                    const name = nameEl ? nameEl.innerText.trim() : null;

                    // Price is in .proloop-price--highlight
                    const priceEl = el.querySelector('.proloop-price--highlight');
                    const priceText = priceEl ? priceEl.innerText.trim() : null;

                    // Image: prefer data-src (lazy loaded), then fall back to src
                    const imgEl = el.querySelector('img.img-default');
                    let imgUrl = imgEl ? (imgEl.getAttribute('data-src') || imgEl.getAttribute('src')) : null;
                    
                    if (imgUrl && imgUrl.startsWith('//')) {
                        imgUrl = 'https:' + imgUrl;
                    }

                    if (name && priceText && imgUrl) {
                        const cleanStr = priceText.replace(/[^0-9]/g, ''); // Removes dots, commas, spaces, currency symbols
                        const rawPrice = parseInt(cleanStr, 10);
                        // Ensure rawPrice is a valid, logical number (e.g., > 1000) to avoid accidentally parsing a "2%" discount badge.
                        if (!isNaN(rawPrice) && rawPrice > 1000) {
                            results.push({
                                name,
                                price: rawPrice * 100,
                                priceCompare: Math.round(rawPrice * 1.2) * 100,
                                imgUrl,
                            });
                        }
                    }
                });

                return results;
            });

            console.log(`✅ Extracted ${scrapedProducts.length} products!`);

            if (scrapedProducts.length === 0) {
                console.log("⚠️ No products found. The CSS selectors might need updating for this specific site.");
            } else {
                console.log(`💾 Saving ${scrapedProducts.length} products into MongoDB...`);
                
                let count = 1;
                for (const p of scrapedProducts) {
                    const dbProduct = {
                        name: t(p.name),
                        price: p.price,
                        priceCompare: p.priceCompare,
                        imgUrls: [p.imgUrl],
                        description: t(`Sản phẩm chính hãng: ${p.name}. Mang lại trải nghiệm tuyệt vời, độ bền cao.`),
                        shortDescription: t("Hàng chính hãng, bảo hành 12 tháng."),
                        tags: ["scraped", "chinh-hang", "gearvn"],
                        category: category._id,
                        user: admin._id,
                        stock: Math.floor(Math.random() * 50) + 10,
                        avgRatings: 5,
                        numReviews: Math.floor(Math.random() * 100),
                        ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 100 },
                        isHero: false,
                        featured: true
                    };

                    await Product.updateOne(
                        { "name.en": dbProduct.name.en },
                        { $set: dbProduct },
                        { upsert: true }
                    );

                    console.log(`Saved product ${count}/${scrapedProducts.length}... sleeping 1s`);
                    await sleep(1000);
                    count++;
                }

                console.log(`🎉 Success! Saved ${scrapedProducts.length} products to category '${target.slug}'.`);
            }
            
            console.log("Sleeping for 5s before next category...");
            await sleep(5000);
        } // End of TARGETS loop

    } catch (error) {
        console.error("❌ Scraping failed:");
        console.error(error);
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
