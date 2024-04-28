"use client";
import { Button } from "@/components/ui/button";
import { getCookie } from "cookies-next";
import React from "react";

export default function page() {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    console.log(file);
    fetch("/api/file/product/2/image", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + getCookie("JWT"),
      },
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

  const [src, setSrc] = React.useState("");

  //get the file from the server and display it in the image tag
    const view = () => {
        fetch("/api/file/product/2/image", {
        headers: {
            Authorization: "Bearer " + getCookie("JWT"),
        },
        })
        .then((response) => {
            if (response.ok) {
            response.blob().then((blob) => {
                const url = URL.createObjectURL(blob);
                console.log(url);
                setSrc(url);
            });
            } else {
            console.error("File download failed");
            }
        });};



///video
const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    console.log(file);
    fetch("/api/file/product/2/video", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + getCookie("JWT"),
      },
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
        headers: {
            Authorization: "Bearer " + getCookie("JWT"),
        },
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
    <div>

    <div className="border bg-red-300">
      <input type="file" onChange={handleFileUpload} />
      <Button onClick={view}>view</Button>
      <img id="image" src={src} />
    </div>

        <div className="border bg-blue-300">
        <input type="file" onChange={handleVideoUpload} />
        <Button onClick={viewVideo}>view</Button>
        <video src="/api/file/product/2/video" controls preload="auto" autoPlay></video>
      </div>

      </div>
  );
}
