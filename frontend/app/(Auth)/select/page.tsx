"use client";
import { Button } from "@/components/ui/button";
import { MdOutlineEmail } from "react-icons/md";
import { useEffect, useState } from "react";
import Logo from "@/components/svg/Logo";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Component() {
  const router = useRouter();
  useEffect(() => {
    fetch("/api/admin/validate")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        if (data.includes("Admin")) {
          router.push("/admin/products");
        } else if (data.includes("User")) {
          router.push("/user/dashboard");
        }
      })
      .catch(() => console.log("not Signed in"));
  }, []);

  return (
    <div className="flex justify-center items-center h-full w-full drop-shadow-md">
      <div className="border w-[800px] h-[600px] relative">
        <div className="bg-blue-500 w-96 h-96 absolute -right-3 -top-3 -z-10 rounded-se-lg"></div>
        <div className="bg-blue-500 w-96 h-96 absolute -bottom-3 -left-3 -z-10 rounded-es-lg"></div>
        <Logo className="absolute h-16 top-6 left-1/2 -translate-x-1/2" />
        <div className="bg-white h-full flex flex-col  p-y-32 gap-x-10">
          <div className="flex">
            <div className="flex flex-col justify-center items-center p-10 text-center">
              <img
                width={300}
                src="https://img.freepik.com/free-vector/online-learning-seniors-abstract-concept-vector-illustration-online-courses-seniors-additional-education-free-online-program-learning-community-online-quizz-abstract-metaphor_335657-1439.jpg?t=st=1722324743~exp=1722328343~hmac=1f41d361b71cadbef80f64cf8827e915efe760b467809d6baf3289ffdc169563&w=740"
                alt="Online Learning"
              ></img>
              <h2 className="font-medium text-xl">Create Courses</h2>
              <p>Share your knowledge, shape the future!</p>
            </div>

            <div className="flex flex-col justify-center items-center p-10 text-center">
              <img
                width={300}
                src="https://img.freepik.com/free-vector/clever-man-student-standing-books-stack-with-flag-self-learning-personal-improvement-knowledge-obtaining_335657-3291.jpg?t=st=1722326250~exp=1722329850~hmac=74a0dc0fd6a075eb46f2bca19dc2395e8b2557b709b236e968c46bfaae5cf56e&w=740"
                alt="Online Learning"
              ></img>
              <h2 className="font-medium text-xl">Take Courses</h2>
              <p>Learn new skills, unlock new opportunities!</p>
            </div>
          </div>
          <div className="flex">
            <Link href="/login"  className="w-full m-5 text-white bg-blue-600 rounded-md p-3 text-center hover:bg-blue-700">
              Create Courses
            </Link>
            <Link href="/user/login" className="w-full m-5 text-white bg-blue-600 rounded-md p-3 text-center hover:bg-blue-700">
              Take Courses
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
