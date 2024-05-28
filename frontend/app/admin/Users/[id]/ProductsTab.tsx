import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Product = {
  id: number;
  name: string;
  price: number;
  members: number;
  type: string;
};
//sort products by userProducts keeping all the products but moving the userProducts to the top
function sortProducts(products: Product[], userProducts: number[]) {
  const sortedProducts = products.sort((a, b) => {
    if (userProducts.includes(a.id)) return -1;
    if (userProducts.includes(b.id)) return 1;
    return 0;
  });
  return sortedProducts;
}

export default function ProductsTab() {
  const products: Product[] = [
    { id: 1, name: "Product 1", price: 100, members: 10, type: "Type 1" },
    { id: 2, name: "Product 2", price: 200, members: 20, type: "Type 2" },
    { id: 3, name: "Product 3", price: 300, members: 30, type: "Type 3" },
    { id: 4, name: "Product 4", price: 400, members: 40, type: "Type 4" },
  ];
  const [userProducts, setUserProducts] = useState([1, 3]);
  const sortedProducts = sortProducts(products, userProducts);
  return <ProductTable sortedProducts={sortedProducts} userProducts={userProducts} setUserProducts={setUserProducts}/>;
}

function ProductTable({sortedProducts,userProducts,setUserProducts}:{sortedProducts: Product[],userProducts:number[],setUserProducts:React.Dispatch<React.SetStateAction<number[]>>}) {
  return (
    <div>
      <Table>
        <TableCaption>A list of This User's Products</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ProductId</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Access</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody >
            {sortedProducts.map((product) => (
                <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.type}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>
                    <Switch checked={userProducts.includes(product.id)}
                    onClick={(e)=>{
                        if(userProducts.includes(product.id)){
                            setUserProducts(userProducts.filter((id)=>id!==product.id))
                        }
                        else{
                            setUserProducts([...userProducts,product.id])
                        }
                    }} />
                </TableCell>
                </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
