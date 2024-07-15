"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { DateInput } from "@nextui-org/date-input";
import { Input } from "@nextui-org/input";
import { Divider } from "@nextui-org/divider";

import BillItem from "../_components/billItem";

const Page = () => {
  const [items, setItems] = useState<any>([]);
  const billItem = {
    id: Math.random().toString(36).slice(2, 9), // Unique id for each bill item
    batchNo: "",
    name: "",
    type: "",
    price: 1,
    quantity: 1,
    expiryDate: new Date(),
    amount: 0,
  };

  const [bill, setBill] = useState<(typeof billItem)[]>([{ ...billItem }]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [billDate, setBillDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    const newTotal = bill.reduce((acc, item) => acc + item.amount, 0);

    setTotalAmount(newTotal);
  }, [bill]);

  const fetchItems = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/item/list-items`
      );
      const data = await response.json();

      setItems(data);
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  const handleBillItemChange = (
    index: number,
    updatedBillItem: typeof billItem
  ) => {
    const newBill = bill.map((item, i) =>
      i === index ? updatedBillItem : item
    );

    setBill(newBill);
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold">New Bill</h1>
        <DateInput
          className="max-w-36"
          isDisabled={loading}
          label="Bill Date"
          onChange={(date) => setBillDate(date.toDate("UTC"))}
        />
      </div>
      <br />

      <div className="flex flex-col space-y-2">
        {bill.map((billItem, index) => (
          <div key={billItem.id} className="">
            <BillItem
              billItem={billItem}
              isDisabled={bill.length === 1}
              loading={loading}
              items={items}
              onChange={(updatedBillItem) =>
                handleBillItemChange(index, updatedBillItem)
              }
              onDelete={() => {
                setBill(bill.filter((_, i) => i !== index));
              }}
            />
            {index !== bill.length - 1 ? <Divider className="mt-2" /> : null}
          </div>
        ))}
        <div className="p-4">
          <Divider />
        </div>
        <div className="flex flex-row justify-end">
          <Input
            className="max-w-xs"
            disabled={true}
            label="Total"
            type="number"
            value={totalAmount.toString()}
            variant="faded"
          />
        </div>
      </div>
      <br />
      <div className="flex flex-row justify-center space-x-4">
        <Button
          isDisabled={loading}
          variant="bordered"
          onClick={() => {
            setBill([
              ...bill,
              { ...billItem, id: Math.random().toString(36).slice(2, 9) },
            ]);
          }}
        >
          Add Item
        </Button>
        <Button
          color="primary"
          isLoading={loading}
          onClick={async () => {
            setLoading(true);
            const data = { Date: billDate, bill: bill };

            const responce = await fetch("/api/billing/create-bill", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });

            if (responce.ok) {
              setBillDate(new Date());
              setBill([{ ...billItem }]);
            }
            setLoading(false);
          }}
        >
          Submit
        </Button>
      </div>
    </>
  );
};

export default Page;
