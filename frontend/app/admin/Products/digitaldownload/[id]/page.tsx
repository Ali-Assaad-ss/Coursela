"use client";
import { Input } from "@/components/ui/input";
import{useCallback, useEffect, useState} from "react";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import Dropzone from "@/components/component/Dropzone/Dropzone";

export default function page({params}:{params:{id:string}}) {

  const [iUrl, setIUrl] = useState<string | null>(null);
  const [iFile, setIFile] = useState<File | null>(null);
  const [dUrl, setDUrl] = useState<string | null>(null);
  const [dFile, setDFile] = useState<File | null>(null);
  async function save(e:any) {
    e.preventDefault();
    const formData = new FormData(e.target);
    let title= formData.get("title");
    let description = formData.get("description");
    let visibility = formData.get("visibility")?true:false;
    let price = Number(formData.get("price"));
    let limit = Number(formData.get("limit"));
    if(iUrl==null){
      alert("Please upload an image");
      return;
    }
    if(dUrl==null){
      alert("Please upload a file");
      return;
    }
    if(iUrl.includes("blob")){
      const formData = new FormData();
      iFile && formData.append("file", iFile);
      const response = await fetch(`/api/file/product/${params.id}/image`, {
        method: "POST",
        body:formData,
      });
      if (!response.ok) {
        alert("bad image");
        return;
      }
    }
    if(dUrl.includes("blob")){
      const formData = new FormData();
      dFile && formData.append("file", dFile);
      const response = await fetch(`/api/file/product/${params.id}/file`, {
        method: "POST",
        body:formData,
      });
      if (!response.ok) {
        alert("Error");
        return;
      }
    }

      const response = await fetch(`/api/admin/digitaldownload/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, visibility, price, limit}),
      });
      if (response.ok) {
        alert("Saved");
      } else {
        alert("Error");
      }
  }
//load the data on page load using useEffect



type DigitalDownload = {
  id: number;
  name: string;
  description: string;
  visibility: boolean;
  price: number;
  limit: number;
  image: boolean;
  url: string;
};
const initialDigitalDownload: DigitalDownload = {
  id:0,
  name: '',
  description: '',
  visibility: false,
  price: 0,
  limit: 0,
  image: false,
  url:""

};
 const [digitaldownload, setDigitaldownload] = useState<DigitalDownload>(initialDigitalDownload);

  async function load() {
    const response = await fetch(`/api/admin/digitaldownload/${params.id}`
    );
    if (response.ok) {
      const data = await response.json();
      setDigitaldownload(data);
      if (data.image) {
        setIUrl(`/api/file/product/${params.id}/image`);
      }
      if (data.fileName) {
        setDUrl(data.fileName);
      }
    } else {
      alert("Error");
    }
  }
  useEffect(() => {
    load();
  }, []);

  return (
    <form onSubmit={save} >
      <h1 className="text-2xl font-bold m-5 mt-7 ml-10">Digital Download</h1>
      <div className="flex flex-col p-16 gap-10 border rounded-xl mx-10">
        <div className="flex">
          <p className="text-xl">Title</p>
          <Input value={digitaldownload.name} onChange={(e)=>{
            const modifiedUser = { ...digitaldownload, name: e.target.value };
            setDigitaldownload(modifiedUser)}
            } className="w-[80%] ml-auto" placeholder="Enter Title" name="title" required/>
        </div>

        <div className="flex">
          <p className="text-xl">Description</p>
          <Textarea value={digitaldownload.description}
            className="w-[80%] ml-auto h-56"
            placeholder="Enter the Description here"
            name="description"
            required
          />
        </div>
        <div className="flex">
          <p className="text-xl">Image</p>
          <div className="border rounded-xl pb-5 w-[80%] ml-auto">
            <p className="border-4 rounded-t-xl text-center">Image</p>
            <Dropzone url={iUrl} setUrl={setIUrl} file={iFile} setFile={setIFile} type="image"/>
          </div>
        </div>
        <div className="flex">
          <p className="text-xl">Download File</p>
          
          <div className="border rounded-xl pb-5 w-[80%] ml-auto">
            <p className="border-4 rounded-t-xl text-center">File</p>
          <Dropzone url={dUrl} setUrl={setDUrl} file={dFile} setFile={setDFile} type=""/>
          </div>
        </div>
        <div className="flex gap-10 text-xl">
        Visibility <Switch name="visibility" checked={digitaldownload.visibility} onClick={()=>{
          const modifiedUser = { ...digitaldownload, visibility:!digitaldownload.visibility };
          setDigitaldownload(modifiedUser)}}/>
        </div>
        <div className="flex gap-2 text-xl items-center">
          Price:<Input value={digitaldownload.price} className="w-16" name="price" required/>$
        </div>
        <div className="flex gap-2 text-xl items-center">
          Limit:<Input value={digitaldownload.limit} onChange={(e)=>{
            const modifiedUser = { ...digitaldownload, limit: Number(e.target.value) };
            setDigitaldownload(modifiedUser)
          }}
          className="w-16" name="limit" required/>
        </div>
        <Button type="submit" className="ml-auto px-10">Save</Button>
      </div>
      </form>
  );
        }