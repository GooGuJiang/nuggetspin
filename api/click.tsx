// api/click.ts
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

export default async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).end(); // 只接受POST请求
    return;
  }

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();

  const db = client.db();
  const collection = db.collection("nuggetspin_click");
  
  const doc = await collection.findOne({ name: "count" });
  
  if (doc) {
    await collection.updateOne({ name: "count" }, { $inc: { value: 1 } });
    res.status(200).json({ success: true });
  } else {
    await collection.insertOne({ name: "count", value: 1 });
    res.status(200).json({ success: true });
  }

  await client.close();
};
