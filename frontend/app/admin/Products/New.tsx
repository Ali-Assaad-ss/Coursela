import React from "react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SiCoursera } from "react-icons/si";
import { CiFileOn } from "react-icons/ci";
import { TbLivePhoto } from "react-icons/tb";
import { RiBook3Line } from "react-icons/ri";

export default function New() {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button>New Product</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create a Product</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>Enter Product Name</AlertDialogDescription>
        <Input placeholder="Name"></Input>
        <AlertDialogDescription>Choose Product Type</AlertDialogDescription>
        <RadioGroup defaultValue="option-one" className="w-96 h-40">
          <div className="flex items-center space-x-2">
            <RadioGroupItem className="w-5 h-5" value="option-one" id="option-one" />
            <RiBook3Line className="text-blue-700 text-3xl" />
            <Label htmlFor="option-one">Course</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem className="w-5 h-5" value="option-two" id="option-two" />
            <CiFileOn className="text-yellow-700 text-3xl"/>
            <Label htmlFor="option-two">Digital Download</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem className="w-5 h-5" value="option-three" id="option-three" />
            <TbLivePhoto className="text-red-700 text-3xl"/>
            <Label htmlFor="option-three">Coaching / Live Session</Label>
          </div>
        </RadioGroup>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
