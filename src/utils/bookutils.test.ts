import React from "react";
import {
  loadBooksFromLocalStorage,
  fetchBooksFromApi,
  mergeBooks,
  generateUniqueId,
  validateField,
} from "./bookutils";
import { Book } from "@/types";

// Mock the `localStorage` for testing
const mockBooks: Book[] = [
  {
    isbn: "1234567890",
    title: "Test Book 1",
    author: "Author 1",
    description: "",
    publisher: "",
    published: "",
    pages: "200",
    image: "",
    rating: 4,
    isbn10: "1234567890",
    isbn13: "1234567890123",
    subtitle: "",
    website: "",
    categories: [],
    year: 5,
  },
  {
    isbn: "0987654321",
    title: "Test Book 2",
    author: "Author 2",
    description: "",
    publisher: "",
    published: "",
    pages: "300",
    image: "",
    rating: 3,
    isbn10: "0987654321",
    isbn13: "0987654321098",
    subtitle: "",
    website: "",
    categories: [],
    year: 5,
  },
];

describe("bookutils", () => {
  // 1. Test `loadBooksFromLocalStorage`
  describe("loadBooksFromLocalStorage", () => {
    it("returns books from localStorage if available", () => {
      localStorage.setItem("books", JSON.stringify(mockBooks));
      const books = loadBooksFromLocalStorage();
      expect(books).toEqual(mockBooks);
    });

    it("returns an empty array if no books are in localStorage", () => {
      localStorage.removeItem("books");
      const books = loadBooksFromLocalStorage();
      expect(books).toEqual([]);
    });
  });

  // 2. Test `fetchBooksFromApi`
  describe("fetchBooksFromApi", () => {
    beforeEach(() => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve({ books: mockBooks }),
        })
      ) as jest.Mock;
    });

    it("fetches books from the API", async () => {
      const books = await fetchBooksFromApi();
      expect(books).toEqual(mockBooks);
      expect(global.fetch).toHaveBeenCalledWith("/api/books");
    });
  });

  // 3. Test `mergeBooks`
  describe("mergeBooks", () => {
    it("merges two arrays of books correctly", () => {
      const newBooks: Book[] = [
        {
          isbn: "1234567890",
          title: "Test Book 3",
          author: "Author 3",
          description: "",
          publisher: "",
          published: "",
          pages: "400",
          image: "",
          rating: 5,
          isbn10: "1111111111",
          isbn13: "1111111111111",
          subtitle: "",
          website: "",
          categories: [],
          year: 2000,
        },
      ];
      const mergedBooks = mergeBooks(mockBooks, newBooks);
      expect(mergedBooks).toEqual([...mockBooks, ...newBooks]);
    });
  });

  // 4. Test `generateUniqueId`
  describe("generateUniqueId", () => {
    it("generates a unique ID each time", () => {
      const id1 = generateUniqueId();
      const id2 = generateUniqueId();
      expect(id1).not.toEqual(id2);
      expect(id1).toMatch(/^_[a-z0-9]{9}$/); // Ensures the format is correct
    });
  });

  // 5. Test `validateField`
  describe("validateField", () => {
    it("validates the title field correctly", () => {
      expect(validateField("title", "Short")).toBe(
        "Title must be between 10 and 120 characters."
      );
      expect(validateField("title", "Valid Title")).toBe("");
    });

    it("validates the description field correctly", () => {
      expect(validateField("description", "lowercase start")).toBe(
        "Description must start with an uppercase letter."
      );
      expect(validateField("description", "Valid Description")).toBe("");
    });

    it("validates the categories field correctly", () => {
      expect(validateField("categories", "cat1,cat2,cat3,cat4,cat5")).toBe(
        "You can specify up to 4 categories."
      );
      expect(validateField("categories", "cat1,cat2")).toBe("");
    });

    it("validates the author field correctly", () => {
      expect(validateField("author", "Author1,Author2,Author3,Author4")).toBe(
        "You can specify up to 3 authors."
      );
      expect(validateField("author", "Author1,Author2")).toBe("");
    });

    it("validates the publisher field correctly", () => {
      expect(validateField("publisher", "Pub")).toBe(
        "Publisher name must be between 5 and 60 characters."
      );
      expect(validateField("publisher", "Valid Publisher")).toBe("");
    });

    it("validates the year field correctly", () => {
      expect(validateField("year", "abc")).toBe(
        "Year must be a 4-digit number."
      );
      expect(validateField("year", "2021")).toBe("");
    });

    it("validates the pages field correctly", () => {
      expect(validateField("pages", "10000")).toBe(
        "Number of pages must be a valid number less than 9999."
      );
      expect(validateField("pages", "500")).toBe("");
    });

    it("validates the rating field correctly", () => {
      expect(validateField("rating", "6")).toBe(
        "Rating must be a number between 0 and 5 in increments of 0.5."
      );
      expect(validateField("rating", "4.5")).toBe("");
    });

    it("validates the isbn10 and isbn13 fields correctly", () => {
      expect(validateField("isbn10", "123")).toBe(
        "ISBN-10 must be a 10-digit number."
      );
      expect(validateField("isbn10", "1234567890")).toBe("");
      expect(validateField("isbn13", "123")).toBe(
        "ISBN-13 must be a 13-digit number."
      );
      expect(validateField("isbn13", "1234567890123")).toBe("");
    });
  });
});
