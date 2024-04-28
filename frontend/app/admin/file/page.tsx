"use client";
import { Button } from "@/components/ui/button";
import { getCookie } from "cookies-next";
import React from "react";

export default function page() {

///video
const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    console.log(file);
    fetch("/api/file/product/2/video", {
      method: "POST",
      body: formData,
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          console.log(data);
        });
      } else {
        console.error("File upload failed");
      }
    });
  };

  const [videoSrc, setVideoSrc] = React.useState("");

  //get the file from the server and display it in the image tag
    const viewVideo = () => {
        fetch("/api/file/product/2/video", {
        })
        .then((response) => {
            if (response.ok) {
            response.blob().then((blob) => {
                const url = URL.createObjectURL(blob);
                console.log(url);
                setVideoSrc(url);
            });
            } else {
            console.error("File download failed");
            }
        });};


  return (

        <div className="border bg-blue-300">
        <input type="file" onChange={handleVideoUpload} />
        <Button onClick={viewVideo}>view</Button>
        <video src="/api/file/product/2/video" controls preload="auto" autoPlay></video>
      </div>
  );
}
