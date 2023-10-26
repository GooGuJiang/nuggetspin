import { MongoClient } from "mongodb";

let cachedDb = null;

async function connectToDatabase(uri) {
  if (cachedDb) {
    return cachedDb;
  }
  const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = client.db(new URL(uri).pathname.substr(1));
  cachedDb = db;
  return db;
}

export default async (req, res) => {
  const db = await connectToDatabase(process.env.MONGODB_URI);

  const collection = db.collection("nuggetspin_click");

  if (req.method === 'POST') {
    await collection.updateOne(
      { id: "count" },
      { $inc: { count: 1 } },
      { upsert: true }
    );

    const updatedDoc = await collection.findOne({ id: "count" });
    res.status(200).json({ total_clicks: updatedDoc.count });
  } else if (req.method === 'GET') {
    const doc = await collection.findOne({ id: "count" });
    res.status(200).json({ total_clicks: doc ? doc.count : 0 });
  } else {
    res.status(405).end(); // 不允许的方法
  }
};
