import React from "react";
import UserChat from "./UserChat";
import Message from "./Message";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { VscSend } from "react-icons/vsc";

export default function page() {
  return (
    <div className="p-7 h-full">
      <h1 className="text-2xl font-bold pb-5">Chats </h1>
      <div className="flex border-2 rounded-lg h-5/6">
        <div className="w-1/3 max-w-80 border-r-2">
          <h1 className="m-3">Messages</h1>
          <hr />
          <UserChat className="mt-1"
            image="https://github.com/shadcn.png"
            name="name"
            unread="3"
          />
          <UserChat
            image="https://github.com/shadcn.png"
            name="name"
            unread="3"
          />
        </div>
        {/* <div className="flex items-center justify-center flex-1">
        <p> Start a Conversation</p>
        </div> */}
        <div className="flex flex-col w-full">
          <UserChat
            image="https://github.com/shadcn.png"
            name="name"
            unread=""
          />
          <hr className="mb-2" />

          <Message text="hello there" from time="12:32"></Message>
          <Message text="hello there" time="12:32"></Message>
          <Message text="hello there" time="12:32"></Message>
          <Message text="hello there" time="12:32"></Message>

          <div className="flex items-center mt-auto ">
            <Input placeholder="Enter your message" className="m-2" />
            <Button className="mx-2">
              <VscSend></VscSend>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
