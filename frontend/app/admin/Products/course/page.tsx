"use client";
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
import { CiText } from "react-icons/ci";
import { LuFileQuestion } from "react-icons/lu";
import { MdOndemandVideo } from "react-icons/md";
import { TbGridDots } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import React, { useState } from "react";
import { Reorder, useDragControls } from "framer-motion";
import { BsFolderSymlink } from "react-icons/bs";
import { FaFileDownload } from "react-icons/fa";
import { FaRegFilePdf } from "react-icons/fa6";
import { IoImageOutline } from "react-icons/io5";
import { MdOutlineDeleteForever } from "react-icons/md";
import { TiEdit } from "react-icons/ti";
export default function Page() {
  const [lessons, setLessons] = useState([
    {
      id: 1,
      name: "Introduction",
      type: "Text",
    },
    {
      id: 2,
      name: "First Quiz",
      type: "Quiz",
    },
    {
      id: 3,
      name: "Tutorial",
      type: "Video",
    },
    {
      id: 4,
      name: "Tutorial",
      type: "Pdf",
    },
    {
      id: 5,
      name: "Tutorial",
      type: "Image",
    },
    {
      id: 6,
      name: "Tutorial",
      type: "File",
    },
    {
      id: 7,
      name: "Chapter 2",
      type: "Section",
      isChild: true,
      lessons: [
        { id: 1, name: "Introduction", type: "Text" },
        { id: 2, name: "First Quiz", type: "Quiz" },
      ],
    },
  ]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold my-10 mx-10">Python Beginner</h1>
        <Button variant="outline" className="text-2xl mr-5">
          <IoSettingsOutline />
        </Button>
      </div>
      <Section Sectionlessons={lessons} onReorderFunction={setLessons} />
    </div>
  );
}

export function Section({ Sectionlessons, onReorderFunction }) {
  return (
    <Reorder.Group
      className="border mx-4 rounded-xl flex flex-col w-full  p-5  text-gray-800  gap-7"
      axis="y"
      values={Sectionlessons}
      onReorder={onReorderFunction}
    >
      {Sectionlessons.map((lesson) => (
        <LessonItem lesson={lesson} key={lesson.id} />
      ))}
      <div className="flex justify-left gap-4">
        <LessonDialog />
        <SectionDialog />
      </div>
    </Reorder.Group>
  );
}

function LessonItem({ lesson }: any) {
  const controls = useDragControls();
  return (
    <Reorder.Item
      className="flex items-center gap-3 border rounded-xl p-5 select-none"
      id={lesson.id}
      value={lesson}
      dragListener={false}
      dragControls={controls}
    >
      <div
        className="cursor-grab active:cursor-grabbing"
        onPointerDown={(e) => controls.start(e)}
      >
        <TbGridDots className="text-3xl" />
      </div>
      <Lesson type={lesson.type} title={lesson.name} />
    </Reorder.Item>
  );
}

export function Lesson(props) {
  let Icon;
  switch (props.type) {
    case "Section":
      Icon = BsFolderSymlink;
      break;
    case "Text":
      Icon = CiText;
      break;
    case "Video":
      Icon = MdOndemandVideo;
      break;
    case "Quiz":
      Icon = LuFileQuestion;
      break;
    case "File":
      Icon = FaFileDownload;
      break;
    case "PDF":
      Icon = FaRegFilePdf;
      break;
    case "Image":
      Icon = IoImageOutline;
      break;
    default:
      Icon = BsFolderSymlink; // Default to section icon if type is not specified
  }

  return (
    <div className="flex items-center w-full">
      <Icon className="bg-slate-100 text-black text-5xl p-2 rounded-md" />
      <h2 className="text-2xl font-bold ml-5">{props.title}</h2>
      <div className="ml-auto text-3xl flex gap-2 items-center">
      <TiEdit className="hover:text-blue-900 hover:cursor-pointer" />
      <MdOutlineDeleteForever className="hover:text-red-950 hover:cursor-pointer" />
    </div>
    </div>
  );
}

export function LessonDialog() {
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
              <SelectValue placeholder="Lesson Type" />
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
export function SectionDialog() {
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
