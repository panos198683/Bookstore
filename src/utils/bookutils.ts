import { Book } from "@/types";

// Utility to fetch books from localStorage
export const loadBooksFromLocalStorage = (): Book[] => {
  const storedBooks = localStorage.getItem("books");
  return storedBooks ? JSON.parse(storedBooks) : [];
};

// Utility to fetch books from API
export const fetchBooksFromApi = async (): Promise<Book[]> => {
  const response = await fetch("/api/books");
  const data = await response.json();
  return data.books;
};

// Utility to merge books
export const mergeBooks = (storedBooks: Book[], apiBooks: Book[]): Book[] => {
  return [...storedBooks, ...apiBooks];
};

// Utility to generate unique ID
export const generateUniqueId = (): string => {
  return "_" + Math.random().toString(36).substr(2, 9);
};
// Validate input fields
export const validateField = (name: string, value: string) => {
  let error = "";

  switch (name) {
    case "title":
      if (value.length < 10 || value.length > 120) {
        return "Title must be between 10 and 120 characters.";
      }
      if (!/^[A-Za-z0-9@”#&*! ]+$/.test(value)) {
        return "Title can include only these special characters: @”#&*!";
      }
      break;

    case "description":
      if (value.length > 512) {
        return "Description must be no more than 512 characters.";
      }
      if (!/^[A-Z]/.test(value)) {
        return "Description must start with an uppercase letter.";
      }
      break;

    case "categories":
      if (value.split(",").length > 4) {
        return "You can specify up to 4 categories.";
      }
      break;

    case "author":
      if (value.split(",").length > 3) {
        return "You can specify up to 3 authors.";
      }
      break;

    case "publisher":
      if (value.length < 5 || value.length > 60) {
        return "Publisher name must be between 5 and 60 characters.";
      }
      break;

    case "year":
      if (!/^\d{4}$/.test(value)) {
        return "Year must be a 4-digit number.";
      }
      break;

    case "pages":
      const pagesNumber = parseInt(value);
      if (isNaN(pagesNumber) || pagesNumber > 9999) {
        return "Number of pages must be a valid number less than 9999.";
      }
      break;

    case "rating":
      const ratingNumber = parseFloat(value);
      if (
        isNaN(ratingNumber) ||
        ratingNumber < 0 ||
        ratingNumber > 5 ||
        ratingNumber % 0.5 !== 0
      ) {
        return "Rating must be a number between 0 and 5 in increments of 0.5.";
      }
      break;

    case "isbn10":
      if (!/^\d{10}$/.test(value)) {
        return "ISBN-10 must be a 10-digit number.";
      }
      break;

    case "isbn13":
      if (!/^\d{13}$/.test(value)) {
        return "ISBN-13 must be a 13-digit number.";
      }
      break;

    default:
      break;
  }

  return error;
};
