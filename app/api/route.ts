export const dynamic = "force-static";
import { connectToDatabase } from "../../lib/mongodb";
import fs from "fs";
import path from "path";
import { exec } from 'child_process';

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


export const config = {
  api: {
    bodyParser: false,
  },
};

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
      path.join(process.cwd(), "public/images/" + filename),
      buffer
    );

    const { db } = await connectToDatabase();
    console.log(db);
    const collection = db.collection("test"); // Tên collection trong MongoDB
    console.log(collection);

    try {
      const result = await collection.insertOne({
        name : `${filename.split('.')[0]}`,
        image_raw: `/images/${filename}`,
        diffusion: "/images/" + filename.split('.')[0] + '_diffusion.png',
        glass: "/images/" + filename.split('.')[0] + '_glass.png',
        reconstruction: "/images/" + filename.split('.')[0] + '_reconstruction.png'
      });

      const imageRawPath = path.join(process.cwd(), "public/images/" + filename);
      const glassProcessPath = path.join(process.cwd(), "app/process/glass.py");
      const diffusionProcessPath = path.join(process.cwd(), "app/process/diffusion.py");
      const reconstructionProcessPath = path.join(process.cwd(), "app/process/reconstruction.py");
      console.log('imageRawPath', imageRawPath);
      console.log('glassProcessPath',glassProcessPath);
      console.log('diffusionProcessPath',diffusionProcessPath);
      console.log('reconstructionProcessPath',reconstructionProcessPath);

      // call process glass
      exec(`python ${glassProcessPath} ${imageRawPath}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${stderr}`);
        }
        console.log(`Output: ${stdout}`);
      });
      // call process diffusion
      exec(`python ${diffusionProcessPath} ${imageRawPath}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${stderr}`);
        }
        console.log(`Output: ${stdout}`);
      });
      // call process reconstruction
      exec(`python ${reconstructionProcessPath} ${imageRawPath}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${stderr}`);
        }
        console.log(`Output: ${stdout}`);
      });
      // setTimeout(() => {
      //   console.log('End');
      // }, 15000);

      const data = await collection.find({}).toArray();
      console.log(data);
      return Response.json({ data });
    } catch (error) {}
  } catch (error) {
    console.log("Error occurred ", error);
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
