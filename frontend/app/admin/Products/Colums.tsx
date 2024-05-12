import { Button } from "@/components/ui/button";
import { Edit } from "./EditProduct";
import { ArrowUpDown} from "lucide-react";

export const columns = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="mx-auto flex"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="mx-auto flex"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("name")}</div>
    )
  }
    ,
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="mx-auto flex"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("type")}</div>
    ),
    
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="mx-auto flex"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("price")}</div>
    ),
  },
  {
    accessorKey: "members",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="mx-auto flex"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Members
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }: any) => (
      <div className="text-center">{row.getValue("members")}</div>
    ),
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }: any) => <Edit row={row}/>,
  },
];
