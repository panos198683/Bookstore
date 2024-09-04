"use client";
import React from "react";
import { StarRating } from "@/components/StarRating";
import { useBooks } from "../../../provider/BookContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Params } from "@/types";

export default function BookDetailPage({ params }: { params: Params }) {
  const { books } = useBooks();
  const { id } = params; // Directly access the dynamic route parameter
  const book = books.find((book) => book.isbn === id);

  if (!book) {
    console.log(books);
    return <p>Book not found.</p>;
  }

  const otherBooks = books.filter((b) => b.isbn !== id);

  const [currentPage, setCurrentPage] = useState(0);
  const booksPerPage = 4;
  const totalPages = Math.ceil(otherBooks.length / booksPerPage);

  const handlePageClick = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  const startIndex = currentPage * booksPerPage;
  const selectedBooks = otherBooks.slice(startIndex, startIndex + booksPerPage);

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Section: Image, Author, Rating */}
        <div className="flex flex-col items-center md:w-1/3">
          <Image
            src={book.image}
            alt={book.title}
            width={300}
            height={450}
            objectFit="contain"
            className="rounded-lg"
          />
          <p className="mt-4 text-xl font-semibold">{book.author}</p>
          <StarRating rating={book.rating} />
        </div>

        {/* Right Section: Title, Description, Buttons, and Details */}
        <div className="flex flex-col md:w-2/3">
          <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
          <p className="mb-6 text-gray-700">{book.description}</p>
          <div className="flex gap-4 mb-6">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700">
              Favorite
            </button>
            <button className="bg-gray-300 text-black px-4 py-2 rounded-lg shadow-md hover:bg-gray-400">
              Share
            </button>
          </div>
          <div className="flex flex-col gap-2 text-gray-700">
            <div>
              <strong>Year:</strong> {book.year}
            </div>
            <div>
              <strong>Pages:</strong> {book.pages}
            </div>
            <div>
              <strong>Publisher:</strong> {book.publisher}
            </div>
            <div>
              <strong>ISBN-10:</strong>{" "}
              {book.isbn10 || book.isbn.substring(0, 10)}
            </div>
            <div>
              <strong>ISBN-13:</strong> {book.isbn13 || book.isbn}
            </div>
          </div>
          <div className="flex my-10 self-auto">
            <button className="bg-yellow-500 text-slate-50 px-4 py-2 rounded-lg shadow-md w-44 hover:bg-yellow-700 ">
              Buy
            </button>
          </div>
        </div>
      </div>

      {/* Books You Might Like Section as a Footer */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Books You Might Like</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {selectedBooks.map((otherBook) => (
            <Link
              href={`/book/${otherBook.isbn}`}
              key={otherBook.isbn}
              passHref
            >
              <div className="block min-w-[150px]">
                <div className="relative w-full h-48">
                  <Image
                    src={otherBook.image}
                    alt={otherBook.title}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg w-auto h-auto"
                  />
                </div>
                <p className="text-center mt-2 text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                  {otherBook.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
        {/* Pagination Dots */}
        <div className="flex justify-center mt-4 ">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageClick(index)}
              className={`h-3 w-3 rounded-full mx-1 ${
                currentPage === index ? "bg-[#facc15]" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
