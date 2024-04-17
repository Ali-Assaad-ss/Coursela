import React from "react";

export function VideoLesson() {
  let Lesson = {
    id: 1,
    title: "Introduction",
    description: "this is a video lesson about yoga",
    video:
      "https://videocdn.cdnpk.net/joy/content/video/free/video0466/large_preview/_import_614dc35067c838.25651357.mp4?filename=1109222_1080p_calm_quiet_1920x1080.mp4",
  };

  return (
    <div>
      <div className="text-2xl font-bold ml-2 my-4 ">{Lesson.title}</div>
      <video className="w-11/12 ml-2 my-3" controls>
        <source src={Lesson.video} />
      </video>
      <div className="ml-2">
        <strong>Description: </strong>
        <br />
        {Lesson.description}
      </div>
    </div>
  );
}
