import { Ratings } from "@/components/component/rating/Rating";
import { Button } from "@/components/ui/button";
import React from "react";

export default function page() {

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
      id: 7,
      name: "Chapter 2",
      type: "Section",
      isChild: true,
      lessons: [
        { id: 1, name: "Introduction", type: "Text" },
        { id: 2, name: "First Quiz", type: "Quiz" },
      ],
    },
    {
      id: 6,
      name: "Tutorial",
      type: "File",
    },
  ];

  let course = {
    id: 1,
    admin: "John Doe",
    rating: 4.5,
    ratingCount: 165,
    memberCount: 1465,
    price: 29.99,
    title: "Yoga Course",
    name: "GROUP FITNESS Sept-November.xlsx",
    description:
      "Embark on a transformative journey of self-discovery and holistic wellness with our Harmony Flow Yoga Course. This comprehensive program is designed to nourish your mind, body, and spirit through the ancient practice of yoga. Guided by experienced instructors, you'll explore a variety of yoga styles, including Vinyasa, Hatha, and Restorative, allowing you to find the perfect balance for your unique needs.",
    image:
      "https://byootee.biz/wp-content/uploads/2022/08/couples-yoga.jpg",
    lessons:lessons,
  };
  return (
    <div className="px-10 my-20">
      <div className="lg:flex ">
        <div className="mr-7 max-w-lg">
          <div className="text-2xl font-bold mx-auto text-center">
            {course.title}
          </div>
          <img className="rounded-md mx-auto my-7" src={course.image} alt="" />
        </div>
        <div className="flex flex-col mb-10 justify-between pt-20 max-w-lg">
          <div className="ml-2 mb-3">
            <p className="font-bold text-4xl mb-5">{course.price}$</p>
            <strong>Description: </strong>
            <br />
            {course.description}
          </div>
          <Button>Buy Now</Button>
        </div>
        <div></div>
      </div>
      <p>
        Created by <strong>{course.admin}</strong>
      </p>
      <span className="flex gap-3">
        Rated<strong>{course.rating}</strong>{" "}
        <Ratings variant="yellow" rating={course.rating} /> by{" "}
        {course.ratingCount} users ({course.memberCount} total members)
      </span>
      <Layout course={course}/>
    </div>
  );
}

import { BsFolderSymlink } from "react-icons/bs";
import { LiaFileDownloadSolid } from "react-icons/lia";
import { FaRegFilePdf } from "react-icons/fa6";
import { IoImageOutline } from "react-icons/io5";
import { CiText } from "react-icons/ci";
import { LuFileQuestion } from "react-icons/lu";
import { MdOndemandVideo } from "react-icons/md";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { ScrollArea } from "@/components/ui/scroll-area";

export function Layout({course}) {
  return (
    <div>
        <ScrollArea className="h-5/6 w-[500px] border rounded-md mx-auto mt-10">
        <div className="text-lg font-bold mt-3 text-center">Course Preview</div>
          {course.lessons.map((lesson) => {
            return <Lesson lesson={lesson} />;
          })}
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
          <div className="flex items-center my-4 mx-3 hover:bg-slate-100 bg-slate-50 cursor-pointer rounded select-none">
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
    <div className="flex items-center my-4 mx-3 hover:bg-slate-100 bg-slate-50  cursor-pointer rounded select-none">
      <Icon className="bg-slate-100 text-black text-4xl p-2 rounded-md" />
      <h2 className=" font-bold ml-5">{lesson.name}</h2>
    </div>
  );
}