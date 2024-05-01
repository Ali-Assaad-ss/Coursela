"use client";
import { useDropzone } from "react-dropzone";
import { FaFileUpload } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuFileArchive } from "react-icons/lu";
import {useCallback } from "react";
export default function Dropzone({url,setUrl,setFile,file,type}:any)
{
  const onDrop = useCallback((acceptedFiles: File[]) => {
    //if type is image set the url
    if(acceptedFiles[0].type.startsWith(type)!=false)
{
    setFile(acceptedFiles[0]);
    setUrl(URL.createObjectURL(acceptedFiles[0]));}
    else{alert("invalid file type")}
    console.log(acceptedFiles[0]);
  }, []);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return(
    <div>
      {url?(<div className="w-full items-center justify-center flex flex-col p-5 gap-5">
        {type=="image" &&<img src={url} alt="image" className="h-52"/>}
        {type=="video" &&<video src={url} className="h-52" controls/>}
        {type!="video"&&type!="image"&&<div className="flex flex-col items-center"><LuFileArchive className="text-2xl"/> {file?<p>{file.name}</p>:<p>{url}</p>} </div>}
         <FaRegTrashAlt className="cursor-pointer hover:text-red-800" onClick={() => {setUrl(null); setFile(null)}} /> </div>):(
                <div {...getRootProps()} className="p-5 flex flex-col items-center">
                <input {...getInputProps()} />
                <FaFileUpload className="m-4" />
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <p>Drag 'n' drop some files here, or click to select files</p>
                )}
              </div>
      )}

    </div>);
}