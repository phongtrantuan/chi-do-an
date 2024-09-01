"use client";

import React, { useState } from "react";
import { Button, FileButton, FileInput, Image, List } from "@mantine/core";

function ImageUploader() {
  const [file, setFile] = useState(null);
  const [preview, setPreview]: any = useState(null);
  const [uploaded, setUploaded]: any = useState(null);
  const link_result =
    "https://s3-alpha-sig.figma.com/img/9ebb/37a7/eb2e5b6b35e73e816af5a98dd0b0809d?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=glp7iL~m3gULOpRHq3VjBrcza51PHGwpEGTGvEqXOZ5Srij8LRwGKHXRrDtn-dlvW4DVdJDk2QvSn6Pzemoch4qzw62yuTuxmO70-QIDaOBXRwXtpUOHX7QClawBGnnpT9KcojYYtso0pHx192XYan4orQRZkmNumc7zBDvnt8FwQEXopGsTpALiUYIgPumMji~G3E3AAXFCQ6gvuuZvU-hciGh~DNexcKHTjs72bGWYNgjVT2LtvodL8EuHATPiaVSG7PvW6TL3yuqDnwI1w8Yc2kJyo62sVVQIdK~vTPjEdavZJpwmHyx6aEx3Wj7~GnGwN6Q0FtDLmwmSTxLKfg__";
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
  const handleUpload = (event: any) => {
    console.log("event", event);
    // const file = event.currentTarget.files[0];
    // const file = event;
    // setFile(event);
    console.log("file", file);
    // Tạo URL để hiển thị bản xem trước

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

  return (
    <div className="flex h-full w-full">
      <div className="w-[300px]">
        <div className="flex justify-center text-2xl">History</div>
        <div>
          <List
            spacing="xs"
            size="xl"
            center
          >
            <List.Item className="bg-[#8CDFEB] opacity-[.67] p-2 flex justify-center">
              Name Image
            </List.Item>
            <List.Item className="bg-[#8CDFEB] opacity-[.67] p-2 flex justify-center">
              Name Image
            </List.Item>
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
