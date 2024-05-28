"use client";
import { Input } from "@/components/ui/input";
import{useEffect, useState} from "react";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import Dropzone from "@/components/component/Dropzone/Dropzone";

export default function page({params}:{params:{id:string}}) {

  const [iUrl, setIUrl] = useState<string | null>(null);
  const [iFile, setIFile] = useState<File | null>(null);
  
  async function save(e:any) {
    e.preventDefault();
    const formData = new FormData(e.target);
    let name= formData.get("title");
    let description = formData.get("description");
    let visibility = formData.get("visibility")?true:false;
    let price = Number(formData.get("price"));
    let limit = Number(formData.get("limit"));
    if(iUrl==null){
      alert("Please upload an image");
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

      const response = await fetch(`/api/admin/products/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description, visibility, price, limit}),
      });
      if (response.ok) {
        alert("Saved");
      } else {
        alert("Error");
      }
  }
//load the data on page load using useEffect



type Course = {
  id: number;
  name: string;
  description: string;
  visibility: boolean;
  price: number;
  limit: number;
  image: boolean;
};
const initialCourse: Course = {
  id:0,
  name: '',
  description: '',
  visibility: false,
  price: 0,
  limit: 0,
  image: false,

};
 const [course, setCourse] = useState<Course>(initialCourse);

  async function load() {
    const response = await fetch(`/api/admin/courses/${params.id}`
    );
    if (response.ok) {
      const data = await response.json();
      setCourse(data);
      if (data.image) {
        setIUrl(`/api/file/product/${params.id}/image`);
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
      <h1 className="text-2xl font-bold m-5 mt-7 ml-10">Course Settings</h1>
      <div className="flex flex-col p-16 gap-10 border rounded-xl mx-10">
        <div className="flex">
          <p className="text-xl">Title</p>
          <Input value={course.name} onChange={(e)=>{
            const modifiedCourse = { ...course, name: e.target.value };
            setCourse(modifiedCourse)}
            } className="w-[80%] ml-auto" placeholder="Enter Title" name="title" required/>
        </div>

        <div className="flex">
          <p className="text-xl">Description</p>
          <Textarea value={course.description}
          onChange={(e)=>{
            const modifiedCourse = { ...course, description: e.target.value };
            setCourse(modifiedCourse)}}
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
        <div className="flex gap-10 text-xl">
        Visibility <Switch name="visibility" checked={course.visibility} onClick={()=>{
          const modifiedUser = { ...course, visibility:!course.visibility };
          setCourse(modifiedUser)}}/>
        </div>
        <div className="flex gap-2 text-xl items-center">
          Price:<Input value={course.price} className="w-16" name="price" required/>$
        </div>
        <div className="flex gap-2 text-xl items-center">
          Limit:<Input value={course.limit} onChange={(e)=>{
            const modifiedCourse = { ...course, limit: Number(e.target.value) };
            setCourse(modifiedCourse)
          }}
          className="w-16" name="limit" required/>
        </div>
        <Button type="submit" className="ml-auto px-10">Save</Button>
      </div>
      </form>
  );
        }