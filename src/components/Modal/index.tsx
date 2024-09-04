import React from "react";
import { ModalProps } from "@/types";
import Link from "next/link";

export const Modal = ({ isOpen, onClose, title, message }: ModalProps) => {
  // Initialize the router for navigation

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="text-gray-700">{message}</p>
        <div className="flex justify-end space-x-4 mt-6">
          {/* Button to add another book */}
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
            onClick={onClose} // Resets the form and closes modal
          >
            Add Another Book
          </button>

          {/* Button to navigate to the search page */}
          <Link href="/search">
            <button className="bg-gray-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700">
              Go to Search Page
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
