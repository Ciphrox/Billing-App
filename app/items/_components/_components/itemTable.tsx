import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { Tooltip } from "@nextui-org/tooltip";

import { EditIcon } from "@/svg/delete";
import { DeleteIcon } from "@/svg/edit";

type Item = {
  id: number;
  name: string;
  type: string;
  price: number;
};

export const ItemTable = () => {
  let items: Item[] = [];
  const response = fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/item/list-items`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      items = data;
    });
  // const items = response.json();
  console.log(items);

  console.log("Item Table");
    return <></>

  return (
    <>
      <Table aria-label="item-table">
        <TableHeader>
          <TableColumn align="start">Items</TableColumn>
          <TableColumn align="start">Type</TableColumn>
          <TableColumn align="start">Price (₹)</TableColumn>
          <TableColumn align="end">Action</TableColumn>
        </TableHeader>
        {items.length > 0 ? (
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="capitalize">{item.name}</TableCell>
                <TableCell className="capitalize">{item.type}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>
                  <div className="relative flex items-center gap-2">
                    <Tooltip content="Edit">
                      <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                        <EditIcon />
                      </span>
                    </Tooltip>
                    <Tooltip color="danger" content="Delete Item">
                      <span className="text-lg text-danger cursor-pointer active:opacity-50">
                        <DeleteIcon onClick={() => handleDelete(item.id)} />
                      </span>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
        )}
      </Table>
    </>
  );
};
function handleDelete(_id: any): void {
  throw new Error("Function not implemented.");
}
