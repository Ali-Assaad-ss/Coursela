import { Button } from '@/components/ui/button'
import React from 'react'
export function FileLesson() {
    let lesson={
        id:1,
        title:"Excercises",
        name:"GROUP FITNESS Sept-November.xlsx",
        description:"You can use this excel file to see the number of sets and reps of each exercise",
        url:"https://www.beltonparks.org/DocumentCenter/View/2609/GROUP-FITNESS-Sept-November"
    }
  return (
    <div>
      <div className="ml-2">
      <div>
      <div className="text-2xl font-bold ml-2 my-4 ">{lesson.title}</div>
      <div className="ml-2">
        <strong>Description: </strong>
        <br />
        {lesson.description}
      </div>
      <div className="text-center border rounded-xl p-4 mt-5 flex gap-5 justify-between items-center">
        <p className='font-medium text-rose-900'>File : {lesson.name}</p>
        <Button asChild><a href={lesson.url} download>Download</a></Button>
      </div>
    </div>
      </div>
    </div>
  )
}
