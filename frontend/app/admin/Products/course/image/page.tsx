"use client";
import { Input } from "@/components/ui/input";
import React, { useCallback, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function page() {
  return (
    <>
      <h1 className="text-2xl font-bold m-5 mt-7 ml-10">Image Lesson</h1>
      <div className="flex flex-col p-16 gap-10 border rounded-xl mx-10">
        <div className="flex">
          <p className="text-xl">Title</p>
          <Input className="w-[80%] ml-auto" placeholder="Enter Title"></Input>
        </div>

        <div className="flex">
          <p className="text-xl">Description</p>
          <Textarea
            className="w-[80%] ml-auto h-56"
            placeholder="Enter the Description here"
          />
        </div>
        <div className="flex">
          <p className="text-xl">Source</p>
          <Tabs defaultValue="account" className="border rounded-xl pb-5 w-[80%] ml-auto">
          <TabsList className="mb-5 flex">
            <TabsTrigger value="account" className="w-[50%]">
              File
            </TabsTrigger>
            <TabsTrigger value="password" className="w-[50%]">
              Link
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account"><MyDropzone /></TabsContent>
          
          <TabsContent value="password" className="">
            <div className="flex mx-5">
              <p className="text-xl">Link</p>
              <Input
                className="w-[80%] ml-auto"
                placeholder="Enter Link here"
              ></Input>
            </div>
          </TabsContent>
        </Tabs>
        </div>
        <div className="flex gap-10 text-xl">
          Visibility <Switch />
        </div>
        <Button className="ml-auto px-10">Save</Button>
      </div>
    </>
  );
}
import { useDropzone } from "react-dropzone";
import { FaFileUpload } from "react-icons/fa";
function MyDropzone() {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files, such as uploading them or processing them
    acceptedFiles.forEach((file) => {
      console.log(file.name); // Log the file name
      // You can perform further actions with the file here
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="p-5 flex flex-col items-center">
      <input {...getInputProps()} />
      <FaFileUpload className="" />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
}
