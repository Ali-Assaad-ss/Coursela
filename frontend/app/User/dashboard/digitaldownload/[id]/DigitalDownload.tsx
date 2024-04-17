import { Button } from "@/components/ui/button";
import React from "react";
import { FaFileAlt } from "react-icons/fa";

export default function DigitalDownload() {
  let lesson = {
    id: 1,
    title: "Power of Yoga Ebook",
    name: "GROUP FITNESS Sept-November.xlsx",
    description:
      "You can utilize this Excel spreadsheet to track the number of sets and repetitions for each exercise. Simply input your data into the designated columns, and the spreadsheet will calculate totals and averages automatically. This tool can help you monitor your progress and stay organized with your workout routine.",
    image:
      "https://i0.wp.com/humankinetics.me/wp-content/uploads/2019/01/Power-Yoga-book.jpg?resize=960%2C640&ssl=1",
    url: "https://www.beltonparks.org/DocumentCenter/View/2609/GROUP-FITNESS-Sept-November",
  };
  return (
    <div className="px-10 lg:flex">
      <div className="mr-7 max-w-lg">
        <div className="text-2xl font-bold mx-auto text-center">
          {lesson.title}
        </div>
        <img
          className="rounded-md mx-auto my-7"
          src={lesson.image}
          alt=""
          
        />
      </div>
      <div className="flex flex-col mb-10 justify-between pt-20 max-w-lg">
        <div className="ml-2">
          <strong>Description: </strong>
          <br />
          {lesson.description}
        </div>
        <div className="text-center border rounded-xl p-4 mt-5 flex gap-5 justify-between items-center">
          <p className="font-medium text-rose-900">File : {lesson.name}</p>
          <Button asChild>
            <a href={lesson.url} download>
              <FaFileAlt className="mr-1" />
              Download Your File
            </a>
          </Button>
        </div></div>
      </div>
  );
}
