"use client";
import { Input } from "@/components/ui/input";
import React, {useState } from "react";
import { Button } from "@/components/ui/button";
import { MenuBar, extensions } from "../tiptap/TipTap";
import { EditorProvider } from "@tiptap/react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function TextPage({ lesson }) {
  const [title, setTitle] = useState(lesson.title);
  const [visibility, setVisibility] = useState(lesson.visibility);
  const [content, setEditorContent] = useState(lesson.content);

  const save=async () => {
    const response=await fetch(`/api/admin/courses/lessons/${lesson.id}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({title,visibility,content})
    }
    )
    if(response.ok)alert("saved")
    else alert("error saving")
  }
  return (
    <>
      <h1 className="text-2xl font-bold m-5 mt-7 ml-10">Text Lesson</h1>
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
          <p className="text-xl">Content</p>
          <div className="w-[80%] ml-auto">
            <EditorProvider
              slotBefore={<MenuBar />}
              extensions={extensions}
              children=""
              onUpdate={(e) => setEditorContent(e.editor.getHTML())}
              content={content}
            ></EditorProvider>
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
        <Button onClick={save} className="ml-auto px-10">Save</Button>
      </div>
    </>
  );
}
