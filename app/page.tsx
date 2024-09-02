"use client";

import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ImageUploader from "./image_uploader";
import { useState } from "react";
import Evaluate from "./evaluate";

export default function Home() {
  const listTabs = ["Model", "Evaluate"];
  const [tab, setTab] = useState("Model");
  const [opened, { toggle }] = useDisclosure();
  return (
    <AppShell
      header={{ height: 60 }}
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <div className="flex justify-between h-full items-center">
          <div className="text-2xl font-bold px-4">DEMO</div>
          <div className="pr-4">
            {listTabs.map((item, id) =>
              <a key={item + id} className={`text-lg mx-2 cursor-pointer ${item == tab && 'underline'}`}
              onClick={() => setTab(item)}
              >{item}</a>)}
          </div>
        </div>
      </AppShell.Header>
      <AppShell.Main>
        {tab == "Model" && (
          <div
            className="flex h-full w-full grow"
            style={{ height: "calc(100vh - 60px)" }}
          >
            <ImageUploader></ImageUploader>
          </div>
        )}
        {tab == "Evaluate" && (
          <div
            className="flex h-full w-full grow"
            style={{ height: "calc(100vh - 60px)" }}
          >
            <Evaluate></Evaluate>
          </div>
        )}
      </AppShell.Main>
    </AppShell>
  );
}
