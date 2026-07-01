import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const CategorySchema = new mongoose.Schema({
    name: Object,
    slug: String,
    imgUrl: String,
}, { timestamps: true });

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

async function run() {
    await mongoose.connect(MONGODB_URI as string);
    console.log("✅ Connected to MongoDB");

    const updates = [
        { slug: 'ban-phim-chuot', imgUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=512&auto=format&fit=crop' },
        { slug: 'tai-nghe', imgUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=512&auto=format&fit=crop' },
        { slug: 'sac-pin', imgUrl: 'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?q=80&w=512&auto=format&fit=crop' },
        { slug: 'op-lung-kinh', imgUrl: 'https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?q=80&w=512&auto=format&fit=crop' }
    ];

    for (const u of updates) {
        await Category.updateOne({ slug: u.slug }, { $set: { imgUrl: u.imgUrl } });
        console.log(`Updated ${u.slug} with image`);
    }

    await mongoose.disconnect();
    console.log("✅ Disconnected");
}

run();
