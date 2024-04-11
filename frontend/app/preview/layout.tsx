import GNav from "@/components/component/GuestNavBar/GNav";
import React from "react";

export default function layout({ children }) {
  return (
<>
      <GNav/>
      {children}
    </>
  );
}
