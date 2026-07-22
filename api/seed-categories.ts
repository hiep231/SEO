import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error("❌ MONGODB_URI not defined"); process.exit(1); }

const CategorySchema = new mongoose.Schema({
    name: { en: String, fr: String, ar: String },
    slug: { type: String, unique: true },
    parent: { type: mongoose.Schema.Types.ObjectId, default: null },
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
    imgUrl: { type: String },
}, { timestamps: true });

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

// ─── Danh sách categories cần tạo ───────────────────────────────
const CATEGORIES = [
    // ── Cấp 1 (Parent) ──────────────────────────────────────────
    {
        slug: 'tai-nghe',
        name: { en: 'Headphones', fr: 'Écouteurs', ar: 'Headphones' },
        sortOrder: 1,
        parent: null,
        imgUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=512&auto=format&fit=crop',
    },
    {
        slug: 'sac-pin',
        name: { en: 'Chargers & Power Banks', fr: 'Chargeurs & Batteries', ar: 'Chargers & Power Banks' },
        sortOrder: 2,
        parent: null,
        imgUrl: 'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?q=80&w=512&auto=format&fit=crop',
    },
    {
        slug: 'op-lung-kinh',
        name: { en: 'Cases & Screen Protectors', fr: 'Coques & Protecteurs', ar: 'Cases & Screen Protectors' },
        sortOrder: 3,
        parent: null,
        imgUrl: 'https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?q=80&w=512&auto=format&fit=crop',
    },
    {
        slug: 'ban-phim-chuot',
        name: { en: 'Keyboards & Mice', fr: 'Claviers & Souris', ar: 'Keyboards & Mice' },
        sortOrder: 4,
        parent: null,
        imgUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=512&auto=format&fit=crop',
    },
];

// ─── Sub-categories ──────────────────────────────────────────────
// Sẽ được tạo SAU khi biết _id của parent
const SUB_CATEGORIES: Record<string, Array<{ slug: string; name: { en: string; fr: string; ar: string }; sortOrder: number; imgUrl?: string }>> = {
    'tai-nghe': [
        {
            slug: 'tai-nghe-bluetooth',
            name: { en: 'Bluetooth Headphones', fr: 'Écouteurs Bluetooth', ar: 'Bluetooth Headphones' },
            sortOrder: 1,
            imgUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=512&auto=format&fit=crop',
        },
        {
            slug: 'tai-nghe-co-day',
            name: { en: 'Wired Headphones', fr: 'Écouteurs Filaires', ar: 'Wired Headphones' },
            sortOrder: 2,
        },
        {
            slug: 'tai-nghe-gaming',
            name: { en: 'Gaming Headsets', fr: 'Casques Gaming', ar: 'Gaming Headsets' },
            sortOrder: 3,
        },
    ],
    'sac-pin': [
        {
            slug: 'cu-sac-nhanh',
            name: { en: 'Fast Chargers', fr: 'Chargeurs Rapides', ar: 'Fast Chargers' },
            sortOrder: 1,
            imgUrl: 'https://images.unsplash.com/photo-1572435555646-7ad9a149ad91?q=80&w=512&auto=format&fit=crop',
        },
        {
            slug: 'pin-du-phong',
            name: { en: 'Power Banks', fr: 'Batteries Portables', ar: 'Power Banks' },
            sortOrder: 2,
        },
        {
            slug: 'cap-sac',
            name: { en: 'Charging Cables', fr: 'Câbles de Charge', ar: 'Charging Cables' },
            sortOrder: 3,
        },
    ],
    'op-lung-kinh': [
        {
            slug: 'op-lung-iphone',
            name: { en: 'iPhone Cases', fr: 'Coques iPhone', ar: 'iPhone Cases' },
            sortOrder: 1,
            imgUrl: 'https://images.unsplash.com/photo-1587037542655-84c2ba5b0e12?q=80&w=512&auto=format&fit=crop',
        },
        {
            slug: 'op-lung-android',
            name: { en: 'Android Cases', fr: 'Coques Android', ar: 'Android Cases' },
            sortOrder: 2,
        },
        {
            slug: 'kinh-cuong-luc',
            name: { en: 'Tempered Glass', fr: 'Verre Trempé', ar: 'Tempered Glass' },
            sortOrder: 3,
        },
    ],
    'ban-phim-chuot': [
        {
            slug: 'ban-phim-co-khong-day',
            name: { en: 'Wireless Mechanical Keyboards', fr: 'Claviers Mécaniques Sans Fil', ar: 'Wireless Mechanical Keyboards' },
            sortOrder: 1,
            imgUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=512&auto=format&fit=crop',
        },
        {
            slug: 'ban-phim-co-co-day',
            name: { en: 'Wired Mechanical Keyboards', fr: 'Claviers Mécaniques Filaires', ar: 'Wired Mechanical Keyboards' },
            sortOrder: 2,
        },
        {
            slug: 'chuot-gaming',
            name: { en: 'Gaming Mice', fr: 'Souris Gaming', ar: 'Gaming Mice' },
            sortOrder: 3,
        },
    ],
};

async function run() {
    await mongoose.connect(MONGODB_URI as string);
    console.log("✅ Connected to MongoDB\n");

    const createdParents: Record<string, any> = {};

    // ── 1. Create / update parent categories ──
    console.log("📁 Creating parent categories...");
    for (const cat of CATEGORIES) {
        const result = await Category.findOneAndUpdate(
            { slug: cat.slug },
            { $set: { ...cat, parent: null } },
            { upsert: true, new: true }
        );
        createdParents[cat.slug] = result;
        console.log(`   ✅ [${cat.slug}] → ${cat.name.en}`);
    }

    // ── 2. Create / update sub-categories ──
    console.log("\n📂 Creating sub-categories...");
    for (const [parentSlug, children] of Object.entries(SUB_CATEGORIES)) {
        const parent = createdParents[parentSlug];
        if (!parent) { console.log(`   ⚠️  Parent [${parentSlug}] not found!`); continue; }

        for (const child of children) {
            await Category.findOneAndUpdate(
                { slug: child.slug },
                { $set: { ...child, parent: parent._id } },
                { upsert: true, new: true }
            );
            console.log(`   ✅ [${child.slug}] → ${child.name.en}  (parent: ${parentSlug})`);
        }
    }

    // ── 3. Print summary ──
    const total = await Category.countDocuments();
    console.log(`\n${'═'.repeat(55)}`);
    console.log(`✅ DONE! Total categories in DB: ${total}`);
    console.log(`${'═'.repeat(55)}\n`);

    await mongoose.disconnect();
    process.exit(0);
}

run().catch(e => { console.error(e); process.exit(1); });
