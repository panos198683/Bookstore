"use client";
import React from "react";
import { createContext, useContext, useState, ReactNode } from "react";

interface Book {
  isbn13: string;
  isbn10: string;
  year: number;
  categories: never[];
  isbn: string;
  title: string;
  subtitle: string;
  author: string;
  published: string;
  publisher: string;
  image: string;
  rating: number;
  pages: number;
  description: string;
  website: string;
}

interface BookContextType {
  books: Book[];
  setBooks: (books: Book[]) => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBooks must be used within a BookProvider");
  }
  return context;
};

export const BookProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<Book[]>([]);

  return (
    <BookContext.Provider value={{ books, setBooks }}>
      {children}
    </BookContext.Provider>
  );
};
