"use client";

import React, { useState } from "react";
import { Image } from "@mantine/core";

function Evaluate() {
  let link_image =
    "https://s3-alpha-sig.figma.com/img/0ca7/02de/2c09d9354c55efce7727585484cc2e67?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YSWZ9NGG1-ZjAUso9EVDmGlT5lYqj7K8Cbfqzss195WBmLTyDMtJF4BkejQJ0D14zqUmYy5XWNQdLGu5VKHVqtavkBYZEeXrfjkmDffuoGCD8aIBmQWSL-xCAihYpCOsLr9tmK71TPeWBF~pOmvowJVVR9XDrvSZZ6YDn2wV6TquRfL~~ZzU~TtfGFruMir34JDPWEZJP8BNLaJl~I4fnyEbbcGwK6LxxaSgmUtRNJ-1fhtAKtCQ8vvtAsaL3iJJLXwO-Maeexb9WIptrDqpfUzeiqVHj1b80T~fNrcpv3rGV2z~fzv~wBjlItw9AMh2ehwHpTlgW~Km5sfFpezbKQ__";
  // Hàm xử lý khi người dùng chọn

  return (
    <div className="flex h-full w-full grow  bg-gradient-to-b from-[#ECFCFE] to-[#8CDFEB]">
      <div className="grow bg-gradient-to-b from-[#ECFCFE] to-[#8CDFEB] justify-center">
        <div className="flex justify-center items-center h-full w-1/2s">
          <Image
            src={link_image}
            alt="Preview"
            style={{ height: "50%", objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Evaluate;
