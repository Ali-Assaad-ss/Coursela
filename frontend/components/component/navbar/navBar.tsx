import Link from "next/link";
import React from "react";
import { IoIosClose } from "react-icons/io";
import "./navbar.css";
import { RxHamburgerMenu } from "react-icons/rx";
import Logo from "@/components/svg/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UserNavbar() {
  return (
    <nav className=" flex border-b fixed w-full bg-white top-0 z-10">
      <input type="checkbox" name="" id="sidebar-active" className="hidden" />
      <label htmlFor="sidebar-active" className="open-sidebar hidden">
        <RxHamburgerMenu className="text-2xl" />
      </label>
      <div className="linkcontainer z-50">
        <label htmlFor="sidebar-active" className="close-sidebar hidden">
          <IoIosClose className="text-4xl"/>
        </label>
        <Logo className="w-44 mr-auto ml-10 NavLogo" />
        <Link className="Link" href="/User/Mypurchases">
          My Purchases
        </Link>
        <Link className="Link" href="/User/Communities">
          Communities
        </Link>
        <Link className="Link" href="/User/Chat">
          Chat
        </Link>
        <div className="ml-auto"></div>
      </div>
        <ProfileDropDown className="ml-auto mr-5 my-1 " />
    </nav>
  );
}

function ProfileDropDown({className}) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className={className}>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  
