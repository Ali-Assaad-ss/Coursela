"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { columns } from "./UserProductColums";
import getSortedProducts from "./SortedProduct";

export default function page({id}) {
  const user = {
    id: 1,
    name: "John Doe",
    email: "John@gmail.com",
  };

  return (
    <div className="p-4">
      <div className="flex m-5">
        <AvatarDemo />
        <div className="ml-5 mt-2">
          <h1 className="text-3xl font-medium">{user.name}</h1>
          <p className="text-gray-500">email: {user.email}</p>
          <p className="text-gray-500">ID: {user.id}</p>
        </div>
      </div>

      <Tabs defaultValue="account">
        <TabsList className="w-full">
          <TabsTrigger className="w-1/3" value="Products">
            Products
          </TabsTrigger>
          <TabsTrigger className="w-1/3" value="Communities">
            Communities
          </TabsTrigger>
          <TabsTrigger className="w-1/3" value="Invoices">
            Invoices
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Products">
        
        </TabsContent>
        <TabsContent value="Communities">
          Change your password here.
        </TabsContent>
        <TabsContent value="Invoices">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}

export function AvatarDemo() {
  return (
    <Avatar className="size-28">
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}

import { Switch } from "@/components/ui/switch";
import { ProductTable } from "../../Products/ProductTable";
