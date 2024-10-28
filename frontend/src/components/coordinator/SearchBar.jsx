import React, { useState, useEffect, useRef } from "react";
import { IoSearch } from "react-icons/io5";

const SearchBar = ({ suggestions, query, setQuery, onSearch, onSelectCompany }) => {
  const [activeIndex, setActiveIndex] = useState(-1); // To track which item is active
  const inputRef = useRef(null); // Ref for input field

  // Helper function to bold matching text
  const highlightMatch = (text, query) => {
    const regex = new RegExp(`(${query})`, "gi"); // case-insensitive matching
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? <strong key={index}>{part}</strong> : part
    );
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setActiveIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      if (activeIndex > 0) {
        setActiveIndex((prevIndex) => prevIndex - 1);
      } else {
        setActiveIndex(-1); // Move back to input field
        inputRef.current.focus(); // Focus back on the input
      }
    } else if (e.key === "Enter" && activeIndex >= 0) {
      onSelectCompany(suggestions[activeIndex]);
    }
  };

  // Reset active index when query changes
  useEffect(() => {
    setActiveIndex(-1);
  }, [query]);

  return (
    <div className="relative w-full max-w-5xl">
      <div className="flex items-center bg-zinc-100 mt-1 px-3 py-2 rounded-md">
        <p className="text-gray-500 inline-flex items-center">
          <IoSearch className="mr-1" /> Companies
        </p>

        <input
          ref={inputRef} // Attach the ref to input field
          type="text"
          className="bg-transparent focus:outline-none px-4 w-full font-semibold text-neutral-950"
          placeholder="Type here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)} // Update query state
          onKeyDown={handleKeyDown} // Attach keyboard navigation handler
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
              className={`p-2 cursor-pointer ${activeIndex === index ? "bg-gray-200" : "hover:bg-gray-100"}`}
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
