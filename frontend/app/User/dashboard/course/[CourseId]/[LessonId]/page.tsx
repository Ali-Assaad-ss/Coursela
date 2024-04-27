import React from "react";
import { QuizLesson } from "./quiz";
import { TextLesson } from "./text";
import { VideoLesson } from "./video";
import { ImageLesson } from "./image";
import { PdfLesson } from "./pdf";
import {FileLesson} from "./DigitalDownload";

export default function page() {
  return <QuizLesson />;
}
