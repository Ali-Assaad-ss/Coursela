import { Input } from "@/components/ui/input";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function page() {
  return (
    <div className="flex flex-col p-16 gap-10 border rounded-xl m-10">
    <div className="flex">
      <p>Title</p>
      <Input
        className="w-[500px] ml-auto"
        placeholder="Enter Title"
      ></Input>
    </div>
    <div className="flex">
      <p>Content</p>
      <Textarea
        className="w-[500px] ml-auto h-56"
        placeholder="Enter the Content here"
      />
    </div>
    <div className="flex gap-10">
      Visibility <Switch />
    </div>
    <Button className="ml-auto px-10">Save</Button>
  </div>
  );
}
