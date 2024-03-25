import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React from "react";
export default function page({ params }: any) {
  return (
    <div>
      <h1 className="text-2xl font-bold p-7">Name</h1>
      <div className="border mx-16 rounded-xl flex items-center p-5 text-gray-600 justify-center gap-10">
        <SectionDialog />
        <LessonDialog />
      </div>
    </div>
  );
}

export function SectionDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Lesson</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Create Lesson</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>
          <p className="mb-4">Enter Lesson Name</p>
          <Input placeholder="Name..." id="name" />
        </div>
        <div>
          <p className="mb-4">Choose Lesson Type</p>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Text">Text</SelectItem>
              <SelectItem value="Quiz">Quiz</SelectItem>
              <SelectItem value="Image">Image</SelectItem>
              <SelectItem value="Video">Video</SelectItem>
              <SelectItem value="PDF">PDF</SelectItem>
              <SelectItem value="File">File</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogClose className="ml-auto">
          <Button>Add</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
export function LessonDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Section</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Create Section</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>
          <p className="mb-4">Enter Section Name</p>
          <Input placeholder="Name..." id="name" />
        </div>
        <DialogClose className="ml-auto">
          <Button>Add</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}