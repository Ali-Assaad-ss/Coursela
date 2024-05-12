import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export default function InvoicesTab() {
  const invoices = [
    {
      id: 1,
      amount: 100,
      product: "Product 1",
      date: "2021-10-10",
    },
    {
      id: 2,
      amount: 200,
      product: "Product 2",
      date: "2021-10-10",
    },
    {
      id: 3,
      amount: 300,
      product: "Product 3",
      date: "2021-10-10",
    },
    {
      id: 4,
      amount: 400,
      product: "Product 4",
      date: "2021-10-10",
    },
    {
      id: 5,
      amount: 500,
      product: "Product 5",
      date: "2021-10-10",
    },
  ];
  return (
    //create a table for invoices using shadcn table component
    <div>
      <Table>
        <TableCaption>A list of This User's Invoices</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice Id</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* map through the invoices and create a table row for each invoice */}
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>{invoice.id}</TableCell>
              <TableCell>{invoice.product}</TableCell>
              <TableCell>{invoice.amount}</TableCell>
              <TableCell>{invoice.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
