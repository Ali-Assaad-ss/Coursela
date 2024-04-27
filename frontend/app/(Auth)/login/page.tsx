"use client";
import { RiLockPasswordLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MdOutlineEmail } from "react-icons/md";
import { useState } from "react";
import Logo from "@/components/svg/Logo";
import { useRouter } from "next/navigation";
import jwt from 'jsonwebtoken';
import Link from "next/link";

export default function Component() {
  const router= useRouter();
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");
  const login = async () => {
    if (!email) {
      setError("Email is required.");
      return;
    } else if (!password) {
      setError("Password is required.");
      return;
    }

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      const token = data.token; // Assuming the token is returned in the response data
      document.cookie = `JWT=${token};path=/;max-age=604800`;
      //check if token is role is admin or user
      const decoded = jwt.decode(token);
      if (decoded.role==="Admin")
      router.push("/admin");
      else if (decoded.role==="User")
      router.push("/user");
    } else if (response.status ===401) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="flex justify-center items-center h-full w-full drop-shadow-md">
      <div className="border w-[800px] h-[600px] relative">
        <div className="bg-blue-500 w-96 h-96 absolute -right-3 -top-3 -z-10 rounded-se-lg"></div>
        <div className="bg-blue-500 w-96 h-96 absolute -bottom-3 -left-3 -z-10 rounded-es-lg"></div>
        <Logo className="absolute h-16 top-6 left-1/2 -translate-x-1/2" />
        <div className="bg-white h-full flex">
          <div className="w-7/12 hidden items-center md:flex">
            <img
              src="https://img.freepik.com/free-vector/students-learning-foreign-language-with-vocabulary_74855-11070.jpg?w=1060&t=st=1712841506~exp=1712842106~hmac=0fe746cb0e2b86d9277ea3fc21c1b01d68c3080c2db15f360b3c2af78f840a34"
              alt=""
            />
          </div>
          <div className="flex flex-col gap-6 justify-center p-10 items-center w-full md:w-auto">
            <div className="flex gap-1 items-center border rounded-sm pl-2 p-1">
              <MdOutlineEmail className="fill-slate-500" />
              <Input
                placeholder="Username or Email"
                className="focus-visible:ring-transparent border-0"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex gap-1 items-center border rounded-sm pl-2 p-1">
              <RiLockPasswordLine className="fill-slate-500" />
              <Input
                placeholder="Password"
                className="focus-visible:ring-transparent border-0"
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            <Button className="w-1/4 md:w-1/2" onClick={login}>
              Login
            </Button>
            <Link href={"/signup"} className="underline text-xs text-blue-900 hover:text-blue-500">No Account, Create one</Link>
          </div>
          {error && (
            <div className="absolute bottom-0 bg-red-500 text-white p-2 w-full text-center">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
