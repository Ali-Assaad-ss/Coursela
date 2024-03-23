import React from "react";
import UserChat from "./UserChat";
import Message from "./Message";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { VscSend } from "react-icons/vsc";

export default function page() {
  return (
    <div className="p-7 h-full">
      <h1>Chat</h1>
      <div className="flex border-2 rounded-lg h-5/6">
        <div className="w-1/3 max-w-80 border-r-2">
          <UserChat image="https://github.com/shadcn.png" name="your name" unread="" />
          <UserChat image="https://github.com/shadcn.png" name="name" unread="3" />
          <UserChat image="https://github.com/shadcn.png" name="name" unread="3" />
        </div>
        {/* <div className="flex items-center justify-center flex-1">
        <p> Start a Conversation</p>
        </div> */}
        <div className="flex flex-col-reverse w-full">
        <div className="flex items-center"><Input placeholder="Enter your message" className="m-2"/> <Button className="mx-2"><VscSend></VscSend></Button></div>
          <Message text="hello there" from time="12:32"></Message>
          <Message text="hello there" time="12:32"></Message>
          <Message text="hello there" time="12:32"></Message>
          <Message text="hello there" time="12:32"></Message>

        </div>
      </div>
    </div>
  );
}
