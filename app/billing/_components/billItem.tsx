import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { DateInput } from "@nextui-org/date-input";
import { Input } from "@nextui-org/input";
import { Divider } from "@nextui-org/divider";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { parseDate } from "@internationalized/date";

import { DeleteIcon } from "@/svg/edit";

interface Item {
  id: number;
  name: string;
  type: string;
  price: number;
  userId: string | null;
}

const BillItem = ({
  items,
  isDisabled,
  onDelete,
  onChange,
  billItem,
  loading,
}: {
  items: Item[];
  isDisabled: boolean;
  loading: boolean;
  onDelete: () => void;
  onChange: (updatedBillItem: typeof billItem) => void;
  billItem: {
    id: string;
    batchNo: string;
    name: string;
    type: string;
    price: number;
    quantity: number;
    expiryDate: Date;
    amount: number;
  };
}) => {
  const [batchNo, setBatchNo] = useState<string>(billItem.batchNo);
  const [name, setName] = useState<string>(billItem.name);
  const [type, setType] = useState<string>(billItem.type);
  const [price, setPrice] = useState<number>(billItem.price);
  const [quantity, setQuantity] = useState<number>(billItem.quantity);
  const [expiryDate, setExpiryDate] = useState<Date>(billItem.expiryDate);

  useEffect(() => {
    const updatedBillItem = {
      ...billItem,
      batchNo,
      name,
      type,
      price,
      quantity,
      expiryDate,
      amount: quantity * price,
    };

    onChange(updatedBillItem);
  }, [batchNo, name, type, price, quantity, expiryDate]);

  return (
    <>
      <div className="min-h-12 flex flex-row space-x-2 items-center">
        <Input
          isDisabled={loading}
          label="Batch No."
          type="text"
          value={batchNo}
          onValueChange={(value) => setBatchNo(value)}
        />
        <Autocomplete
          isDisabled={loading}
          className="max-w-xs"
          label="Name"
          onSelectionChange={(itemId) => {
            if (itemId === null) {
              setPrice(0);
              setType("");
              return;
            }
            const id: number = parseInt(itemId, 10);
            const item = items.find((item) => item.id === id);
            setName(item.name);
            setPrice(item.price);
            setType(item.type);
          }}
        >
          {items.map((item) => (
            <AutocompleteItem key={item.id} value={item.name}>
              {item.name}
            </AutocompleteItem>
          ))}
        </Autocomplete>
        <Input
          isDisabled={loading}
          disabled={true}
          label="Type"
          type="text"
          value={type}
          onValueChange={(value) => setType(value)}
        />
        <Input
          isDisabled={loading}
          label="Price"
          min={1}
          type="Number"
          value={price.toString()}
          onValueChange={(value) => setPrice(parseInt(value, 10))}
        />
        <Input
          isDisabled={loading}
          label="Quantity"
          min={1}
          type="Number"
          value={quantity.toString()}
          onValueChange={(value) => setQuantity(parseInt(value, 10))}
        />
        <DateInput
          isDisabled={loading}
          label="Expiry Date"
          onChange={(date) => {
            setExpiryDate(date.toDate("UTC"));
            console.log(expiryDate);
            console.log(expiryDate?.toLocaleDateString());
          }}
        />
        <Divider className="h-12" orientation="vertical" />
        <Input
          disabled={true}
          isDisabled={loading}
          label="Amount"
          type="Number"
          value={(quantity * price).toString()}
        />
        <Button
          className="max-w-2"
          color="danger"
          isDisabled={isDisabled || loading}
          size="md"
          variant="light"
          onClick={onDelete}
        >
          <DeleteIcon height="1.5em" width="1.5em" />
        </Button>
      </div>
    </>
  );
};

export default BillItem;
