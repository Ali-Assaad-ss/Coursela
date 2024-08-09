"use client";
import UserChat from "../../admin/chat/UserChat";
import Message from "../../admin/chat//Message";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { VscSend } from "react-icons/vsc";
import React, { useEffect, useState } from "react";

import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
export default function Page() {
  const [messages, setMessages] = useState([]as string[]);
  const [message, setMessage] = useState("");
  const [connection, setConnection] = useState<HubConnection | null>(null);


  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl("http://localhost:5150/hub")
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    setConnection(connect);

    connect.start().then(() => {
      console.log("Connection started");
      connect.on("ReceiveMessage", (content) => {
        setMessages((prev) => [...prev, content]);
      });
    }).catch((err) => console.error('Connection failed: ', err));

    setConnection(connect);

    // Cleanup function to stop the connection and remove event listeners
    return () => {
      connect.stop();
      connect.off("ReceiveMessage");
    };
  }, []);

  const sendMessage = async () => {
    if (connection) {
      await connection.invoke("SendMessage", message,12,"text");
      console.log("Message sent");
      setMessage("");
    }
    else {
      console.log("No connection");}
  };
  return (
    <div className="p-7 h-[88vh]">
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
          {messages.map((msg, index) => (
            <Message key={index} text={msg} from time="12:32"></Message>
          ))
          }

          <div className="flex items-center mt-auto ">
            <Input placeholder="Enter your message" className="m-2" value={message}
           onChange={(e) => setMessage(e.target.value)}/>
            <Button className="mx-2" onClick={sendMessage}>
              <VscSend ></VscSend>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
