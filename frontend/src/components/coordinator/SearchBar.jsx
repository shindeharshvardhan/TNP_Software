import React from "react";
import { IoSearch } from "react-icons/io5";
import { IoSearchCircle } from "react-icons/io5";

const SearchBar = () => {
  return (
    <div className="block flex items-center bg-zinc-100 mt-1 px-3 py-2 rounded-md w-full max-w-5xl">
      <p className="text-gray-500 inline-flex items-center">
        <IoSearch className="mr-1" /> Companies
      </p>

      <input
        type="text"
        className="bg-transparent focus:outline-none px-4 w-full font-semibold text-neutral-950"
        placeholder="Type here..."
      />
      <button className="font-bold bg-neutral-950 text-zinc-200 rounded focus:outline-none p-2 h-full flex items-center justify-center">
        <IoSearch className="h-4 w-4" /> {/* Adjust the icon size if needed */}
      </button>
    </div>
  );
};

export default SearchBar;
