'use client';
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export default function Component() {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const login = async () => {
    await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
  };
  
  return (<>
  <Calendar />
    </>
  );
}
