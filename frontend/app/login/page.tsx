'use client';
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
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
  <div className="font-bold  text-blue-600 text-4xl w-full text-center mt-9 absolute">coursad</div>
    <div className="flex items-center justify-center h-full w-full">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                required
                type="email"
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" required type="password" onChange={(e)=>setpassword(e.target.value)} />
            </div>
            <Button onClick={login} className="w-full" type="submit">
              Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
    </>
  );
}
