import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // URL của MongoDB Atlas hoặc MongoDB Server của bạn
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export async function connectToDatabase() {
  await client.connect();
  const db = client.db(process.env.MONGODB_DB); // Tên cơ sở dữ liệu
  return { db, client };
}
