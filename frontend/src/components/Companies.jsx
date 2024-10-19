import React from "react";
import SearchBar from "./SearchBar";

function Companies() {
  return (
    <div className="h-full w-full flex flex-col justify-start items-center text-neutral-950 gap-3 pt-16">
      <p className="font-semibold text-5xl">Explore</p>
      <p className="font-normal text-lg">
        "Search and explore company details to identify the best opportunities
        for student placements."
      </p>
      <SearchBar/>
    </div>
  );
}

export default Companies;
