export const dynamic = "force-static";
import { connectToDatabase } from "../../lib/mongodb";
import fs from "fs";
import path from "path";
//@ts-ignore
// import formidable from 'formidable';
// import { IncomingForm } from 'formidable';

import { writeFile } from "fs/promises";
// import formidable from 'formidable';
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  console.log("in GET");

  const { db } = await connectToDatabase();
  const collection = db.collection("test"); // Tên collection trong MongoDB

  try {
    const data = await collection.find({}).toArray();
    console.log(data);
    return Response.json({ data });
  } catch (error) {}
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

// export async function POST(req: Request) {
//   return new Promise((resolve, reject) => {
//     // const form = new formidable.IncomingForm();
//     const form = new IncomingForm();
//     console.log("fomr", form)
//     form.uploadDir = path.join(process.cwd(), 'public/uploads'); // Đường dẫn tới thư mục lưu trữ file
//     console.log("fomr", form)
//     form.keepExtensions = true;
//     console.log("fomr", form)

//     form.parse(req, (err:any, fields:any, files:any) => {
//       if (err) {
//         console.log("err", err)
//         return reject(new Response(JSON.stringify({ error: 'Error parsing the file.' }), { status: 500 }));
//       }

//       const file = files.file[0];
//       console.log("file", file)
//       const oldPath = file.filepath;
//       console.log("oldPath", oldPath)
//       const newPath = path.join(form.uploadDir, file.originalFilename);
//       console.log("newPath", newPath)

//       fs.rename(oldPath, newPath, (err) => {
//         if (err) {
//           console.log("err", err)
//           return reject(new Response(JSON.stringify({ error: 'Error saving the file.' }), { status: 500 }));
//         }
//         resolve(new Response(JSON.stringify({ message: 'File uploaded successfully.', fileUrl: `/uploads/${file.originalFilename}` }), { status: 200 }));
//       });
//     });
//   });
// }

export const POST = async (req: any, res: any) => {
  const formData = await req.formData();
  console.log("POST", formData);

  const file = formData.get("file");
  console.log("file", file);
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = Date.now() + file.name.replaceAll(" ", "_");
  console.log("filename", filename);
  console.log(filename);
  try {
    await writeFile(
      path.join(process.cwd(), "public/uploads/" + filename),
      buffer
    );

    const { db } = await connectToDatabase();
    console.log(db);
    const collection = db.collection("test"); // Tên collection trong MongoDB
    console.log(collection);

    try {
      const result = await collection.insertOne({
        name : `${filename.split('.')[0]}`,
        image_raw: `${filename}`,
        diffusion: "/images/result_example.png",
        glass: "/images/result_example.png",
        reconstruction: "/images/result_example.png"
      
      });
      const data = await collection.find({}).toArray();
      console.log(data);
      return Response.json({ data });
    } catch (error) {}

    return NextResponse.json({ Message: "Success", status: 201 });
  } catch (error) {
    console.log("Error occured ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};

export async function PUT() {
  console.log("in POST");

  const { db } = await connectToDatabase();
  console.log(db);
  const collection = db.collection("test"); // Tên collection trong MongoDB
  console.log(collection);

  try {
    const data = await collection.find({}).toArray();
    console.log(data);
    return Response.json({ data });
  } catch (error) {}
}
