import React from "react";
import { BiSearch } from "react-icons/bi";

function Search({ className = "", ...props }: React.ComponentProps<"input">) {
  return (
    <div className="form-control w-full">
      <label
        htmlFor="id"
        className="relative block text-gray-500 focus-within:text-gray-600"
      >
        <div className="absolute left-3 top-1/2 flex h-full -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full text-xl">
          <BiSearch />
        </div>
        <input
          className={`input input-sm block w-full appearance-none bg-base-200 pl-10 pr-12 ${className}`}
          {...props}
        />
      </label>
    </div>
  );
}

export default Search;
