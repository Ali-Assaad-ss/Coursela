import React from "react";
import DataTableDemo from "./product";
import { Button } from "@/components/ui/button";
import New from "./New";

export default function page() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Products</h1>
      <div className="flex justify-end"><New/></div>
      <DataTableDemo />
    </div>
  );
}
