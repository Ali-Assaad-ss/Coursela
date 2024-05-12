"use client";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

export default function TextPage({ params }: any) {
  const [visibility, setVisibility] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetch(`/api/admin/courses/lessons/${params.lessonId}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setVisibility(data.visibility);
        setDescription(data.description);
      });
  }, []);

  const save = async () => {
    const response = await fetch(
      `/api/admin/courses/lessons/${params.lessonId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, visibility, description, content: "" }),
      }
    );
    if (response.ok) alert("saved");
    else alert("error saving");
  };
  return (
    <>
      <h1 className="text-2xl font-bold m-5 mt-7 ml-10">Section settings</h1>
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
            <Textarea
              onChange={(e) => setDescription(e.target.value)}
              className="w-[80%] ml-auto h-56"
              placeholder="Enter the Description here"
              value={description}
            />
          </div>
        <div className="flex items-start">
          <p className="text-xl ">Visibility</p>
          <RadioGroup
            value={visibility}
            onValueChange={(e) => setVisibility(e)}
            className="w-[80%] ml-auto"
          >
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
        <Button onClick={save} className="ml-auto px-10">
          Save
        </Button>
      </div>
    </>
  );
}
