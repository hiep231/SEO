import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error("❌ MONGODB_URI is not defined in .env"); process.exit(1); }

const TranslatedTextSchema = new mongoose.Schema({ en: String, fr: String, ar: String }, { _id: false });
const CategorySchema = new mongoose.Schema({ name: TranslatedTextSchema, slug: { type: String, unique: true }, parent: mongoose.Schema.Types.ObjectId, isActive: Boolean }, { timestamps: true });
const ProductSchema = new mongoose.Schema({ 
    name: TranslatedTextSchema, 
    price: Number,
    priceCompare: Number,
    imgUrls: [String],
    description: TranslatedTextSchema,
    shortDescription: TranslatedTextSchema,
    tags: [String],
    category: mongoose.Schema.Types.ObjectId,
    stock: { type: Number, default: 100 },
    avgRatings: { type: Number, default: 4.8 },
    numReviews: { type: Number, default: 150 },
    ratingDistribution: { 1: Number, 2: Number, 3: Number, 4: Number, 5: Number },
    isHero: Boolean,
    featured: Boolean,
    user: mongoose.Schema.Types.ObjectId
}, { timestamps: true });

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema({ email: String }));

const t = (vi: string, en: string) => ({ en, fr: en, ar: en });

const BRANDS = ["Spigen", "UAG", "Nillkin", "Apple", "ESR", "ZAGG", "Zeelot", "Mipow"];
const TYPES = ["Ốp lưng", "Kính cường lực", "Bao da", "Ốp chống sốc", "Ốp Silicone", "Kính chống nhìn trộm"];
const DEVICES = ["iPhone 15 Pro Max", "iPhone 14 Pro Max", "iPhone 13", "Samsung Galaxy S24 Ultra", "Samsung Z Fold 5", "iPad Pro 11 inch", "AirPods Pro 2"];

const CASES_DATA = Array.from({ length: 24 }).map((_, i) => {
    const brand = BRANDS[i % BRANDS.length];
    const type = TYPES[i % TYPES.length];
    const device = DEVICES[i % DEVICES.length];
    
    // Đảm bảo kính dùng ảnh kính, ốp lưng dùng ảnh ốp
    const isKinh = type.includes("Kính");
    const imgUrl = isKinh ? "/cases/kinh-cuong-luc.png" : "/cases/op-lung.png";
    
    const price = isKinh ? Math.floor(Math.random() * 200 + 150) * 1000 : Math.floor(Math.random() * 800 + 400) * 1000;
    const priceCompare = Math.floor(price * (1 + Math.random() * 0.3) / 1000) * 1000;

    return {
        name: `${type} ${device} ${brand} chính hãng`,
        price,
        priceCompare,
        imgUrls: [imgUrl],
        desc: `${type} chính hãng ${brand} thiết kế riêng cho ${device}. Chất liệu cao cấp, bảo vệ toàn diện thiết bị khỏi va đập, trầy xước. Sản phẩm được bảo hành 12 tháng lỗi 1 đổi 1.`,
        short: `${type} cao cấp cho ${device}, bảo vệ tối đa, bảo hành 12 tháng.`,
        tags: ["op-lung-kinh", brand.toLowerCase(), device.toLowerCase().replace(/ /g, '-')]
    };
});

async function main() {
    console.log('🌐 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI!);
    console.log('✅ Connected!');

    const opLung = await Category.findOne({ slug: 'op-lung-kinh' });
    const adminUser = await User.findOne({ role: 'admin' }) || await User.findOne();

    if (!opLung) {
        console.error('❌ Could not find category op-lung-kinh');
        process.exit(1);
    }

    // 1. Xóa toàn bộ sản phẩm hiện tại của op-lung-kinh (đồ bàn phím)
    const delResult = await Product.deleteMany({ category: opLung._id });
    console.log(`🗑️ Deleted ${delResult.deletedCount} old messy products from op-lung-kinh`);

    // 2. Thêm 8 sản phẩm thật, chuẩn
    let saved = 0;
    for (const item of CASES_DATA) {
        const numReviews = Math.floor(Math.random() * 200) + 10;
        const doc = {
            name: t(item.name, item.name),
            price: item.price,
            priceCompare: item.priceCompare,
            imgUrls: item.imgUrls,
            description: t(item.desc, item.desc),
            shortDescription: t(item.short, item.short),
            tags: item.tags,
            category: opLung._id,
            user: adminUser?._id,
            stock: 100,
            avgRatings: 4.8,
            numReviews,
            ratingDistribution: {
                1: 0, 2: 0, 3: Math.floor(numReviews * 0.1), 4: Math.floor(numReviews * 0.3), 5: Math.floor(numReviews * 0.6)
            },
            isHero: false,
            featured: true
        };

        await Product.updateOne(
            { "name.en": item.name },
            { $set: doc },
            { upsert: true }
        );
        saved++;
    }

    console.log(`✅ Saved ${saved} CORRECT cases & screen protectors to op-lung-kinh!`);

    await mongoose.disconnect();
    console.log('🔌 Done!');
    process.exit(0);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
