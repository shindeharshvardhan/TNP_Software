// import React from "react";
// import SearchBar from "./SearchBar";

// function Companies() {
//   return (
//     <div className="h-full w-full flex flex-col justify-start items-center text-neutral-950 gap-3 pt-16">
//       <p className="font-semibold text-5xl">Explore</p>
//       <p className="font-normal text-lg">
//         "Search and explore company details to identify the best opportunities
//         for student placements."
//       </p>
//       <SearchBar/>
//     </div>
//   );
// }

// export default Companies;

import React, { useState } from "react";
import SearchBar from "./SearchBar";
import CompanyCard from "./CompanyCard";

function Companies() {
  const [companies, setCompanies] = useState([]); // Store all companies
  const [query, setQuery] = useState(""); // Store search query
  const [suggestions, setSuggestions] = useState([]); // Store company suggestions based on search query
  const [selectedCompany, setSelectedCompany] = useState(null); // Store the selected company

  // Function to fetch suggestions for the query
  const fetchSuggestions = async (query) => {
    try {
      if (query.length > 1) {
        const response = await fetch(`http://localhost:5000/api/companies/search?q=${query}`);
        const data = await response.json();
        setSuggestions(data); // Store suggestions in state
      } else {
        setSuggestions([]); // Clear suggestions when query is too short
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  // Handle selecting a company from the suggestions
  const handleSelectCompany = (company) => {
    setSelectedCompany(company); // Store selected company in state
    setSuggestions([]); // Clear suggestions after selection
    setQuery(""); // Clear the search query
  };

  // Handle returning back to search from company card view
  const handleBack = () => {
    setSelectedCompany(null); // Clear selected company and go back to search
  };

  return (
    <div className="h-full w-full flex flex-col justify-start items-center text-neutral-950 gap-3 pt-16">
      {/* Search Mode */}
      {!selectedCompany ? (
        <>
          <p className="font-semibold text-5xl">Explore</p>
          <p className="font-normal text-lg">
            "Search and explore company details to identify the best opportunities
            for student placements."
          </p>

          {/* Search bar component with suggestions dropdown */}
          <SearchBar
            suggestions={suggestions}
            query={query}
            setQuery={(q) => {
              setQuery(q);
              fetchSuggestions(q); // Fetch suggestions based on the query
            }}
            onSelectCompany={handleSelectCompany} // Handle selection from the search suggestions
          />
        </>
      ) : (
        <>
          {/* Company view with back button */}
          <button
            className="font-bold bg-neutral-950 text-zinc-200 rounded focus:outline-none p-2"
            onClick={handleBack}
          >
            Back to Search
          </button>

          {/* Show the selected company's details */}
          <CompanyCard company={selectedCompany} />
        </>
      )}
    </div>
  );
}

export default Companies;
