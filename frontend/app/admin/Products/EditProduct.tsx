import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  
  import {
    DotsHorizontalIcon,
  } from "@radix-ui/react-icons";
  
  import { Button } from "@/components/ui/button";
  export function Edit() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="flex">
          <Button variant="ghost" className="h-8 w-8 p-0 mx-auto">
            <span className="sr-only">Open menu</span>
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>View as member</DropdownMenuItem>
          <DropdownMenuItem>View as guest</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  