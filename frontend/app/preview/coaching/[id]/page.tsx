import { DatePickerDemo } from "@/app/admin/products/coaching/[id]/date";
import { Interval } from "@/app/admin/products/coaching/[id]/page";
import { Ratings } from "@/components/component/rating/Rating";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import React from "react";

export default function page() {
  let lesson = {
    id: 1,
    admin:"John Doe",
    rating:3.8,
    ratingCount: 165,
    memberCount: 1465,
    price:29.99,
    title: "One hour yoga session",
    name: "GROUP FITNESS Sept-November.xlsx",
    description:
      "You can utilize this Excel spreadsheet to track the number of sets and repetitions for each exercise. Simply input your data into the designated columns, and the spreadsheet will calculate totals and averages automatically. This tool can help you monitor your progress and stay organized with your workout routine.",
    image:
      "https://blog-images-1.pharmeasy.in/blog/production/wp-content/uploads/2021/02/01200417/shutterstock_324427688-1-1024x683.jpg",
  };
  return (
    <div className="px-10 my-20">
    <div className="lg:flex ">
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
          
          <p className="font-bold text-4xl mb-5">{lesson.price}$</p>
          <strong>Description: </strong>
          <br />
          {lesson.description}
        </div>
        <div className="text-center border rounded-xl p-4 mt-5 flex gap-5 justify-between items-center">
            <DatePickerDemo/> 
            <input className="border rounded-md p-2" type="time" />
          <Button>
            Book Now
          </Button>
        </div></div>
        <div></div>
      </div>
      <p>With <strong>{lesson.admin}</strong></p>
      <span className="flex gap-3">Rated<strong>{lesson.rating}</strong> <Ratings variant="yellow" rating={lesson.rating}/> by {lesson.ratingCount} users ({lesson.memberCount} total members)</span>
      

      </div>
  );
}
