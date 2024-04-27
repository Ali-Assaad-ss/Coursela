"use client";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CiFileOn } from "react-icons/ci";
import { TbLivePhoto } from "react-icons/tb";
import { RiBook3Line } from "react-icons/ri";
import { CiSquarePlus } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { getCookie  } from 'cookies-next';
import { useRouter } from "next/navigation";

export default function New({products,setProducts}:any) {
  const router=useRouter();

  const createProduct = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const type = formData.get("type");
    const name = formData.get("name");
    let url = "/api/admin/product";
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie('JWT'),
      },
      method: "POST",
      body: JSON.stringify({ name, type }),
    }).then((res) => {
      if (res.ok) {
        //print the response data
        res.json().then((data) => {
          console.log(data)
          setProducts([...products,data])
        });
        // res.json().then((data) =>{router.push(`/admin/${data.type}/${data.id}`)});
      } else {
        alert("Error");
      }
    })
    ;

  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="py-7 mb-5">
          <CiSquarePlus className="inline text-3xl" /> New Product
          </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form onSubmit={createProduct}>
        <AlertDialogHeader>
          <AlertDialogTitle>Create a Product</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>Enter Product Name</AlertDialogDescription>
        <Input name="name" placeholder="Name"></Input>
        <AlertDialogDescription>Choose Product Type</AlertDialogDescription>
        <RadioGroup name="type" defaultValue="Course" className="w-96 h-40" >
          <div className="flex items-center space-x-2">
            <RadioGroupItem className="w-5 h-5" value="Course" id="Course" />
            <RiBook3Line className="text-blue-700 text-3xl" />
            <Label htmlFor="Course">Course</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem className="w-5 h-5" value="DigitalDownload" id="DigitalDownload"/>
            <CiFileOn className="text-yellow-700 text-3xl"/>
            <Label htmlFor="DigitalDownload">Digital Download</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem className="w-5 h-5" value="Coaching" id="Coaching"/>
            <TbLivePhoto className="text-red-700 text-3xl"/>
            <Label htmlFor="Coaching">Coaching / Live Session</Label>
          </div>
        </RadioGroup>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction type="submit">Continue</AlertDialogAction>
        </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
