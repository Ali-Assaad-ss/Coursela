"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
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
import { TbGridDots } from "react-icons/tb";
import React, { createContext, useContext, useState } from "react";
import { Reorder, useDragControls } from "framer-motion";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import quiz from '../icons/question.gif';
import pdf from '../icons/pdf-file.gif';
import download from '../icons/download.gif';
import folder from '../icons/folder.gif';
import video from '../icons/video.gif';
import img from '../icons/image.gif';
import text from '../icons/txt-file.gif';
import "../styles.css"
type myContext = {
    router: AppRouterInstance;
    updateLessons: Function;
};

export const Context = createContext<myContext | undefined>(undefined);

export default function Page({lesson}:any) {

  const [lessons, setLessons] = useState(lesson.childSection.lessons);
  const router = useRouter();
  const sectionId =lesson.childSectionId;
  const name = lesson.title.charAt(0).toUpperCase() + lesson.title.slice(1);
  
  async function updateLessons() {
    await fetch(`/api/admin/courses/lessons/${lesson.id}`)
        .then((res) => res.json())
        .then((data) => {
            setLessons(data.childSection.lessons);
        });
    }


  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold my-5 ml-20 ">{name}</h1>
        <div onClick={() => router.push(`${lesson.id}/settings`)} className="settingsButton sideButton mr-10" > </div>
      </div>
      <Context.Provider value={{ router,updateLessons }}>
        <Section
          sectionId={sectionId}
          Sectionlessons={lessons}
          onReorderFunction={setLessons}
        />
      </Context.Provider>
    </div>
  );
}

async function order(e: []) {
  const a: number[] = [];
  e.forEach((element: any) => {
    a.push(element.id);
  });
  const response = await fetch("/api/admin/courses/lessons/sort", {
    method: "PUT",
    body: JSON.stringify(a),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function Section({ Sectionlessons, onReorderFunction, sectionId }: any) {
  return (
    <Reorder.Group
      className="border mx-4 rounded-xl flex flex-col p-5  text-gray-800  gap-7"
      axis="y"
      values={Sectionlessons}
      onReorder={(e) => {
        order(e);
        onReorderFunction(e);
      }}
    >
      {Sectionlessons.map((lesson: any) => (
        <LessonItem lesson={lesson} key={lesson.id} />
      ))}
      <div className="flex justify-left gap-4">
        <LessonDialog ParentSectionId={sectionId} />
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
      <Lesson lesson={lesson} />
    </Reorder.Item>
  );
}

export function Lesson({ lesson }: any) {
  let Icon;
  switch (lesson.type) {
    case "section":
      Icon = folder;
      break;
    case "text":
      Icon = text;
      break;
    case "video":
      Icon = video;
      break;
    case "quiz":
      Icon = quiz;
      break;
    case "file":
      Icon = download;
      break;
    case "pdf":
      Icon = pdf;
      break;
    case "image":
      Icon = img;
      break;
    default:
      Icon = folder; // Default to section icon if type is not specified
  }

  const context = useContext(Context);
  async function deleteLesson() {
      fetch(`/api/admin/courses/lessons/${lesson.id}`, {
        method: "DELETE",
      }).then((res) => {
        if (res.ok) {
            context?.updateLessons();
        } else {
          alert("Error");
        }
      });
  }

  function openLesson() {
    context?.router.push(`${lesson.id}`);
  }

  return (
    <div className="flex items-center w-full">
      <img className="w-12" src={Icon.src} alt="" />
      <h2 className="text-2xl font-bold ml-5">{lesson.title}</h2>
      <div className="ml-auto text-3xl flex gap-2 items-center">
      <div onClick={openLesson} className="editButton sideButton"/>
        <div onClick={deleteLesson} className="deleteButton sideButton"/>
      </div>
    </div>
  );
}

export function LessonDialog({ ParentSectionId }: any) {

  const context = useContext(Context);

  const createLesson = async (e: any, type: string) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title")?.toString()?.trim();
    const validTypes = [
      "section",
      "text",
      "video",
      "quiz",
      "image",
      "pdf",
      "file",
    ];

    if (!validTypes.includes(type) || !title)
      return alert("Choose a title and type");

    const ParentSectionId = formData.get("SectionId");

    const res = await fetch(`/api/admin/courses/lessons`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ title, ParentSectionId, type }),
    });
    if (!res.ok) alert("error");
    else {
      context?.updateLessons();
    }
  };

  const [type, setType] = useState("");
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
        <form onSubmit={(e) => createLesson(e, type)}>
          <div>
            <p className="mb-4">Enter Lesson Name</p>
            <Input placeholder="Title..." name="title" />
            <Input
              name="SectionId"
              className="hidden"
              value={ParentSectionId}
            />
          </div>
          <div>
            <p className="my-4">Choose Lesson Type</p>
            <Select onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder="Lesson Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="quiz">Quiz</SelectItem>
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="file">File</SelectItem>
              </SelectContent>
            </Select>
            <DialogClose className="ml-auto flex mt-5">
              <Button type="submit">Submit</Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}