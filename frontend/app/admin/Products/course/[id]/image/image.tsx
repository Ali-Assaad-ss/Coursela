"use client";
import { Input } from "@/components/ui/input";
import React, { useCallback, useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Dropzone from "@/components/component/Dropzone/Dropzone";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function ImagePage({lesson}) {
  const [iUrl, setIUrl] = useState<string | null>(null);
  const [iFile, setIFile] = useState<File | null>(null);
  const [title, setTitle] = useState(lesson.title);
  const [description, setDescription] = useState(lesson.description);
  const [visibility, setVisibility] = useState(lesson.visibility);
  useEffect(()=>{if (lesson.content) setIUrl(`/api/file/lesson/${lesson.id}/file`)},[])
  const save=async () => {

    if(iUrl==null){
      alert("Please upload an image");
      return;
    }
    if(iUrl.includes("blob")){
      const formData = new FormData();
      iFile && formData.append("file", iFile);
      const response = await fetch(`/api/file/lesson/${lesson.id}/file`, {
        method: "POST",
        body:formData,
      });
      if (!response.ok) {
        alert("bad image");
        return;
      }
    }
    const response= await fetch(`/api/admin/courses/lessons/${lesson.id}`,
    {
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({title,content:lesson.content,description,visibility})
    })
    if(response.ok)alert("saved")
    else alert("error")
  }

  return (
    <>
      <h1 className="text-2xl font-bold m-5 mt-7 ml-10">Image Lesson</h1>
      <div className="flex flex-col p-16 gap-10 border rounded-xl mx-10">
        <div className="flex">
          <p className="text-xl">Title</p>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-[80%] ml-auto"
            placeholder="Enter Title"
          ></Input>
        </div>

        <div className="flex">
          <p className="text-xl">Description</p>
          <Textarea onChange={(e)=>setDescription(e.target.value)}
            className="w-[80%] ml-auto h-56"
            placeholder="Enter the Description here"
            value={description}
          />
        </div>
        <div className="flex">
          <p className="text-xl">Source</p>
          <div className="border rounded-xl pb-5 w-[80%] ml-auto">
            <p className="border-4 rounded-t-xl text-center">Image</p>
            <Dropzone url={iUrl} setUrl={setIUrl} file={iFile} setFile={setIFile} type="image"/>
          </div>
        </div>
        <div className="flex items-start">
        <p className="text-xl ">Visibility</p>
        <RadioGroup defaultValue={visibility} onValueChange={(e)=>setVisibility(e)} className="w-[80%] ml-auto">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="members" id="members" />
            <Label htmlFor="members">Members</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="everyone" id="everyone" />
            <Label htmlFor="everyone">Everyone (Preview)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="hidden" id="hidden" />
            <Label htmlFor="hidden">Hidden</Label>
          </div>
        </RadioGroup>
        </div>
        <Button className="ml-auto px-10" onClick={save}>Save</Button>
      </div>
    </>
  );
}
