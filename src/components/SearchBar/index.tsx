import React from "react";

export function SearchBar({
  query,
  setQuery,
  onSearch,
}: {
  query: string;
  setQuery: (query: string) => void;
  onSearch: (query: string) => void;
}) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery); // Update the search query
    onSearch(newQuery); // Trigger the search
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search products..."
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
      <button
        className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm"
        onClick={() => onSearch(query)}
      >
        Search
      </button>
    </div>
  );
}
