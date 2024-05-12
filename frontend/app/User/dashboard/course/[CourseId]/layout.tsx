import React from "react";
import { BsFolderSymlink } from "react-icons/bs";
import { LiaFileDownloadSolid } from "react-icons/lia";
import { FaRegFilePdf } from "react-icons/fa6";
import { IoImageOutline } from "react-icons/io5";
import { CiText } from "react-icons/ci";
import { LuFileQuestion } from "react-icons/lu";
import { MdOndemandVideo } from "react-icons/md";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { ScrollArea } from "@/components/ui/scroll-area";

export default function page({ children }) {
  let lessons = [
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
      type: "PDF",
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
  ];

  let course = {
    title: "Harmony Flow Yoga Course",
    description: "This is a course",
    lessons: lessons,
  };

  return (
    <div className="flex gap-10 h-full p-3">
      <div className="flex-[25%] border-r-4">
        <div className="text-lg font-bold text-center mt-3 px-2">{course.title}</div>
        <ScrollArea className="h-5/6">
          {course.lessons.map((lesson) => {
            return <Lesson lesson={lesson} />;
          })}
        </ScrollArea>
      </div>
      <ScrollArea className="flex-[75%] overflow-auto h-full pr-4">
        <Breadcrumb className="ml-2 mb-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Harmony Flow...</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="rounded-xl">{children}</div>
      </ScrollArea>
    </div>
  );
}

export function Lesson({lesson}) {
  let Icon;
  switch (lesson.type) {
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
      Icon = LiaFileDownloadSolid;
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
  if (lesson.type == "Section") {
    return (
      <Collapsible>
        <CollapsibleTrigger className="w-full -my-3">
          <div className="flex items-center my-4 mx-3 hover:bg-slate-100 cursor-pointer rounded select-none">
            <Icon className="bg-slate-100 text-black text-4xl p-2 rounded-md" />
            <h2 className=" font-bold ml-5">{lesson.name}</h2>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="border-l">
            {lesson.lessons.map((lesson) => {
                return <div className="text-sm pl-5">
                    <Lesson lesson={lesson} />
                </div>
            })}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <div className="flex items-center my-4 mx-3 hover:bg-slate-100 cursor-pointer rounded select-none">
      <Icon className="bg-slate-100 text-black text-4xl p-2 rounded-md" />
      <h2 className=" font-bold ml-5">{lesson.name}</h2>
    </div>
  );
}
