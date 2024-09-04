"use client";
import React, { useEffect, useState } from "react";

import ProductCard from "../../components/ProductCard";
import { useBooks } from "@/provider/BookContext";
import { Book } from "@/types";
import { LoadingComponent } from "@/components/Shared/LoadingComponent";
import { NoProductsFound } from "@/components/Shared/NoProductsFound";
import {
  fetchBooksFromApi,
  loadBooksFromLocalStorage,
  mergeBooks,
} from "@/utils/bookutils";
import { FilterSelector } from "@/components/Filters";
import { SearchBar } from "@/components/SearchBar";

export default function ProductSearchPage() {
  const { books, setBooks } = useBooks(); // Context hook for books
  const [searchResults, setSearchResults] = useState<Book[]>([]); // Typed state
  const [loading, setLoading] = useState<boolean>(true); // Explicit loading state
  const [selectedFilter, setSelectedFilter] = useState<string>("title");
  const [searchQuery, setSearchQuery] = useState<string>(""); // New state for search query

  useEffect(() => {
    const loadBooks = async () => {
      try {
        // Load books from localStorage
        const storedBooks: Book[] = loadBooksFromLocalStorage();

        // Ensure image is always a string, and rating is a number
        const updatedStoredBooks = storedBooks.map((book) => ({
          ...book,
          image: book.image ?? "", // Ensure image is not null
          rating:
            typeof book.rating === "string"
              ? parseFloat(book.rating)
              : book.rating, // Ensure rating is a number
          year: typeof book.year === "string" ? parseInt(book.year) : book.year, // Ensure year is a number
          pages:
            typeof book.pages === "string" ? parseInt(book.pages) : book.pages, // Ensure pages is a number
          categories: [],
        }));

        setBooks(updatedStoredBooks);
        setSearchResults(updatedStoredBooks);

        // Fetch from API and merge
        const apiBooks: Book[] = await fetchBooksFromApi();
        const mergedBooks = mergeBooks(updatedStoredBooks, apiBooks).map(
          (book) => ({
            ...book,
            image: book.image ?? "", // Handle null image
            rating:
              typeof book.rating === "string"
                ? parseFloat(book.rating)
                : book.rating, // Convert string to number if necessary
            pages:
              typeof book.pages === "string"
                ? parseInt(book.pages)
                : book.pages, // Convert string to number if necessary
          })
        );

        setBooks(mergedBooks);
        setSearchResults(mergedBooks);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  const handleSearch = (query: string) => {
    const filteredResults = books.filter((book) => {
      if (selectedFilter === "title") {
        return book.title.toLowerCase().includes(query.toLowerCase());
      }
      if (selectedFilter === "author") {
        return book.author.toLowerCase().includes(query.toLowerCase());
      }
      if (selectedFilter === "publisher") {
        return book.publisher.toLowerCase().includes(query.toLowerCase());
      }

      return false; // default fallback
    });
    setSearchResults(filteredResults);
  };
  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    setSearchQuery(""); // Clear the search query when filter changes
  };

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Search Products</h1>
      <FilterSelector onFilterChange={handleFilterChange} />
      <SearchBar
        query={searchQuery}
        setQuery={setSearchQuery}
        onSearch={handleSearch}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {searchResults.length > 0 ? (
          searchResults.map((book: Book, index) => (
            <ProductCard
              key={book.isbn || index}
              isbn={book.isbn}
              title={book.title}
              image={book.image ?? ""} // Ensure image is never null
              rating={book.rating}
            />
          ))
        ) : (
          <NoProductsFound />
        )}
      </div>
    </div>
  );
}
