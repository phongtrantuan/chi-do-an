"use client";

import React, { useEffect, useState } from "react";
import { Button, FileButton, FileInput, Image, List } from "@mantine/core";

function ImageUploader() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [preview, setPreview]: any = useState(null);
  const [uploaded, setUploaded]: any = useState(null);
  const link_result = "/images/result_example.png";
  // Hàm xử lý khi người dùng chọn file
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
    console.log("event", event);
    // const file = event.currentTarget.files[0];
    // const file = event;
    // setFile(event);
    console.log("file", file);
    // Tạo URL để hiển thị bản xem trước
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    // const res = await fetch('/api', {
    //   method: 'POST',
    //   body: formData,
    // });

    // if (res.ok) {
    //   alert('File uploaded successfully!');
    // } else {
    //   alert('Failed to upload file.');
    // }

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
    console.log("out file", file);
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
      <div className="w-[300px]">
        <div className="flex justify-center text-2xl">History</div>
        <div>
          <List spacing="xs" size="xl" center>
            {//@ts-ignore
            data.map((item: any, id) => (
              <List.Item
                key={item + id}
                className="bg-[#8CDFEB] opacity-[.67] p-2 flex justify-center"
              >
                {item.name}
              </List.Item>
            ))}
          </List>
        </div>
      </div>
      <div className="grow  bg-gradient-to-b from-[#ECFCFE] to-[#8CDFEB]">
        <div className="h-[400px] flex justify-around bg-gradient-to-r from-[#A3C6D1] to-[#445EB9]">
          {preview && (
            <Image
              src={preview}
              alt="Preview"
              style={{ height: "100%", objectFit: "contain" }}
            />
          )}
          {uploaded && (
            <Image
              src={link_result}
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
          <div className="grid gap-x-8 grid-cols-3">
            {uploaded && (
              <>
                <div>
                  <div className="flex justify-center">Diffusion</div>
                  <div>
                    <Image
                      src={link_result}
                      alt="Preview"
                      style={{ height: "80%", objectFit: "contain" }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-center">Glass</div>
                  <div>
                    <Image
                      src={link_result}
                      alt="Preview"
                      style={{ height: "80%", objectFit: "contain" }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-center">Reconstruction</div>
                  <div>
                    <Image
                      src={link_result}
                      alt="Preview"
                      style={{ height: "80%", objectFit: "contain" }}
                    />
                  </div>
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
