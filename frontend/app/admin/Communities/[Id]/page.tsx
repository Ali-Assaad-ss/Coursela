import { Input } from "@/components/ui/input";
import React from "react";
import UserChat from "../../chat/UserChat";
import { FaRegEye } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
export default function page() {

  let posts = [
    {
      user:{
        name: "Jay Cutler",
        image: "https://thispersondoesnotexist.com/",
      },
      description: "description of the post ...",
      type: "image",
      link: "https://img.freepik.com/free-photo/still-life-graphic-design-office_23-2151345410.jpg?w=1380"
    },
    {
      user:{
        name: "Jay Cutler",
        image: "https://thispersondoesnotexist.com/"
      },
      description: "description of the post ...",
      type: "image",
      link: "https://img.freepik.com/free-photo/wireless-earbuds-with-neon-cyberpunk-style-lighting_23-2151074279.jpg?w=360"
    },
    {
      user:{
        name: "Jay Cutler",
        image: "https://thispersondoesnotexist.com/"
      },
      description: "description of the post ...",
      type: "video",
      link: "https://videocdn.cdnpk.net/joy/content/video/free/video0454/large_preview/_import_6064833e09e139.05655091.mp4?filename=1103044_1080p_pandemic_discovery_1920x1080.mp4"
    }
  ];


  return (
    <div className="flex w-auto h-5/6 m-4">
      <LeftSide     />
      <div className="w-1/2 flex flex-col items-center ml-[25%]">
        <Input placeholder="Search Posts" className="w-5/6 mb-2 sticky top-[60px] bg-white z-10" />
        {posts.map((post) => (
          <Post key={post.link} type={post.type} link={post.link} user={post.user} description={post.description} />
        ))}

      </div>
      <MembersSide />
    </div>
  );

  function MembersSide({}) {
    let members = [
      {
        name: "John Doe",
        id: 1,
        image: "https://www.dell.com/wp-uploads/2021/07/image-297x300.png"
      },
      {
        name: "Jane Doe",
        id: 2,
        image: "https://www.dell.com/wp-uploads/2023/05/AMA_MeganWylie_JenFelch-1-440x440.jpg"
      },
      {
        name: "Alice Smith",
        id: 3,
        image: "https://www.dell.com/wp-uploads/2021/07/s_6F9FA8C635E5B49A4AA9474CB76D1146BC1F6408CE5EEC320713FFF4758F98B5_1569007594455_003454-440x440.jpg"
      },
      {
        name: "Bob Johnson",
        id: 4,
        image: "https://thispersondoesnotexist.com/"
      },
      {
        name: "Emily Davis",
        id: 5,
        image: "https://www.dell.com/wp-uploads/2021/07/siwei-lyu-400x400.jpg"
      },
      {
        name: "John Doe",
        id: 6,
        image: "https://i.kinja-img.com/image/upload/c_fit,q_60,w_645/2a9a2784e45c110761cba81fa96ba60d.jpg"
      },
      {
        name: "Jane Doe",
        id: 7,
        image: "https://i.kinja-img.com/image/upload/c_fit,q_60,w_645/ecea22b68a454eefc0550827f73abe4b.jpg"
      },
      {
        name: "Alice Smith",
        id: 8,
        image: "https://i.kinja-img.com/image/upload/c_fit,q_60,w_645/d20c9bc127c48f2c8676674375d031cc.jpg"
      },
      {
        name: "Bob Johnson",
        id: 9,
        image: "https://i.kinja-img.com/image/upload/c_fit,q_60,w_645/d0e1de4fa60e523938b392cd46559b9e.jpg"
      },
      {
        name: "Emily Davis",
        id: 10,
        image: "https://thispersondoesnotexist.com/"
      }
    ];
    

    return (
      <div className="w-1/4 max-w-96 ml-auto border-l fixed right-0 h-[80vh]">
        <h1 className="text-center text-xl font-bold">Members</h1>
        {members.map((member) => (
          <UserChat key={member.id} image={member.image} name={member.name} />
        ))}
      </div>
    );
  }
}

    function Post({type,link,description,user}) {
      return (<div id="Post" className="border-2 m-2 rounded-xl w-10/12 max-w-[500px]">
          <UserChat image={user.image} name={user.name}/>
          <p className="ml-12 -mt-3 mb-2">{description}</p>
          <div className="border rounded-xl w-[90%] mx-auto mb-4">
            {type === "image" && <img
              src={link}
              alt="post"
              className="w-full h-full object-cover rounded-xl"
            />}
            {type === "video" && (
              <video controls 
                src={link}
                className="w-full h-full object-contain rounded-xl"
              ></video>
            )}
          </div>
          <div className="border-t-2 flex justify-around h-8 items-center">
            <div className="flex items-center gap-2">
              <FaRegHeart className="hover:fill-red-500 cursor-pointer"/> <p className="text-xs">12</p>{" "}
            </div>
            <div className="flex items-center gap-2">
              <FaRegEye /> <p className="text-xs">12</p>{" "}
            </div>
            <div className="flex items-center gap-2">
              <FaRegComment className="hover:fill-blue-700 cursor-pointer" /> <p className="text-xs">12</p>{" "}
            </div>
          </div>
        </div>);
    }

    function LeftSide({}) {
      return (<div className="w-1/4 max-w-96 border-2 m-2 rounded-xl fixed h-[80vh]">
        <div className="text-center p-3 text-xl font-bold">community name</div>
        <div className="flex justify-around">
          <div className="flex flex-col items-center">
            <h2>Posts</h2>
            <h2>123</h2>
          </div>
          <div className="flex flex-col items-center">
            <h2>Members</h2>
            <h2>56</h2>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 mt-14">
          <h1 className="border w-1/2 rounded-xl text-center hover:bg-gray-300 cursor-pointer">Top</h1>
          <h1 className="border w-1/2 rounded-xl text-center hover:bg-gray-300 cursor-pointer">New</h1>
          <h1 className="border w-1/2 rounded-xl text-center hover:bg-gray-300 cursor-pointer">Liked</h1>
          <h1 className="border w-1/2 rounded-xl text-center hover:bg-gray-300 cursor-pointer">My Posts</h1>
        </div>
      </div>);
    }