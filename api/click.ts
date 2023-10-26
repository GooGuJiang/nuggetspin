import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
let cachedDb: any;

async function connectToDatabase(uri: string) {
  if (cachedDb) return cachedDb;

  const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  const db = client.db("your-database-name"); // 替换为你的数据库名称
  cachedDb = db;
  return db;
}

export default async (req, res) => {
  const db = await connectToDatabase(uri);
  const collection = db.collection("clicks"); // 这里使用一个集合来存储点击数

  if (req.method === 'POST') {
    await collection.updateOne({ _id: "clickCount" }, { $inc: { count: 1 } }, { upsert: true });
    const clickData = await collection.findOne({ _id: "clickCount" });
    res.status(200).json({ total_clicks: clickData.count });
  } else if (req.method === 'GET') {
    const clickData = await collection.findOne({ _id: "clickCount" });
    res.status(200).json({ total_clicks: clickData ? clickData.count : 0 });
  } else {
    res.status(405).end();
  }
};
