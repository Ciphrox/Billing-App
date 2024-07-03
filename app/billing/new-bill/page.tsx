import { Input } from "@nextui-org/input";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import React from "react";
import { DateInput } from "@nextui-org/date-input";

const page = () => {
  return (
    <>
      <h1 className="text-2xl font-bold">New Bill</h1>
      <br />
      <div className="flex flex-row space-x-2">
        <Dropdown>
          <DropdownTrigger>
            <Input label="Name" type="text" />
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Action event example"
            // onAction={(key) => alert(key)}
          >
            <DropdownItem key="new">New file</DropdownItem>
            <DropdownItem key="copy">Copy link</DropdownItem>
            <DropdownItem key="edit">Edit file</DropdownItem>
            <DropdownItem key="delete" className="text-danger" color="danger">
              Delete file
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Input label="Type" type="text" />
        <Input label="Price" type="Number" />
        <DateInput
          label="Expiry Date"
          //   placeholder="Select a date"
          //   onDateChange={(date) => console.log(date)}
        />
      </div>
    </>
  );
};

export default page;
