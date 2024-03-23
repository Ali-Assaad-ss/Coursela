'use client';
import Link from "next/link";
import s from "./navbar.module.css";
import BookIcon from "../icons/book";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MenuIcon from "../icons/menu";
import { useState } from "react";
import XIcon from "../icons/x";

export default function NavBar() {

  const [isOpen, setIsOpen] = useState(false);

  function openMenu() {
    console.log("Menu Opened");
    setIsOpen(!isOpen);

  }
  return (
    <>
      <div className={s.navBar}>
        <MenuIcon onClick={openMenu} className={`${s.MenuIcon} hover:fill-red-900 hover:cursor-pointer`} />
        <div className={`${s.Logo} ${s.h} flex space-x-2 items-center `}>
          <BookIcon/>
          <p className="text-3xl font-bold">Coursela</p>
        </div>
        <div className={`${s.Menu} space-x-6 none ${isOpen ? "flex":s.MenuHidden}`}>

        <div className={`${s.Logo} ${s.v} flex space-x-2 items-center`}>
          <BookIcon/>
          <p className="text-3xl font-bold">Coursela</p>
          <XIcon onClick={openMenu} className="mt-1 hover:fill-red-900 hover:cursor-pointer border-2 border-black rounded-lg" />
        </div>
        
          <Link className={s.Link} href="Products">
            Products
          </Link>
          <Link className={s.Link} href="Users">
            Users
          </Link>
          <Link className={s.Link} href="Communities">
            Communities
          </Link>
          <Link className={s.Link} href="Chat">
            Chat
          </Link>
          <Link className={s.Link} href="Sales">
            Sales
          </Link>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
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
      </div>
    </>
  );
}
