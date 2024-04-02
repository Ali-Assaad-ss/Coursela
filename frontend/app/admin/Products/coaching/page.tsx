"use client"

import * as React from "react"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableFooter,
    TableRow,
  } from "@/components/ui/table"
  
import { Calendar } from "@/components/ui/Coachingcalendar"
import { Button } from "@/components/ui/button"

export default function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return ( 
    <div className="h-full flex">
    
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border shadow h-full flex-1"
    />
    <div className="flex-1">
        <div><Meetings/></div>
    </div>
    </div>
  )
}

export function Meetings(){
    const Meetings = [
        {
          Id: "123",
          Product: "C# course",
          Client: "John smith",
          Date: "12/12/2023",
          Status: "Completed",
          Link: "www.google.com",
        },
        {
          Id: "123",
          Product: "C# course",
          Client: "John smith",
          Date: "12/12/2023",
          Status: "Pending",
          Link: "www.google.com",
        }
];

        return (
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Product</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Meetings.map((Meeting) => (
                  <TableRow key={Meeting.Id}>
                    <TableCell className="font-medium">{Meeting.Product}</TableCell>
                    <TableCell>{Meeting.Client}</TableCell>
                    <TableCell>{Meeting.Status}</TableCell>
                    <TableCell>{Meeting.Date}</TableCell>
                    <TableCell><Button>Join</Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>  
            </Table>
          )

}