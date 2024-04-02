"use client";
import React from "react";
import New from "./newLS";
import { ProductTable } from "./ProductTable";
import { columns } from "./Colums";
import  {products}  from "./ProductList";

export default function page() {
  return (
    <div className="p-5 pb-0">
      <h1 className="text-2xl font-bold">Products</h1>
      <div className="flex justify-end">
        <New />
      </div>
      <ProductTable columns={columns} data={products}></ProductTable>
    </div>
  );
}