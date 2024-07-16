/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

import Items from "@/components/items";
interface Item {
  id: number | null;
  name: string;
  type: string | null;
  price: number;
  userId: string | null;
}

const Page: React.FC = () => {
  const [itemName, setItemName] = useState<string | null>(null);
  const [itemType, setItemType] = useState<string | null>(null);
  const [itemPrice, setItemPrice] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [items, setItems] = useState<[Item] | []>([]);

  // const res = await fetch("/api/item/list-items");
  useEffect(() => {
    fetchItems();
    // console.log("fetchItems");
    // console.log(items);
    // console.log(typeof items);
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/item/list-items`
        // { cache: "force-cache" }
      );
      const data = await response.json();

      // console.log(data);
      setItems(data);
    } catch (error) {
      // console.error("An unexpected error occurred:", error);
    }
  };

  // console.log(items);
  // console.log(typeof items);
  // console.log(items.length);

  const handleAddItemClick = async () => {
    // console.log(itemName);

    setLoading(true);
    if (!itemName) return;

    try {
      const response = await fetch("/api/item/create-item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemName: itemName,
          itemType: itemType,
          itemPrice: itemPrice,
        }),
      });

      const { data } = await response.json();
      console.log(data);

      if (response.ok) {
        setSuccess(data.message);
        setError(null);
        setItemName("");
        setItems(data);
      } else {
        setError(data.error);
        setSuccess(null);
      }
    } catch (error) {
      setError("An unexpected error occurred");
      setSuccess(null);
    }
    setLoading(false);
  };

  return (
    <>
      <h1 className="text-2xl py-4">Add Item</h1>
      <br />
      <div className="flex justify-center items-center h-8 space-x-4">
        <div className="flex w-full space-x-2">
          <Input
            isDisabled={loading}
            label="Name"
            type="text"
            // value={itemName}
            onValueChange={(string) => setItemName(string)}
          />
          <Input
            isDisabled={loading}
            label="Type"
            type="text"
            // value={itemType}
            onValueChange={(string) => setItemType(string)}
          />
          <Input
            isDisabled={loading}
            label="Price (₹)"
            type="number"
            // value={itemPrice}
            onValueChange={(value) => setItemPrice(parseInt(value, 10))}
          />
        </div>
        <Button
          isLoading={loading}
          className="h-10"
          color="primary"
          variant="flat"
          onPress={handleAddItemClick}
        >
          Add Item
        </Button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <br />
      <Items items={items} setItems={setItems} />
    </>
  );
};

export default Page;
