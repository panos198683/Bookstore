import React from "react";

export function FilterSelector({
  onFilterChange,
}: {
  onFilterChange: (filter: string) => void;
}) {
  return (
    <div className="mb-6 flex items-center">
      <label
        htmlFor="filter"
        className="text-lg font-medium text-gray-700 mr-4"
      >
        Search by:
      </label>
      <div className="relative">
        <select
          id="filter"
          onChange={(e) => onFilterChange(e.target.value)}
          className="block appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="publisher">Publisher</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M5.2 7.7l4.8 4.8 4.8-4.8L15 6.3l-5 5-5-5z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
