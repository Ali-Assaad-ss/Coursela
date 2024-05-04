import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { IoIosAdd } from "react-icons/io";
import { MdOutlineDelete } from "react-icons/md";

export function NewMcq({}) {
  return (
    <div className="MCQ border p-7 rounded-xl mb-5">
      <ScoreInput />
      <div className=" flex">
        <div className="flex-1">
          <p className="text-xl pb-3">MCQ</p>
          <Textarea className="h-36" placeholder="Enter the Question here" />
        </div>
        <div className="pl-5">
          <p className="text-xl pb-3">Add Response</p>
          <RadioGroup defaultValue="option-one">
            <MCQOption i="A" />
            <MCQOption i="B" />
            <MCQOption i="C" />
          </RadioGroup>
          <IoIosAdd className="border border-gray-600 rounded-sm text-3xl ml-auto flex items-center hover:text-gray-500 hover:border-gray-500 mt-3" />
        </div>
      </div>
      <Button className="ml-auto mt-7 flex w-48">Save</Button>
    </div>
  );
}

function MCQOption(props: any) {
  return (
    <div className="flex items-center space-x-2">
      <RadioGroupItem value={props.i} id={`option-${props.i}`} />
      <Label htmlFor={`option-${props.i}`}>{props.i}</Label>
      <Input></Input>
      <MdOutlineDelete className="text-3xl text-gray-600 hover:text-red-600 hover:cursor-pointer" />
    </div>
  );
}

function ScoreInput({}) {
  return (
    <div className="ml-auto w-11 h-11 flex flex-col items-center">
      <Input className="w-10 h-10" placeholder=""></Input>
      <p className="text-gray-500 text-xs">score</p>
    </div>
  );
}

export function NewSubj({}) {
  return (
    <div className="border p-7 rounded-xl mb-5">
      <ScoreInput />
      <p className="text-xl mb-3">Subjective</p>
      <Textarea className="h-56" placeholder="Enter the Question here" />
      <Button className="ml-auto mt-7 flex w-48">Save</Button>
    </div>
  );
}
