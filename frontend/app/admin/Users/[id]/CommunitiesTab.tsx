import { useState } from "react";
import { communities } from "./Communities";
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

type Community = {
  id: number;
  name: string;
};
//sort products by userProducts keeping all the products but moving the userProducts to the top
function sortCommunities(communities: Community[], userCommunities: number[]) {
  const sortedCommunities = communities.sort((a, b) => {
    if (userCommunities.includes(a.id)) return -1;
    if (userCommunities.includes(b.id)) return 1;
    return 0;
  });
  return sortedCommunities;
}

export default function CommunitiesTab() {
  const [userCommunities, setUserCommunities] = useState([1, 3]);
  const sortedCommunities = sortCommunities(communities, userCommunities);
  return <ProductTable sortedCommunities={sortedCommunities} userCommunities={userCommunities} setUserCommunities={setUserCommunities}/>;
}

function ProductTable({sortedCommunities,userCommunities,setUserCommunities}:{sortedCommunities: Community[],userCommunities:number[],setUserCommunities:React.Dispatch<React.SetStateAction<number[]>>}) {
  return (
    <div>
      <Table>
        <TableCaption>A list of This User's Communities</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Community Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Access</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody >
            {sortedCommunities.map((community) => (
                <TableRow key={community.id}>
                <TableCell>{community.id}</TableCell>
                <TableCell>{community.name}</TableCell>
                <TableCell>
                    <Switch checked={userCommunities.includes(community.id)}
                    onClick={(e)=>{
                        if(userCommunities.includes(community.id)){
                          setUserCommunities(userCommunities.filter((id)=>id!==community.id))
                        }
                        else{
                          setUserCommunities([...userCommunities,community.id])
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
