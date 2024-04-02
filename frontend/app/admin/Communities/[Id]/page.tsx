import { Input } from "@/components/ui/input";
import React from "react";
import UserChat from "../../Chat/UserChat";
import { FaRegEye } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
export default function page() {
  return (
    <div className="flex w-auto h-5/6 m-4">
      <div className="w-1/4 border-2 m-2 rounded-xl">
        <div className="text-center p-3 text-xl font-bold">community name</div>
        <div className="flex justify-around">
          <div className="flex flex-col items-center">
            <h2>Posts</h2>
            <h2>123</h2>
          </div>
          <div className="flex flex-col items-center">
            <h2>Members</h2>
            <h2>56</h2>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 mt-14">
          <h1 className="border w-1/2 rounded-xl text-center">Top</h1>
          <h1 className="border w-1/2 rounded-xl text-center">New</h1>
          <h1 className="border w-1/2 rounded-xl text-center">Liked</h1>
          <h1 className="border w-1/2 rounded-xl text-center">My Posts</h1>
        </div>
      </div>
      <div className="w-1/2 flex flex-col items-center ">
        <Input placeholder="Search Posts" className="w-5/6 max-w-96 mb-2" />
        <div id="Post" className="border-2 m-2 rounded-xl w-96">
          <UserChat image="https://github.com/shadcn.png" name="name" />
          <p className="ml-12 -mt-3 mb-2">description of the post ...</p>
          <div className="border rounded-xl w-80 h-72 mx-auto mb-4"></div>
          <div className="border-t-2 flex justify-around h-8 items-center"> 
          <div className="flex items-center gap-2"><FaRegHeart /> <p className="text-xs">12</p> </div>
          <div className="flex items-center gap-2"><FaRegEye /> <p className="text-xs">12</p> </div>
          <div className="flex items-center gap-2"><FaRegComment /> <p className="text-xs">12</p> </div>
          </div>
        </div>
      </div>
      <div className="w-1/4 border-l">
      <UserChat image="https://github.com/shadcn.png" name="Micheal jackson" />
      <UserChat image="https://github.com/shadcn.png" name="name" />
      <UserChat image="https://github.com/shadcn.png" name="name" />
      <UserChat image="https://github.com/shadcn.png" name="name" />
      <UserChat image="https://github.com/shadcn.png" name="name" />
      <UserChat image="https://github.com/shadcn.png" name="name" />
      <UserChat image="https://github.com/shadcn.png" name="name" />
      <UserChat image="https://github.com/shadcn.png" name="name" />
      <UserChat image="https://github.com/shadcn.png" name="name" />
      <UserChat image="https://github.com/shadcn.png" name="name" />


      </div>
    </div>
  );
}
