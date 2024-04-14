"use client";
import NavBar from "@/components/component/AdminNavbar/Navbar";
import { useRouter } from "next/navigation";
import React from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router= useRouter();
  return (
    <>
      <NavBar />
      <div className="h-full pt-20">
        {children}
      </div>
    </>
  );
}
