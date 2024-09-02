"use client";

import React, { useEffect, useState } from "react";
import { Button, FileButton, FileInput, Image, List } from "@mantine/core";

function ImageUploader() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [preview, setPreview]: any = useState(null);
  const [loading, setLoading]: any = useState(false);
  const [uploaded, setUploaded]: any = useState(null);
  const [select, setSelect]: any = useState(null);
  const [glassPath, setGlassPath]: any = useState(null);
  const [diffusionPath, setDiffusionPath]: any = useState(null);
  const [reconstructionPath, setReconstructionPath]: any = useState(null);
  const link_result = "/images/result_example.png";
  // Hàm xử lý khi người dùng chọn file
  const handleSelect = (image: any) => {
    setSelect((prev: any) => image);
  };

  const handleSelectItem = (imageTest: any) => {
    setPreview(imageTest.image_raw)
    setGlassPath(imageTest.glass)
    setReconstructionPath(imageTest.reconstruction)
    setDiffusionPath(imageTest.diffusion)
    setUploaded(true);
  };

  const handleFileChange = (event: any) => {
    console.log(event);
    // const file = event.currentTarget.files[0];
    const file = event;
    setFile(event);
    console.log("file", file);
    // Tạo URL để hiển thị bản xem trước
    if (file) {
      console.log("in file", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        console.log("in reader", reader.result);
      };
      reader.readAsDataURL(file);
    }
    console.log("out file", file);
  };
  const handleUpload = async (event: any) => {
    setGlassPath(null);
    setDiffusionPath(null);
    setReconstructionPath(null);
    setLoading(true);
    console.log("event", event);
    console.log("file", file);
    // Tạo URL để hiển thị bản xem trước
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api", {
      method: "POST",
      body: formData,
    });
    console.log("response", res);
    const data = await res.json();
    console.log(data);
    setData(data.data);

    console.log("out file", file);
    setTimeout(() => {
      console.log("End");
      setGlassPath(data.data.at(-1).glass);
      setDiffusionPath(data.data.at(-1).diffusion);
      setReconstructionPath(data.data.at(-1).reconstruction);
      setLoading(false);
    }, 2000);
    if (file) {
      console.log("in file", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploaded(true);
        // setUploaded(reader.result);
        console.log("in reader", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const fetchData = async () => {
    console.log("fetching data");
    const response = await fetch("http://localhost:3000/api");
    console.log("response", response);
    const data = await response.json();
    console.log("checkkk");
    console.log(data);
    setData(data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Tạo dữ liệu
  const createData = async (newData: any) => {
    const response = await fetch("/api/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });
    const result = await response.json();
    console.log(result);
  };

  // Cập nhật dữ liệu
  const updateData = async (id: any, updateData: any) => {
    const response = await fetch("/api/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, updateData }),
    });
    const result = await response.json();
    console.log(result);
  };

  return (
    <div className="flex h-full w-full">
      <div className="w-[300px] overflow-auto min-w-[300px]">
        <div className="flex justify-center text-2xl">History</div>
        <div>
          <List spacing="xs" size="xl" center>
            {
              //@ts-ignore
              data.map((item: any, id) => (
                <List.Item
                  key={item + id}
                  className="bg-[#8CDFEB] cursor-pointer opacity-[.67] p-2 flex justify-center"
                  onClick={() => {handleSelectItem(item)}}
                >
                  {item.name}
                </List.Item>
              ))
            }
          </List>
        </div>
      </div>
      <div className="grow overflow-auto bg-gradient-to-b from-[#ECFCFE] to-[#8CDFEB]">
        <div className="h-[400px] flex justify-around bg-gradient-to-r from-[#A3C6D1] to-[#445EB9]">
          {preview && (
            <Image
              src={preview}
              alt="Preview"
              style={{ height: "100%", objectFit: "contain" }}
            />
          )}
          {select && (
            <Image
              src={select}
              alt="Preview"
              style={{ height: "100%", objectFit: "contain" }}
            />
          )}
        </div>
        <div>
          <div className="pt-4 flex justify-center">
            <FileButton
              onChange={handleFileChange}
              accept="image/png,image/jpeg"
            >
              {(props) => <Button {...props}>Choose Image</Button>}
            </FileButton>
            <div className="px-12"></div>
            {file && <Button onClick={handleUpload}>OK</Button>}
          </div>
          <div className="grid gap-x-16 grid-cols-3 px-4">
            {uploaded && (
              <>
                <div>
                  <div className="flex justify-center">Diffusion</div>
                  {loading && (
                    <div className="animate-spin">
                      <Image
                        src={"/spinning-dots.png"}
                        alt="Preview"
                        style={{ height: "30%", objectFit: "contain" }}
                        onClick={() => handleSelect(diffusionPath)}
                      />
                    </div>
                  )}
                  {diffusionPath && (
                    <div>
                      <Image
                        src={diffusionPath}
                        alt="Preview"
                        style={{ height: "80%", maxHeight:"300px", objectFit: "contain" }}
                        onClick={() => handleSelect(diffusionPath)}
                      />
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex justify-center">Glass</div>
                  {loading && (
                    <div className="animate-spin">
                      <Image
                        src={"/spinning-dots.png"}
                        alt="Preview"
                        style={{ height: "30%", objectFit: "contain" }}
                        onClick={() => handleSelect(diffusionPath)}
                      />
                    </div>
                  )}
                  {glassPath && (
                    <div>
                      <Image
                        src={glassPath}
                        alt="Preview"
                        style={{ height: "80%", maxHeight:"300px", objectFit: "contain" }}
                        onClick={() => handleSelect(glassPath)}
                      />
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex justify-center">
                    Reconstruction
                  </div>
                  {loading && (
                    <div className="animate-spin">
                      <Image
                        src={"/spinning-dots.png"}
                        alt="Preview"
                        style={{ height: "30%", objectFit: "contain" }}
                        onClick={() => handleSelect(diffusionPath)}
                      />
                    </div>
                  )}
                  {reconstructionPath && (
                    <div>
                      <Image
                        src={reconstructionPath}
                        alt="Preview"
                        style={{ height: "80%", maxHeight:"300px", objectFit: "contain" }}
                        onClick={() => handleSelect(reconstructionPath)}
                      />
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageUploader;
