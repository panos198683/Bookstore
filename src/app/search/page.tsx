"use client";
import { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import ProductCard from "../../components/ProductCard";
import { useBooks } from "@/provider/BookContext";
import { Book } from "@/types";

export default function ProductSearchPage() {
  const { books, setBooks } = useBooks();
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load books from localStorage on page load
    const storedBooks = localStorage.getItem("books");
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
    }
  }, [setBooks]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("/api/books");
        const data = await response.json();

        // Merge fetched books with stored books
        const storedBooks = localStorage.getItem("books");
        const storedBooksArray = storedBooks ? JSON.parse(storedBooks) : [];

        const allBooks = [...storedBooksArray, ...data.books];

        // Remove duplicates (assuming ISBN is unique)
        const uniqueBooks = Array.from(
          new Set(allBooks.map((book) => book.isbn))
        ).map((isbn) => allBooks.find((book) => book.isbn === isbn));

        setBooks(uniqueBooks); // Set the unique list of books
        setSearchResults(uniqueBooks); // Initialize search results with all books
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [setBooks]);

  const handleSearch = (query: string) => {
    const filteredResults = books.filter(
      (book) =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase())
    ) as Book[];
    setSearchResults(filteredResults);
  };

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Search Products</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {searchResults.length > 0 ? (
          searchResults.map((book: Book) => (
            <ProductCard
              key={book.isbn}
              isbn={book.isbn}
              title={book.title}
              image={book.image} // Pass the image URL
              rating={book.rating} // Pass the rating
            />
          ))
        ) : (
          <NoProductsFound />
        )}
      </div>
    </div>
  );
}

// Loading component for better readability
const LoadingComponent = () => <p>Loading books...</p>;

// No products found component for better readability
const NoProductsFound = () => <p>No products found.</p>;
