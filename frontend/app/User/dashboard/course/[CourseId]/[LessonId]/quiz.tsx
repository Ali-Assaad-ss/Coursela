export function QuizLesson() {

  let quiz={
    id:1,
    title:"Yoga Quiz",
    description:"Test your knowledge of the course material with this quiz. The quiz consists of multiple-choice and short-answer questions that cover the key concepts and practices of yoga. Take your time to carefully read each question and provide thoughtful responses. Good luck!",
    status:"new",
    questions:[
      {
        id: 1,
        type: "MCQ",
        MaxScore: 10,
        question: "What are the physical benefits of yoga?",
        options: [
          { id: 1, value: "Improved flexibility and strength" },
          { id: 2, value: "Enhanced mental clarity" },
          { id: 3, value: "Reduced stress and anxiety" },
          { id: 4, value: "All of the above" },
        ],
      },
      {
        id: 2,
        type: "MCQ",
        MaxScore: 10,
        question: "How does yoga promote emotional well-being?",
        options: [
          { id: 1, value: "By encouraging mindfulness and presence" },
          { id: 2, value: "By promoting physical fitness" },
          { id: 3, value: "By reducing circulation" },
          { id: 4, value: "By increasing chronic pain" },
        ],
      },
      {
        id: 4,
        type: "Subjective",
        MaxScore: 20,
        question: "What are some of the tools yoga offers for managing stress?",
      },
      {
        id: 5,
        type: "Subjective",
        MaxScore: 20,
        question: "What are some of the tools yoga offers for managing stress?",
      },
      {
        id: 6,
        type: "Subjective",
        MaxScore: 20,
        question: "What are some of the tools yoga offers for managing stress?",
      },
      {
        id: 7,
        type: "Subjective",
        MaxScore: 20,
        question: "What are some of the tools yoga offers for managing stress?",
      },
      {
        id: 8,
        type: "Subjective",
        MaxScore: 20,
        question: "What are some of the tools yoga offers for managing stress?",
      },
    ]
  }
  if (quiz.status === "pending" || quiz.status === "graded") {
    return (
      <div>
        <div className="text-2xl font-bold ml-2 my-4 ">{quiz.title}</div>
        <div className="ml-2"> <strong>Description: </strong><br />{quiz.description}</div>
        {quiz.status === "pending"&&<div className="ml-2 text-lg font-bold">Status: Solved waiting for Grade</div>}
        {quiz.status === "graded"&&<div className="ml-2 text-lg font-bold">Grade {}/100</div>}
      </div>
    );}

  return (
    <div>
      <div className="text-2xl font-bold ml-2 my-4 ">{quiz.title}</div>
      {quiz.questions.map((q, index) => {
        if (q.type === "Subjective") {
          return (
            <div>
              <div className="flex justify-between mx-2">
                <p className="font-bold text-lg"> Question {index + 1}:</p>{" "}
                <p>{q.MaxScore} Points</p>
              </div>

              <SubjectiveQuestion key={index} question={q} />
            </div>
          );
        } else if (q.type === "MCQ") {
          return (
            <div>
              <div className="flex justify-between mx-2">
                <p className="font-bold text-lg"> Question {index + 1}:</p>{" "}
                <p>{q.MaxScore} Points</p>
              </div>
              <MCQQuestion key={index} question={q} />
            </div>
          );
        }
      })}
      <Button className="flex ml-auto">Submit</Button>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

export function MCQQuestion({ question }) {
  return (
    <div className="ml-3 mb-5">
      <div className=" font-bold">{question.question}</div>
      <RadioGroup>
        {question.options.map((option) => {
          return (
            <div className="flex items-center space-x-3">
              <RadioGroupItem
                value={option.id}
                id={`${question.id}` + `${option.id}`}
              />
              <Label htmlFor={`${question.id}` + `${option.id}`}>
                {option.value}
              </Label>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
}

export function SubjectiveQuestion({ question }) {
  return (
    <div className="ml-3 mb-5">
      <div className="font-bold">{question.question}</div>
      <Textarea />
    </div>
  );
}
