import React from 'react'

export function PdfLesson() {
    let lesson = {
        id: 4,
        title: "Tutorial",
        description: "This is a pdf lesson about yoga",
        pdf: "https://hr.umich.edu/sites/default/files/yoga.pdf",
    };
  return (
    <div>
      <div className="text-2xl font-bold ml-2 my-4 ">{lesson.title}</div>
      <div className="ml-2">
        <strong>Description: </strong>
        <br />
        {lesson.description}
      </div>
      <div className="ml-2">
        <iframe src={lesson.pdf} width="100%" height="550px"></iframe>
      </div>
    </div>
  )
}
