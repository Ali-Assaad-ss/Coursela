"use client";
import { Input } from "@/components/ui/input";
import{ useCallback} from "react";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function page() {
  return (
    <>
      <h1 className="text-2xl font-bold m-5 mt-7 ml-10">Digital Download</h1>
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
        <div className="flex">
          <p className="text-xl">Download File</p>
          <Tabs defaultValue="account" className="border rounded-xl pb-5 w-[80%] ml-auto">
          <TabsList className="mb-5 flex">
            <TabsTrigger value="account" className="w-[100%]">
              File
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account"><Dropzone/></TabsContent>
        </Tabs>
        </div>
        <div className="flex gap-10 text-xl">
          Visibility <Switch />
        </div>
        <div className="flex gap-2 text-xl items-center">
          Price:<Input className="w-16"></Input>$
        </div>
        <div className="flex gap-2 text-xl items-center">
          Limit:<Input className="w-16"></Input>
        </div>
        <Button className="ml-auto px-10">Save</Button>
      </div>
    </>
  );
}
import { useDropzone } from "react-dropzone";
import { FaFileUpload } from "react-icons/fa";
import Dropzone from "@/components/component/Dropzone/Dropzone";

export function MyDropzone() {
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
