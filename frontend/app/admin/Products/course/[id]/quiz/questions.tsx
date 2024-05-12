"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import React, { FormEvent, useEffect, useState } from "react";
import { CiTrash } from "react-icons/ci";
import { IoIosAdd } from "react-icons/io";
import { MdOutlineDelete } from "react-icons/md";
export function Mcq({ quizId, question }: any) {
  const[url,setUrl]=useState("");
  const [method, setMethod] = useState(question.method);

  useEffect(() => {
    if (!method) {
      setMethod("PUT");
      setUrl (`/api/admin/courses/lessons/quiz/question/${question.id}`);
      console.log(url,"put");
    } else {
      setMethod("POST");
      setUrl (`/api/admin/courses/lessons/quiz/${quizId}/question`)
      console.log(url,"post");
    }
  }, []);

  const [correctResponse, setCorrectResponse] = useState(
    question.correctResponse
  );
  if (!question.choices) question.choices = [];
  const [choices, setChoices] = useState<string[]>(question.choices);
  const [content, setContent] = useState(question.content);
  const [maxScore, setMaxScore] = useState(question.maxScore);

  const addMcq = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    let responses = formData.getAll("responses");
    if (responses.some((x) => !x.toString())) {
      alert("Fill all options");
      return;
    }
    if ((!correctResponse)||!(choices.includes(correctResponse))) {
      alert("select the correct option");
      return;
    }
    if (responses.length < 2) {
      alert("add atleast 2 options");
      return;
    }
    if (!content) {
      alert("enter a question");
      return;
    }
    if (!maxScore) {
      alert("enter a score");
      return;
    }

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctResponse,
        maxScore,
        content,
        QuestionType: "mcq",
        Choices: responses,
      }),
    });
    if (response.ok) {
      setMethod("PUT");
      alert("saved");
    } else alert("error");
  };

  const deleteQuestion=async()=>{+
    
    if (response.ok) {
      alert("deleted");
    } else alert("error");
  }

  return (
    <form onSubmit={(e) => addMcq(e)}>
      <div className="MCQ border p-7 rounded-xl mb-5">
        <div className="flex justify-between"><CiTrash className="size-6" onClick={deleteQuestion} /> <ScoreInput maxScore={maxScore} setMaxScore={setMaxScore} /></div>
        
        <div className=" flex">
          <div className="flex-1">
            <p className="text-xl pb-3">MCQ</p>
            <Textarea
              name="content"
              className="h-36"
              placeholder="Enter the Question here"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="pl-5">
            <p className="text-xl pb-3">Add Response</p>
            <RadioGroup onValueChange={(e) => setCorrectResponse(e)}>
              {choices.map((x, i) => (
                <MCQOption
                  setMcqOptions={setChoices}
                  McqOptions={choices}
                  l={String.fromCharCode(65 + i)}
                  value={x}
                  i={i}
                  key={i}
                  correctResponse={correctResponse}
                />
              ))}
            </RadioGroup>
            <IoIosAdd
              onClick={() => setChoices([...choices, ""])}
              className="border border-gray-600 rounded-sm text-3xl ml-auto flex items-center hover:text-gray-500 hover:border-gray-500 mt-3"
            />
          </div>
        </div>
        <Button className="ml-auto mt-7 flex w-48" type="submit">
          Save
        </Button>
      </div>
    </form>
  );
}

function MCQOption(props: any) {
  return (
    <div className="flex items-center space-x-2">
      <RadioGroupItem
        value={props.value}
        checked={props.value === props.correctResponse ? true : false}
      />
      <Label>{props.l}</Label>
      <Input
        name="responses"
        value={props.value}
        onChange={(e) => {
          const updatedOptions = [...props.McqOptions];
          updatedOptions[props.i] = e.target.value;
          props.setMcqOptions(updatedOptions);
        }}
      />
      <MdOutlineDelete
        onClick={() => {
          const updatedOptions = props.McqOptions.filter(
            (item) => item !== props.value
          );
          props.setMcqOptions(updatedOptions);
        }}
        className="text-3xl text-gray-600 hover:text-red-600 hover:cursor-pointer"
      />
    </div>
  );
}

function ScoreInput({ maxScore, setMaxScore }: any) {
  return (
    <div className="ml-auto w-11 h-11 flex flex-col items-center">
      <Input
        value={maxScore}
        onChange={(e) => setMaxScore(e.target.value)}
        className="w-11 h-10"
        placeholder=""
      ></Input>
      <p className="text-gray-500 text-xs">score</p>
    </div>
  );
}

export function Subj({ quizId, question }: any) {
  const [content, setContent] = useState(question.content);
  const [maxScore, setMaxScore] = useState(question.maxScore);
  const [method, setMethod] = useState(question.method);
  const[url,setUrl]=useState("");
  useEffect(() => {
    if (!method) {
      setMethod("PUT");
      setUrl( `/api/admin/courses/lessons/quiz/question/${question.id}`);
    } else {
      setMethod("POST");
      setUrl(`/api/admin/courses/lessons/quiz/${quizId}/question`);
    }
  }, []);

  const addSub = async (e: FormEvent) => {
    e.preventDefault();
    const response = await fetch(
      url,
      {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ maxScore, content, QuestionType: "subjective" }),
      }
    );
    if (response.ok) {
      setMethod("PUT");
      let data=await response.json();
      question.id=data.id;
      setUrl( `/api/admin/courses/lessons/quiz/question/${question.id}`);
      alert("saved");
    } else alert("error");
  };

  return (
    <form onSubmit={addSub}>
      <div className="border p-7 rounded-xl mb-5">
        <ScoreInput maxScore={maxScore} setMaxScore={setMaxScore} />
        <p className="text-xl mb-3">Subjective</p>
        <Textarea
          name="content"
          className="h-36"
          placeholder="Enter the Question here"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button className="ml-auto mt-7 flex w-48" type="submit">
          Save
        </Button>
      </div>
    </form>
  );
}
