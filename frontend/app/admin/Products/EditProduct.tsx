import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FaRegTrashCan } from "react-icons/fa6";

export function Edit({ row }: any) {
  const router = useRouter();
  let id = row.getValue("id");
  let type = row.getValue("type").toLowerCase();
  function editProduct() {
    router.push("/admin/products/" + type + "/" + id);
  }
  async function deleteProduct(){
    const response=await fetch(`/api/admin/products/${id}`,{method:"DELETE"})
    if(response.ok)
    alert("deleted successfully")
  }

  return (
    <div className="flex">
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
      <Drawer>
        <DrawerTrigger>
          <FaRegTrashCan />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-center">Warning</DrawerTitle>
            <DrawerDescription className="text-center">All members of this {type} will loose access</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose>
              <Button onClick={deleteProduct} className="bg-red-600 w-1/4 text-white" variant="outline">Delete</Button>
            </DrawerClose>
            <DrawerClose>
              <Button className="bg-blue-600 w-1/3 text-white" variant="outline">cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
