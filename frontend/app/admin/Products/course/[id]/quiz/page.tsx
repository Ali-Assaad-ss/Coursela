"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { IoIosAdd } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NewMcq, NewSubj } from "./questions";

import { Reorder } from "framer-motion";
import { useState } from "react";

export default function QuizPage() {
  const initialItems = [{Type:"S",id:"1"},{Type:"S",id:"2"} ,{Type:"M",id:"3"}];

  const [items, setItems] = useState(initialItems);
  return (
    <>
      <h1 className="text-2xl font-bold m-5 mt-7 ml-10">Quiz</h1>
      <div className="flex flex-col p-16 gap-10 border rounded-xl mx-10">
        <div className="flex">
          <p className="text-xl">Title</p>
          <Input
            className="w-[80%] ml-auto"
            placeholder="Enter Quiz Title"
          ></Input>
        </div>
        <div className="flex">
          <p className="text-xl">Description</p>
          <Textarea
            className="w-[80%] ml-auto h-56"
            placeholder="Enter Quiz Description here"
          />
        </div>
        <Reorder.Group axis="y" values={items} onReorder={setItems}>
        {items.map((item) =>(
          <Reorder.Item key={item.id} value={item}>
            {item.Type === "M" ? <NewMcq/> : <NewSubj/>}
          </Reorder.Item>
        ))}
        </Reorder.Group>

        <DropdownMenu>
          <DropdownMenuTrigger className="ml-auto flex items-center hover:text-gray-500 hover:border-gray-500">
            <IoIosAdd className="border border-gray-800 rounded-sm text-3xl mr-3" />
            Add Question
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Question Type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>MCQ</DropdownMenuItem>
            <DropdownMenuItem>Subjective</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex gap-10 text-xl">
          Visibility <Switch />
        </div>
        <Button className="ml-auto px-10">Save</Button>
      </div>
    </>
  );
}
