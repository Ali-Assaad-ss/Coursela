"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { IoIosAdd } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Mcq, Subj } from "./questions";

import { Reorder } from "framer-motion";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

async function order(e: []) {
  const a: number[] = [];
  e.forEach((element: any) => {
    a.push(element.id);
  });
  const response = await fetch("/api/admin/courses/lessons/quiz/sort", {
    method: "PUT",
    body: JSON.stringify(a),
    headers: {
      "Content-Type": "application/json",
    },
  });
}


export default function QuizPage({ lesson }) {

  const [title, setTitle] = useState(lesson.title);
  const [visibility, setVisibility] = useState(lesson.visibility);
  const [questions, setQuestions] = useState(lesson.quiz.questions);
  const [description, setDescription] = useState(lesson.description);
  

  async function saveQuiz() {
    const response = await fetch(`/api/admin/courses/lessons/${lesson.id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: title,
        visibility: visibility,
        description: description,
        content:"",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      alert("saved");
    } else {
      alert("error");
    }
  };

  const deleteQuestion = async (id: number, method: string) => {
    if (method == "POST") {
      const modifiedQuestions = questions.filter((x: any) => x.id != id);
      setQuestions(modifiedQuestions);
      return;
    }
    const response = await fetch(
      `/api/admin/courses/lessons/quiz/question/${id}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      alert("deleted");
      const modifiedQuestions = questions.filter((x: any) => x.id != id);
      setQuestions(modifiedQuestions);
    } else alert("error");
  };

  return (
    <>
      <h1 className="text-2xl font-bold m-5 mt-7 ml-10">Quiz</h1>
      <div className="flex flex-col p-16 gap-10 border rounded-xl mx-10">
        <div className="flex">
          <p className="text-xl">Title</p>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-[80%] ml-auto"
            placeholder="Enter Title"
          ></Input>
        </div>
        <div className="flex">
          <p className="text-xl">Description</p>
          <Textarea
            onChange={(e) => setDescription(e.target.value)}
            className="w-[80%] ml-auto h-56"
            placeholder="Enter the Description here"
            value={description}
          />
        </div>
        <Reorder.Group
          axis="y"
          values={questions}
          onReorder={(e) => {
            order(e);
            setQuestions(e);
          }}
        >
          {questions.map((item: any) => (
            <Reorder.Item key={item.id} value={item}>
              {item.questionType == "mcq" ? (
                <Mcq
                  quizId={lesson.quizId}
                  question={item}
                  del={deleteQuestion}
                />
              ) : (
                <Subj
                  quizId={lesson.quizId}
                  question={item}
                  del={deleteQuestion}
                />
              )}
            </Reorder.Item>
          ))}
        </Reorder.Group>

        <DropdownMenu>
          <DropdownMenuTrigger className="ml-auto flex items-center hover:text-gray-500 hover:border-gray-500">
            <IoIosAdd className="border border-gray-800 rounded-sm text-3xl mr-3" />
            Add Question
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Question Type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                const modifiedQuestions = [
                  ...questions,
                  { questionType: "mcq", method: "POST", id: Math.random() },
                ];
                console.log(modifiedQuestions);
                setQuestions(modifiedQuestions);
              }}
            >
              MCQ
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                const modifiedQuestions = [
                  ...questions,
                  { questionType: "subjective", method: "POST",id: Math.random() },
                ];
                console.log(modifiedQuestions);
                setQuestions(modifiedQuestions);
              }}
            >
              Subjective
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex items-start">
          <p className="text-xl ">Visibility</p>
          <RadioGroup
            defaultValue={visibility}
            onValueChange={(e) => setVisibility(e)}
            className="w-[80%] ml-auto"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="members" id="members" />
              <Label htmlFor="members">Members</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="everyone" id="everyone" />
              <Label htmlFor="everyone">Everyone (Preview)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="hidden" id="hidden" />
              <Label htmlFor="hidden">Hidden</Label>
            </div>
          </RadioGroup>
        </div>
        <Button className="ml-auto px-10" onClick={saveQuiz}>Save</Button>
      </div>
    </>
  );
}
