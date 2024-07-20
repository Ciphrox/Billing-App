import React from "react";
import { Input } from "@nextui-org/input";

import { SearchIcon } from "./icons";

const Search = ({
  onValueChange,
}: {
  onValueChange: (value: string) => void;
}) => {
  return (
    <div>
      <Input
        aria-label="Search"
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm",
        }}
        // labelPlacement="outside"
        placeholder="Search..."
        startContent={
          <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
        }
        type="search"
        onValueChange={(value) => onValueChange(value)}
      />
    </div>
  );
};

export default Search;
