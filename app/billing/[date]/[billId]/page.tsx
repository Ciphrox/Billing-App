"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";


export default function page({
  params,
}: {
  params: { date: string; billId: string };
}) {


  // const bill = data
  //   .find((day) => day.date === params.date)
  //   ?.bills.find((bill) => bill.billId === parseInt(params.billId));

  // console.log("Bill:", bill);

  return (
    <>
    <div>Bill Page</div>
      {/* <h1 className="text-2xl py-4">All Items</h1>
      <div className="flex flex-col space-y-4">
        <Table aria-label="item-table">
          <TableHeader>
            <TableColumn align="start">Items</TableColumn>
            <TableColumn align="start">Type</TableColumn>
            <TableColumn align="start">Price (₹)</TableColumn>
            <TableColumn align="end">Action</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key={"item.id"}>
              <TableCell>{"item.name"}</TableCell>
              <TableCell>{"item.type"}</TableCell>
              <TableCell>{"item.price"}</TableCell>
              <TableCell>fasd</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div> */}
    </>
  );
}
