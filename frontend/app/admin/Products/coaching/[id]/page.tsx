"use client";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
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

export default function page({ params }: any) {
  const load = async () => {
    let response = await fetch(`/api/admin/coaching/${params.id}`);
    let data = await response.json();
    console.log(data);
  };
  useEffect(() => {
    load();
  }, []);
  const [Specificdays , setSpecificdays] = useState([
    {day:"2024-05-15",slots:[{id:1,start:"00:00",end:"01:00"},{id:2,start:"00:00",end:"01:00"}]},
    {day:"2024-05-17",slots:[{id:2,start:"00:00",end:"01:00"}]},
    {day:"2024-05-18",slots:[{id:3,start:"00:00",end:"01:00"}]},
  ]);


  return (
    <>
      <h1 className="text-2xl font-bold m-5 mt-7 ml-10">Live Session</h1>
      <div className="flex flex-col p-16 gap-10 border rounded-xl mx-10">
        <div className="flex">
          <p className="text-xl">Title</p>
          <Input className="w-[80%] ml-auto" placeholder="Enter Title"></Input>
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
          <Tabs
            defaultValue="account"
            className="border rounded-xl pb-5 w-[80%] ml-auto"
          >
            <TabsList className="mb-5 flex">
              <TabsTrigger value="account" className="w-[100%]">
                File
              </TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Dropzone />
            </TabsContent>
          </Tabs>
        </div>
        <Availability />
        <div className="w-[80%] ml-auto border rounded-xl ">
          <p className="text-xl p-5">Specific Days</p>
          <div className="flex flex-col gap-5 pb-3">
          {Specificdays.map((day) => (
                <div className="flex gap-5">
                  <DatePickerDemo defaultDate={new Date(day.day)} className="min-w-40"/>
                  <div className="flex gap-y-3 flex-wrap">
                    {day.slots.map((slot) => (

                      <div key={slot.id} className="flex w-[345px]">
                      <TimeSelect value={slot.start} />
                      <p className="mx-5 mt-3">To</p>
                      <TimeSelect value={slot.end} />
                      <MdOutlineDelete onClick={()=>{}} className="text-2xl text-gray-600 hover:text-red-600 hover:cursor-pointer mx-1 mt-2" />
                    </div>
                    ))}
                  <IoMdAdd
                    onClick={()=>{}}
                    className="size-5 text-gray-600 hover:text-red-600 hover:cursor-pointer mx-1 mt-2"
                  />
                  </div>
                </div>
            ))}
            <div className="flex flex-wrap gap-x-24 gap-y-3">

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


function Availability() {
  const [days, setDays] = useState([
    { day: "Monday", slots: [
      {id:1, start: "11:00", end: "12:00" }] },
    { day: "Tuesday", slots: [] },
    { day: "Wednesday", slots: [] },
    { day: "Thursday", slots: [] },
    { day: "Friday", slots: [] },
    { day: "Saturday", slots: [] },
    { day: "Sunday", slots: [] },
  ]);

  function addDay(day) {
    const index = days.findIndex((d) => d.day == day.day);
    let newDays = [...days];
    newDays[index].slots.push({id:Math.random() + 1000, start: "11:00", end: "12:00" });
    setDays(newDays);
  }
  function DeleteDay(day:string,id:number) {
    console.log(day,id);
    const index = days.findIndex((d) => d.day == day);
    let newDays = [...days];
    newDays[index].slots = newDays[index].slots.filter((slot) => slot.id !== id);
    setDays(newDays);

  }

  return (
    <div className="flex">
      <p className="text-xl">Availability</p>
      <div className="w-[80%]  min-w-[520px] ml-auto border rounded-xl ">
        <div>
          <p className="text-xl p-5">Weekly Hours</p>
          <div className="flex flex-col gap-2 mb-5 min-w-[520px]">
            {days.map((day) => (
                <div className="flex gap-5">
                  <Checkbox className="ml-5 mt-3" />
                  <p className="w-24 min-w-24 mt-2">{day.day}</p>
                  <div className="flex gap-y-5 flex-wrap">
                    {day.slots.map((slot) => (

                      <div key={slot.id} className="flex w-[345px]">
                      <TimeSelect value={slot.start} />
                      <p className="mx-5 mt-3">To</p>
                      <TimeSelect value={slot.end} />
                      <MdOutlineDelete onClick={()=>DeleteDay(day.day,slot.id)} className="text-2xl text-gray-600 hover:text-red-600 hover:cursor-pointer mx-1 mt-2" />
                    </div>
                    ))}
                  <IoMdAdd
                    onClick={() => addDay(day)}
                    className="size-5 text-gray-600 hover:text-red-600 hover:cursor-pointer mx-1 mt-2"
                  />
                  </div>
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TimeSelect = ({ value }: any) => {
  return (
    <Select defaultValue={value ?? "12:00"}>
      <SelectTrigger className="w-32">
        <SelectValue placeholder="Select Time" />
      </SelectTrigger>
      <SelectContent>
        {Array.from({ length: 24 }, (_, i) => i).map((i) => (
          <>
            <SelectItem key={i} value={i < 10 ? `0${i}:00` : `${i}:00`}>
              {i < 10 ? `0${i}:00` : `${i}:00`}
            </SelectItem>
            <SelectItem key={i + 24} value={i < 10 ? `0${i}:30` : `${i}:30`}>
              {i < 10 ? `0${i}:30` : `${i}:30`}
            </SelectItem>
          </>
        ))}
      </SelectContent>
    </Select>
  );
};
