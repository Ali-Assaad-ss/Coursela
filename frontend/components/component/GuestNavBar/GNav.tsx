import Link from "next/link";
import React from "react";
import { IoIosClose } from "react-icons/io";
import "../navbar/Navbar.css";
import { RxHamburgerMenu } from "react-icons/rx";
import Logo from "@/components/svg/Logo";
import { Button } from "@/components/ui/button";

export default function UserNavbar() {
  return (
    <nav className=" flex border-b fixed w-full bg-white top-0 z-10 min-h-12">
      <input type="checkbox" name="" id="sidebar-active" className="hidden" />
      <label htmlFor="sidebar-active" className="open-sidebar hidden">
        <RxHamburgerMenu className="text-2xl" />
      </label>
      <div className="linkcontainer z-50">
        <label htmlFor="sidebar-active" className="close-sidebar hidden">
          <IoIosClose className="text-4xl"/>
        </label>
        <Logo className="w-44 mr-auto ml-10 NavLogo" />
        <Button className="bg-white text-blue-600 border-blue-500 border-2">Login</Button>
        <Button className="md:mr-2">Sign up</Button>
      </div>
    </nav>
  );
}

