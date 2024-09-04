import React from "react";
import Link from "next/link";
import { FaHome, FaPlus } from "react-icons/fa"; // Importing a home icon from react-icons

export function Header() {
  return (
    <header className="bg-gradient-to-r from-slate-500 to-slate-400 text-white font-bold text-2xl py-4 shadow-md font-mono flex items-center justify-between px-6">
      {/* Home button as an icon, left-aligned */}
      <Link href="/search" passHref>
        <p className="text-white text-xl hover:text-gray-300">
          <FaHome />
        </p>
      </Link>

      {/* Title, centered */}
      <p className="flex-grow text-center">📚 Bookstore</p>

      {/* Empty div to balance the flex layout */}
      <Link href="/newBook" passHref>
        <p className="text-white text-lg hover:text-gray-300">
          add new book
          <FaPlus />{" "}
        </p>
      </Link>
    </header>
  );
}
