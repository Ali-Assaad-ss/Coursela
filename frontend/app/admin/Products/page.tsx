"use client";
import React, { useState, useEffect } from "react";
import New from "./newLS";
import { ProductTable } from "./ProductTable";
import { columns } from "./Colums";
import { getCookie  } from 'cookies-next';
export default function page() {
  const [products, setProducts] = useState([]);

  async function productList() {
    const response = await fetch("/api/product", {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie('JWT'),
      },
    });
    const data = await response.json();
    setProducts(data);
  }

  useEffect(() => {
    productList();
  }, []);


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
