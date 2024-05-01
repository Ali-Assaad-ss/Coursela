"use client";
import React, { useState, useEffect } from "react";
import New from "./newLS";
import { ProductTable } from "./ProductTable";
import { columns } from "./Colums";
export default function page() {
  const [products, setProducts] = useState([]);

  async function productList() {
    const response = await fetch("/api/admin/products", {
      method: "Get",
      headers: {
        "Content-Type": "application/json"
      },
    });
    const data = await response.json();
    setProducts(data);
    console.log(data);
  }

  useEffect(() => {
    productList();
  }, []);


  return (
    <div className="p-5 pb-0">
      <h1 className="text-2xl font-bold">Products</h1>
      <div className="flex justify-end">
        <New products={products} setProducts={setProducts}/>
      </div>
      <ProductTable columns={columns} data={products}></ProductTable>
    </div>
  );
}
