export const dynamic = "force-static";
import { connectToDatabase } from "../../lib/mongodb";
import fs from 'fs';
import path from 'path';
//@ts-ignore
// import formidable from 'formidable';
import { IncomingForm } from 'formidable';

export async function GET() {
  console.log("in GET")

  const { db } = await connectToDatabase();
  const collection = db.collection("test"); // Tên collection trong MongoDB

  try {
    const data = await collection.find({}).toArray();
    console.log(data)
    return Response.json({ data });
  } catch (error) {
  }
}

// export async function POST(request: any) {
//   console.log("in POST")

//   const { db } = await connectToDatabase();
//   console.log(db)
//   const collection = db.collection("test"); // Tên collection trong MongoDB
//   console.log(collection)

//   try {
//     const data = await collection.find({}).toArray();
//     console.log(data)
//     return Response.json({ data });
//   } catch (error) {
//   }
// }

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  return new Promise((resolve, reject) => {
    // const form = new formidable.IncomingForm();
    const form = new IncomingForm();
    console.log("fomr", form)
    form.uploadDir = path.join(process.cwd(), 'public/uploads'); // Đường dẫn tới thư mục lưu trữ file
    console.log("fomr", form)
    form.keepExtensions = true;
    console.log("fomr", form)

    form.parse(req, (err:any, fields:any, files:any) => {
      if (err) {
        console.log("err", err)
        return reject(new Response(JSON.stringify({ error: 'Error parsing the file.' }), { status: 500 }));
      }

      const file = files.file[0];
      console.log("file", file)
      const oldPath = file.filepath;
      console.log("oldPath", oldPath)
      const newPath = path.join(form.uploadDir, file.originalFilename);
      console.log("newPath", newPath)

      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          console.log("err", err)
          return reject(new Response(JSON.stringify({ error: 'Error saving the file.' }), { status: 500 }));
        }
        resolve(new Response(JSON.stringify({ message: 'File uploaded successfully.', fileUrl: `/uploads/${file.originalFilename}` }), { status: 200 }));
      });
    });
  });
}

export async function PUT() {
  console.log("in POST")

  const { db } = await connectToDatabase();
  console.log(db)
  const collection = db.collection("test"); // Tên collection trong MongoDB
  console.log(collection)

  try {
    const data = await collection.find({}).toArray();
    console.log(data)
    return Response.json({ data });
  } catch (error) {
  }
}
