"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { MdOutlineOpenInNew } from "react-icons/md";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";

const Communities = [
  {
    Id: 232,
    Name: "Football Club",
    Members: 232,
  },
];

export function TableDemo() {
  const router = useRouter();
  return (
    <div>
      <Input className="w-1/2" placeholder="Search Communities ..." />
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Community</TableHead>
            <TableHead>Members</TableHead>
            <TableHead>Actions</TableHead>
            <TableHead>View</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Communities.map((Community) => (
            <TableRow key={Community.Id}>
              <TableCell className="font-medium">{Community.Name}</TableCell>
              <TableCell>{Community.Members}</TableCell>
              <TableCell>
              <Dialog>
                  <DialogTrigger asChild><Button>Settings</Button></DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Community Settings</DialogTitle>
                      <DialogDescription>
                        <div className="flex justify-between mt-2"><p>Community is public</p> <Switch /></div>
                        <div className="flex justify-between mt-2"><p>Users can Comment</p> <Switch /></div>
                        <div className="flex justify-between mt-2"><p>Users can post</p> <Switch /></div>
                        <DialogClose asChild>
                        <Button className="ml-auto flex mt-5 px-7">Save</Button>
                        </DialogClose>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </TableCell>
              <TableCell>
                <Button onClick={()=>{router.push("Communities/1")}} ><MdOutlineOpenInNew /></Button>
              </TableCell>
              {/* <TableCell><Button><MdOutlineOpenInNew /></Button></TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
