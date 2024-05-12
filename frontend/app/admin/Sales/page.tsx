import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Overview } from "./overview";
import { RecentSales } from "./Recent";

export default function page() {
  return (
    <div className="p-5 px-8">
      <h1 className="text-2xl font-bold px-5">Sales</h1>
      <div id="head" className="flex justify-between my-7">
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p>123$</p>
            <CardDescription>10% increase</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>All Members</CardTitle>
          </CardHeader>
          <CardContent>
            <p>256</p>
            <CardDescription>10% increase</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Number Of Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p>123$</p>
            <CardDescription>10% increase</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top Product</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Python beginner</p>
            <CardDescription>12 sales</CardDescription>
          </CardContent>
        </Card>
      </div>
      <div className="flex gap-5 ">
        <div className="flex-auto border rounded-xl p-3 shadow-md">
        <h1 className="font-semibold pb-3"> Overview</h1>
          <Overview></Overview>
        </div>
        <div className="flex-auto border rounded-xl p-3 shadow-md">
            <h1 className="font-semibold pb-3">Recent Sales</h1>
          <RecentSales></RecentSales>
        </div>
      </div>
    </div>
  );
}
