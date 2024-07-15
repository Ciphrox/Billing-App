"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Tooltip } from "@nextui-org/tooltip";
import { Pagination } from "@nextui-org/pagination";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

import Search from "./search";
import { ChevronDownIcon } from "./icons";

import { DeleteIcon } from "@/svg/edit";
import { EditIcon } from "@/svg/delete";

interface Item {
  id: number;
  name: string;
  type: string | null;
  price: number;
  userId: string;
}

const Items = ({
  items,
  setItems,
}: {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);
  const itemPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredItems.length / itemPerPage);
  const [paginatedItems, setPaginatedItems] = useState(items);

  const [sorting, setSorting] = useState("acc");

  useEffect(() => {
    let sorted = [...filteredItems];

    if (sorting === "acc") {
      sorted = filteredItems.toSorted((item1, item2) =>
        item1.name > item2.name ? 1 : -1
      );
    } else if (sorting === "dec") {
      sorted = filteredItems.toSorted((item1, item2) =>
        item1.name < item2.name ? 1 : -1
      );
    }

    setFilteredItems(sorted);

    console.log("sorting", sorting, filteredItems);
  }, [sorting]);

  useEffect(() => {
    console.log("in useEffect for pagination");
    console.log(items.length, filteredItems.length);
    const start = (currentPage - 1) * itemPerPage;
    const end = start + itemPerPage;
    console.warn(filteredItems);

    const paginatedItems =
      filteredItems.length > 0 ? filteredItems.slice(start, end) : [];

    setPaginatedItems(paginatedItems);
  }, [currentPage, filteredItems]);

  useEffect(() => {
    setCurrentPage(1);

    if (!searchValue) {
      setFilteredItems(items);
      console.log("no search value");

      return;
    }

    const filtered = items.filter((item) => {
      // console.log(
      // item.name.toLowerCase() + " | " + searchValue.toLowerCase()
      // );
      if (item.name.toLowerCase().includes(searchValue.toLowerCase())) {
        // console.log(item.name.toLowerCase());
        return item;
      }
    });

    setFilteredItems(filtered);
  }, [searchValue, items]);

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

  const handleDelete = async (itemId: number) => {
    await fetch(`/api/item/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemId: itemId }),
    }).then(() => {
      fetchItems();
    });
  };

  // console.log(
  //   "items",
  //   items.length,
  //   filteredItems.length,
  //   paginatedItems.length
  // );

  return (
    <>
      <h1 className="text-2xl py-4">All Items</h1>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-row w-full h-full justify-between">
          <Search
            onValueChange={(value: string) => {
              setSearchValue(value);
              // console.log(value, searchValue);
            }}
          />

          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                endContent={<ChevronDownIcon className="text-small" />}
                variant="flat"
              >
                Sort By
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="sorting items"
              closeOnSelect={true}
              // onSelectionChange={setStatusFilter}
            >
              <DropdownItem
                id="acc"
                onPress={() => {
                  console.log("acc");
                  setSorting("acc");
                }}
              >
                Accending
              </DropdownItem>
              <DropdownItem
                id="dec"
                onPress={() => {
                  console.log("dec");
                  setSorting("dec");
                }}
              >
                Descending
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          {/* <Button
            color="primary"
            onPress={() => {
              console.log("Pressed add new");
            }}
          >
            Add New
          </Button> */}
        </div>
        <Table aria-label="item-table">
          <TableHeader>
            <TableColumn align="start">Items</TableColumn>
            <TableColumn align="start">Type</TableColumn>
            <TableColumn align="start">Price (₹)</TableColumn>
            <TableColumn align="end">Action</TableColumn>
          </TableHeader>
          {paginatedItems.length > 0 ? (
            <TableBody>
              {paginatedItems.map((item: Item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.type}</TableCell>
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
        <Pagination
          isCompact
          showControls
          page={currentPage}
          total={totalPages}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
};

export default Items;
