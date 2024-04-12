import { Input } from "@/components/ui/input";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import TipTap from "../tiptap/TipTap";

export default function page() {
  return (
    <>
    <h1 className="text-2xl font-bold m-5 mt-7 ml-10">Text Lesson</h1>
    <div className="flex flex-col p-16 gap-10 border rounded-xl mx-10">
    <div className="flex">
      <p className="text-xl">Title</p>
      <Input
        className="w-[80%] ml-auto"
        placeholder="Enter Title"
      ></Input>
    </div>
    <div className="flex">
      <p className="text-xl">Content</p>
      <div
        className="w-[80%] ml-auto"
      >
        <TipTap/>
      </div>
    </div>
    <div className="flex gap-10 text-xl">
      Visibility <Switch />
    </div>
    <Button className="ml-auto px-10">Save</Button>
  </div></>
  );
}
