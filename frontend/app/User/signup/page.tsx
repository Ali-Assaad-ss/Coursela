"use client";
import { RiLockPasswordLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MdOutlineEmail } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { useState } from "react";
import Logo from "@/components/svg/Logo";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Component() {
  const router = useRouter();
  const [Email, setEmail] = useState("");
  const [Password, setpassword] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [UserName, setUserName] = useState("");
  const [error, setError] = useState("");

  const register = async () => {
    setError("");
    if (!FirstName) setError("First name is required.");
    else if (!LastName) setError("Last name is required.");
    else if (!UserName) setError("Username is required.");
    //passwrord checks
    else if (Password.length < 4)
      setError("Password must be at least 4 characters.");
    else if (!/\W/.test(Password))
      setError("Password must have at least one non-alphanumeric character.");
    else if (!/\d/.test(Password))
      setError("Password must have at least one digit ('0'-'9').");
    else if (!/[A-Z]/.test(Password))
      setError("Password must have at least one uppercase letter ('A'-'Z').");
    else if (!Password) setError("Password is required.");
    //email checks
    else if (!Email) setError("Email is required.");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email))
      setError("Email is invalid.");
    if (error) return;


    try {
      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          FirstName: FirstName,
          LastName: LastName,
          UserName: UserName,
          Email: Email,
          Password: Password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const roles:string[]= data.userRoles;
        if (roles.includes("Admin")){
          console.log("Admin");
        router.push("/admin");
      }
        else if (roles.includes("User"))
        router.push("/user");

      } else if (response.status === 500) {
        const data = await response.json();
        if (data && data.length > 0) {
          data.forEach((error) => {
            setError(error.description);
          });
        }
      }
    } catch (error) {
      // Handle fetch error
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
          <div className="flex flex-col gap-3 justify-center p-10 pt-32 items-center w-full md:w-auto">
            <div className="flex items-center border rounded-sm pl-2 p-1">
              <BsPerson className="fill-slate-500" />
              <Input
                placeholder="First name"
                className="focus-visible:ring-transparent border-0"
                value={FirstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </div>
            <div className="flex items-center border rounded-sm pl-2 p-1">
              <BsPerson className="fill-slate-500" />
              <Input
                placeholder="Last name"
                className="focus-visible:ring-transparent border-0"
                value={LastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>
            <div className="flex items-center border rounded-sm pl-2 p-1 gap-1">
              <MdOutlineEmail className="fill-slate-500" />
              <Input
                placeholder="Email"
                className="focus-visible:ring-transparent border-0"
                value={Email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="flex items-center border rounded-sm pl-2 p-1">
              <BsPerson className="fill-slate-500" />
              <Input
                placeholder="Username"
                className="focus-visible:ring-transparent border-0"
                value={UserName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </div>
            <div className="flex items-center border rounded-sm pl-2 p-1 ">
              <RiLockPasswordLine className="fill-slate-500" />
              <Input
                placeholder="Password"
                className="focus-visible:ring-transparent border-0"
                value={Password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />
            </div>
            <Button className="w-1/4 md:w-1/2" onClick={register}>
              Sign up
            </Button>
            <Link href={"/user/login"} className="underline text-xs text-blue-900 hover:text-blue-500">already have an account,Login</Link>
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
