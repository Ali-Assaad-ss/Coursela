"use client";
import { Input } from "@/components/ui/input";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MdOutlineDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { DatePickerDemo } from "./date";
import { IoIosAdd } from "react-icons/io";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Dropzone from "@/components/component/Dropzone/Dropzone";

export default function page() {
  return (
    <>
      <h1 className="text-2xl font-bold m-5 mt-7 ml-10">Live Session</h1>
      <div className="flex flex-col p-16 gap-10 border rounded-xl mx-10">
        <div className="flex">
          <p className="text-xl">Title</p>
          <Input
            className="w-[80%] ml-auto"
            placeholder="Enter Title"
          ></Input>
        </div>
        <div className="flex">
          <p className="text-xl">Description</p>
          <Textarea
            className="w-[80%] ml-auto h-56"
            placeholder="Enter the Content here"
          />
        </div>
        <div className="flex">
          <p className="text-xl">Image</p>
          <Tabs defaultValue="account" className="border rounded-xl pb-5 w-[80%] ml-auto">
          <TabsList className="mb-5 flex">
            <TabsTrigger value="account" className="w-[100%]">
              File
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account"><Dropzone/></TabsContent>
        </Tabs>
        </div>
        <Availability />
        <div className="w-[80%] ml-auto border rounded-xl ">
          <p className="text-xl p-5">Specific Day</p>
          <div className="flex pb-3">
            <DatePickerDemo />
            <div className="flex flex-wrap gap-x-24 gap-y-3">
              <Interval />
            </div>
          </div>
          <IoIosAdd className="border border-gray-600 rounded-sm text-3xl m-5 flex items-center hover:text-gray-500 hover:border-gray-500" />
        </div>
        <div className="flex gap-10 text-xl">
          Visibility <Switch />
        </div>
        <div className="flex text-xl items-center">
          Price:<Input className="w-16 ml-10 mr-2"></Input>$
        </div>
        <div className="flex text-xl items-center">
          Limit:<Input className="w-16 ml-10 mr-2"></Input>
        </div>
        <Button className="ml-auto px-10">Save</Button>
      </div>
    </>
  );
}

export function Interval({}) {
  return (
    <div className="flex">
      <input className="border rounded-md p-2" type="time" />
      <p className="mx-5 mt-3">To</p>
      <input className="border rounded-md p-2" type="time" />
      <MdOutlineDelete className="text-2xl text-gray-600 hover:text-red-600 hover:cursor-pointer mx-1 mt-2" />
      <IoMdAdd className="text-2xl text-gray-600 hover:text-red-600 hover:cursor-pointer mx-1 mt-2" />
    </div>
  );
}

function Availability() {
  return (
    <div className="flex">
      <p className="text-xl">Availability</p>
      <div className="w-[80%] ml-auto border rounded-xl ">
        <div>
          <p className="text-xl p-5">Weekly Hours</p>
          <div className="flex flex-col gap-2 mb-5">
            <div className="flex gap-6">
              <Checkbox className="ml-5 mt-3" />
              <p className="w-10 mt-2">Mon</p>
              <div className="flex flex-wrap gap-x-24 gap-y-3">
                <Interval /> <Interval />
              </div>
            </div>
            <div className="flex gap-5">
              <Checkbox className="ml-5 mt-3" />
              <p className="w-10 mt-2">Tue</p>
              <div className="flex flex-wrap gap-x-24 gap-y-3">
                <Interval />
              </div>
            </div>
            <div className="flex gap-5">
              <Checkbox className="ml-5 mt-3" />
              <p className="w-10 mt-2">Wed</p>
              <div className="flex flex-wrap gap-x-24 gap-y-3">
                <Interval />
              </div>
            </div>
            <div className="flex gap-5">
              <Checkbox className="ml-5 mt-3" />
              <p className="w-10 mt-2">Thu</p>
              <div className="flex flex-wrap gap-x-24 gap-y-3">
                <Interval />
              </div>
            </div>
            <div className="flex gap-5">
              <Checkbox className="ml-5 mt-3" />
              <p className="w-10 mt-2">Fri</p>
              <div className="flex flex-wrap gap-x-24 gap-y-3">
                <Interval />
              </div>
            </div>
            <div className="flex gap-5">
              <Checkbox className="ml-5 mt-3" />
              <p className="w-10 mt-2">Sat</p>
              <div className="flex flex-wrap gap-x-24 gap-y-3">
                <Interval />
              </div>
            </div>
            <div className="flex gap-5">
              <Checkbox className="ml-5 mt-3" />
              <p className="w-10 mt-2">Sun</p>
              <div className="flex flex-wrap gap-x-24 gap-y-3">
                <Interval />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
