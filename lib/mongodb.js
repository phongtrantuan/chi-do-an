import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017/'; // URL của MongoDB Atlas hoặc MongoDB Server của bạn
// const uri = process.env.MONGODB_URI; // URL của MongoDB Atlas hoặc MongoDB Server của bạn
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

console.log('client',client)
// await client.connect();
console.log('client',client)


export async function connectToDatabase() {
//   if (!client) {
    await client.connect();
//   }
  const db = client.db('local'); // Tên cơ sở dữ liệu
//   const db = client.db(process.env.MONGODB_DB); // Tên cơ sở dữ liệu
  return { db, client };
}



// // lib/mongodb.js
// import { MongoClient } from "mongodb";

// const uri = process.env.MONGODB_URI;
// const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

// let client;
// let clientPromise;

// if (!process.env.MONGODB_URI) {
//   throw new Error("Please add your Mongo URI to .env.local");
// }

// if (process.env.NODE_ENV === "development") {
//   // In development mode, use a global variable so that the MongoClient
//   // is not recreated on every request.
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, options);
//     global._mongoClientPromise = client.connect();
//   }
//   clientPromise = global._mongoClientPromise;
// } else {
//   // In production mode, it's best to not use a global variable.
//   client = new MongoClient(uri, options);
//   clientPromise = client.connect();
// }

// export default clientPromise;
