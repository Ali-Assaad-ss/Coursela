import React from "react";
import { Progress } from "@/components/ui/progress";
import { MdMissedVideoCall } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { IoIosSearch } from "react-icons/io";
import { SiCoursera } from "react-icons/si";
import { IoDownload } from "react-icons/io5";
export default function page() {
  let courses = [
    {
      id: 1,
      title: "Yoga Course",
      instructor: "John Doe",
      rating: 4,
      progress: 26,
      total: 50,
      image:
        "https://akm-img-a-in.tosshub.com/indiatoday/sunsetyoga-2_647_062115121022.jpg?size=690:388",
      type: "course",
    },
    {
      id: 2,
      title: "Power of Yoga Ebook",
      instructor: "John Doe",
      rating: 4,
      image:
        "https://i0.wp.com/humankinetics.me/wp-content/uploads/2019/01/Power-Yoga-book.jpg?resize=960%2C640&ssl=1",
      type: "ebook",
    },
    {
      id: 3,
      title: "Yoga Session",
      instructor: "John Doe",
      rating: 4,
      date: "Tue 12:30 pm 10/24",
      image:
        "https://kripalu.org/sites/default/files/2_960x423_Dec19_Practice_01dh-2.jpg",
      type: "session",
    },
    {
        id: 4,
        title: "Basics of videography",
        instructor: "Shawn Foulks",
        rating: 1,
        progress: 12,
        total: 50,
        image:
            "https://cc-prod.scene7.com/is/image/CCProdAuthor/what-is-videography_P1_900x420?$pjpeg$&jpegSize=200&wid=900",
        type: "course",
        },
        {
        id: 5,
        title: "Power of Yoga Ebook",
        instructor: "John Doe",
        rating: 4,
        image:
            "https://i0.wp.com/humankinetics.me/wp-content/uploads/2019/01/Power-Yoga-book.jpg?resize=960%2C640&ssl=1",
        type: "ebook",
        },
        {
        id: 6,
        title: "Yoga Session",
        instructor: "John Doe",
        rating: 4,
        date: "Tue 12:30 pm 10/24",
        image:
            "https://i0.wp.com/humankinetics.me/wp-content/uploads/2019/01/Power-Yoga-book.jpg?resize=960%2C640&ssl=1",
        type: "session",
    }
  ];
  return (
    <div className="pl-7">
      <h1 className="text-2xl font-medium pl-7">My Courses</h1>
      <div className="w-1/2 mx-auto mt-5 relative">
        <IoIosSearch className="absolute right-1 top-1 text-3xl text-gray-500 " />
        <Input placeholder="Search courses..."></Input>
      </div>

      <div className="flex flex-wrap">
        {courses.map((course) => {
          if (course.type === "course") {
            return <Course key={course.id} {...course} />;
          } else if (course.type === "ebook") {
            return <DigitalDownload key={course.id} {...course} />;
          } else if (course.type === "session") {
            return <LiveSession key={course.id} {...course} />;
          }
        })}
      </div>
    </div>
  );
}

function Course({ title, instructor, rating, progress, total, image }) {
  return (
    <div className="size-60 p-1 border shadow-xl rounded-lg mr-10 mt-16 hover:size-64 transition-all cursor-pointer">
      <img
        className="rounded-t-xl object-cover rounded-b -mt-3 w-[96%] h-[55%] mx-auto drop-shadow-xl"
        src={image}
      />
      <div className="p-2 flex flex-col gap-1">
        <div className="text-lg font-bold">{title}</div>
        <Progress
          className="h-1 bg-slate-300"
          value={(progress / total) * 100}
        />
        <p className="text-xs text-blue-400">
          {progress}/{total} Lessons Completed
        </p>
        <div className="text-sm text-slate-700">Instructor: {instructor}</div>

        <div>
          <div className="flex justify-between items-center">
            <div className="flex">
              {[...Array(rating)].map((_, index) => (
                <FaStar key={index} className="fill-yellow-500" />
              ))}
              {[...Array(5 - rating)].map((_, index) => (
                <FaStar key={index} className="fill-gray-300" />
              ))}
            </div>
            <SiCoursera />
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
function DigitalDownload({title, instructor, rating, image}) {
  return (
    <div className="size-60 p-1 border shadow-xl rounded-lg mr-10 mt-16 hover:size-64 transition-all cursor-pointer">
      <img
        className="rounded-t-xl rounded-b -mt-3 w-[96%] object-cover h-3/5 mx-auto drop-shadow-xl"
        src={image}
      />
      <div className="p-2 flex flex-col gap-1">
        <div className="text-lg font-bold">{title}</div>
        <div className="text-sm text-slate-700">By {instructor}</div>

        <div>
          <div className="flex justify-between items-center">
          <div className="flex">
              {[...Array(rating)].map((_, index) => (
                <FaStar key={index} className="fill-yellow-500" />
              ))}
              {[...Array(5 - rating)].map((_, index) => (
                <FaStar key={index} className="fill-gray-300" />
              ))}
            </div>
            <IoDownload className="size-5" />
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
function LiveSession({ title, instructor, date,image}) {
  return (
    <div className="size-60 p-1 border shadow-xl rounded-lg mr-10 mt-16 hover:size-64 transition-all cursor-pointer">
      <img
        className="rounded-t-xl rounded-b -mt-3 w-[96%] object-cover h-3/5 mx-auto drop-shadow-xl"
        src={image}
        alt=""
      />
      <div className="p-2 flex flex-col gap-1">
        <div className="text-lg font-bold">{title}</div>
        <div className="text-sm text-slate-700">With {instructor}</div>

        <div>
          <div className="flex justify-between items-center">
            <div className="border text-xs p-1 rounded-md">
              {date}
            </div>
            <MdMissedVideoCall className="size-5" />
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
