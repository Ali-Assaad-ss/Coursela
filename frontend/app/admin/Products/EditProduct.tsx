import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function Edit({ row }: any) {
  const router = useRouter();
  function editProduct() {
    let id = row.getValue("id");
    let type = row.getValue("type").toLowerCase();
    router.push("/admin/products/" + type + "/" + id);
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="flex">
        <Button variant="ghost" className="h-8 w-8 p-0 mx-auto">
          <span className="sr-only">Open menu</span>
          <DotsHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={editProduct}>Edit</DropdownMenuItem>
        <DropdownMenuItem>View as member</DropdownMenuItem>
        <DropdownMenuItem>View as guest</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
