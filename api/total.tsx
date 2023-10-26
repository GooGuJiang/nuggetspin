const MongoClient = require("mongodb").MongoClient;

const uri = process.env.MONGODB_URI;

const handleRequest = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).end(); // 只接受GET请求
    return;
  }

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();

  const db = client.db();
  const collection = db.collection("nuggetspin_click");
  
  const doc = await collection.findOne({ name: "count" });

  res.status(200).json({ total_clicks: doc ? doc.value : 0 });

  await client.close();
};

module.exports = handleRequest;
