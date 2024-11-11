// import React from "react";
// import { IoSearch } from "react-icons/io5";
// import { IoSearchCircle } from "react-icons/io5";

// const SearchBar = () => {
//   return (
//     <div className="block flex items-center bg-zinc-100 mt-1 px-3 py-2 rounded-md w-full max-w-5xl">
//       <p className="text-gray-500 inline-flex items-center">
//         <IoSearch className="mr-1" /> Companies
//       </p>

//       <input
//         type="text"
//         className="bg-transparent focus:outline-none px-4 w-full font-semibold text-neutral-950"
//         placeholder="Type here..."
//       />
//       <button className="font-bold bg-neutral-950 text-zinc-200 rounded focus:outline-none p-2 h-full flex items-center justify-center">
//         <IoSearch className="h-4 w-4" /> {/* Adjust the icon size if needed */}
//       </button>
//     </div>
//   );
// };

// export default SearchBar;
// import React, { useState } from "react";
// import { IoSearch } from "react-icons/io5";

// const SearchBar = ({ suggestions, query, setQuery, onSearch, onSelectCompany }) => {
//   return (
//     <div className="relative w-full max-w-5xl">
//       <div className="flex items-center bg-zinc-100 mt-1 px-3 py-2 rounded-md">
//         <p className="text-gray-500 inline-flex items-center">
//           <IoSearch className="mr-1" /> Companies
//         </p>

//         <input
//           type="text"
//           className="bg-transparent focus:outline-none px-4 w-full font-semibold text-neutral-950"
//           placeholder="Type here..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)} // Update query state
//         />
//         <button
//           className="font-bold bg-neutral-950 text-zinc-200 rounded focus:outline-none p-2 h-full flex items-center justify-center"
//           onClick={() => onSearch(query)}
//         >
//           <IoSearch className="h-4 w-4" />
//         </button>
//       </div>

//       {/* Suggestions Dropdown */}
//       {suggestions.length > 0 && (
//         <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-2 max-h-48 overflow-y-auto shadow-lg">
//           {suggestions.map((suggestion, index) => (
//             <div
//               key={index}
//               className="p-2 hover:bg-gray-100 cursor-pointer"
//               onClick={() => onSelectCompany(suggestion)}
//             >
//               {suggestion.name}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchBar;

import React from "react";
import { IoSearch } from "react-icons/io5";

const SearchBar = ({ suggestions, query, setQuery, onSearch, onSelectCompany }) => {
  // Helper function to bold matching text
  const highlightMatch = (text, query) => {
    const regex = new RegExp(`(${query})`, 'gi'); // case-insensitive matching
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? <strong key={index}>{part}</strong> : part
    );
  };

  return (
    <div className="relative w-full max-w-5xl">
      <div className="flex items-center bg-zinc-100 mt-1 px-3 py-2 rounded-md">
        <p className="text-gray-500 inline-flex items-center">
          <IoSearch className="mr-1" /> Companies
        </p>

        <input
          type="text"
          className="bg-transparent focus:outline-none px-4 w-full font-semibold text-neutral-950"
          placeholder="Type here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)} // Update query state
        />
        <button
          className="font-bold bg-neutral-950 text-zinc-200 rounded focus:outline-none p-2 h-full flex items-center justify-center"
          onClick={() => onSearch(query)}
        >
          <IoSearch className="h-4 w-4" />
        </button>
      </div>

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-2 max-h-48 overflow-y-auto shadow-lg">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => onSelectCompany(suggestion)}
            >
              {/* Bold matching parts in company name and department */}
              <div className="font-normal">
                {highlightMatch(suggestion.name, query)} - {highlightMatch(suggestion.department, query)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
