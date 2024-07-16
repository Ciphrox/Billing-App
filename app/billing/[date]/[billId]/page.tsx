"use client";
import { Button } from "@nextui-org/button";
import { redirect } from "next/navigation";

export default function page({ date, billId }) {
  return (
    <div>
      {/* <Button onClick={() => redirect("/billing/new-bill")}> redirect</Button> */}
      <h1>Date:{date}</h1>
      <h1>ID:{billId}</h1>
    </div>
  );
}
