"use client";
import { Book } from "@/types";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

export default function AddBookPage() {
  const [bookDetails, setBookDetails] = useState({
    title: "",
    description: "",
    categories: "",
    author: "",
    publisher: "",
    year: "",
    pages: "",
    image: "",
    rating: "",
    isbn10: "",
    isbn13: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    categories: "",
    author: "",
    publisher: "",
    year: "",
    pages: "",
    isbn10: "",
    isbn13: "",
  });

  const [books, setBooks] = useState<Book[]>([]); // Book list state
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    // Load books from localStorage on page load
    const storedBooks = localStorage.getItem("books");
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
    }
  }, []);
  const validateField = (name: string, value: string) => {
    let error = "";

    switch (name) {
      case "title":
        if (value.length < 10 || value.length > 120) {
          error = "Title must be between 10 and 120 characters.";
        }
        if (!/^[A-Za-z0-9@”#&*! ]+$/.test(value)) {
          error = "Title can include only these special characters: @”#&*!";
        }
        break;

      case "description":
        if (value.length > 512) {
          error = "Description must be no more than 512 characters.";
        }
        if (!/^[A-Z]/.test(value)) {
          error = "Description must start with an uppercase letter.";
        }
        break;

      case "categories":
        if (value.split(",").length > 4) {
          error = "You can specify up to 4 categories.";
        }
        break;

      case "author":
        if (value.split(",").length > 3) {
          error = "You can specify up to 3 authors.";
        }
        break;

      case "publisher":
        if (value.length < 5 || value.length > 60) {
          error = "Publisher name must be between 5 and 60 characters.";
        }
        break;

      case "year":
        if (!/^\d{4}$/.test(value)) {
          error = "Year must be a 4-digit number.";
        }
        break;

      case "pages":
        if (parseInt(value) > 9999) {
          error = "Number of pages must be less than 9999.";
        }
        break;

      case "isbn10":
        if (!/^\d{10}$/.test(value)) {
          error = "ISBN-10 must be a 10-digit number.";
        }
        break;

      case "isbn13":
        if (!/^\d{13}$/.test(value)) {
          error = "ISBN-13 must be a 13-digit number.";
        }
        break;

      default:
        break;
    }

    return error;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setBookDetails({ ...bookDetails, [name]: value });
    setErrors({ ...errors, [name]: error });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBookDetails({ ...bookDetails, image: file as any });
      setImagePreview(URL.createObjectURL(file)); // Create a preview URL for the uploaded image
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("hello");
    // Check if there are any validation errors
    const isValid = Object.values(errors).every((error) => error === "");
    if (isValid) {
      // Add the new book to the list of books
      const updatedBooks = [...books, bookDetails] as Book[];
      setBooks(updatedBooks);

      // Save the updated list to localStorage
      localStorage.setItem("books", JSON.stringify(updatedBooks));

      console.log("Book details submitted and saved:", updatedBooks);

      // Optionally, reset the form after saving
      setBookDetails({
        title: "",
        description: "",
        categories: "",
        author: "",
        publisher: "",
        year: "",
        pages: "",
        image: "",
        rating: "",
        isbn10: "",
        isbn13: "",
      });
      setImagePreview(null);
    } else {
      console.error("Please correct the errors in the form before submitting.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Add a New Book</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 mb-6 flex flex-col md:flex-row"
      >
        {/* Left side of the card - Book details */}
        <div className="flex-grow md:mr-6">
          {/* Title */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={bookDetails.title}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.title ? "border-red-500" : ""
              }`}
              required
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={bookDetails.description}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.description ? "border-red-500" : ""
              }`}
              required
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          {/* Categories */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="categories"
            >
              Categories
            </label>
            <input
              id="categories"
              name="categories"
              type="text"
              value={bookDetails.categories}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.categories ? "border-red-500" : ""
              }`}
              required
            />
            {errors.categories && (
              <p className="text-red-500 text-sm">{errors.categories}</p>
            )}
          </div>

          {/* Author Name */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="author"
            >
              Author Names
            </label>
            <input
              id="author"
              name="author"
              type="text"
              value={bookDetails.author}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.author ? "border-red-500" : ""
              }`}
              required
            />
            {errors.author && (
              <p className="text-red-500 text-sm">{errors.author}</p>
            )}
          </div>

          {/* Publisher */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="publisher"
            >
              Publisher
            </label>
            <input
              id="publisher"
              name="publisher"
              type="text"
              value={bookDetails.publisher}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.publisher ? "border-red-500" : ""
              }`}
              required
            />
            {errors.publisher && (
              <p className="text-red-500 text-sm">{errors.publisher}</p>
            )}
          </div>

          {/* Year and Pages */}
          <div className="flex gap-4 mb-4">
            <div className="flex-grow">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="year"
              >
                Year
              </label>
              <input
                id="year"
                name="year"
                type="text"
                value={bookDetails.year}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.year ? "border-red-500" : ""
                }`}
                required
              />
              {errors.year && (
                <p className="text-red-500 text-sm">{errors.year}</p>
              )}
            </div>
            <div className="flex-grow">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="pages"
              >
                Page Numbers
              </label>
              <input
                id="pages"
                name="pages"
                type="number"
                value={bookDetails.pages}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.pages ? "border-red-500" : ""
                }`}
                required
              />
              {errors.pages && (
                <p className="text-red-500 text-sm">{errors.pages}</p>
              )}
            </div>
          </div>
        </div>

        {/* Right side of the card - Image, Rating, ISBN */}
        <div className="w-full md:w-1/3">
          {/* Image Upload */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="image"
            >
              Upload Image
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
            {imagePreview && (
              <div className="mt-4">
                <p className="text-gray-700 text-sm">Image Preview:</p>
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="mt-2 rounded-lg w-full h-auto"
                />
              </div>
            )}
          </div>

          {/* Rating */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="rating"
            >
              Rating
            </label>
            <input
              id="rating"
              name="rating"
              type="number"
              value={bookDetails.rating}
              onChange={handleInputChange}
              min="0"
              max="5"
              step="0.5"
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          {/* ISBN-10 */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="isbn10"
            >
              ISBN-10
            </label>
            <input
              id="isbn10"
              name="isbn10"
              type="text"
              value={bookDetails.isbn10}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.isbn10 ? "border-red-500" : ""
              }`}
              required
            />
            {errors.isbn10 && (
              <p className="text-red-500 text-sm">{errors.isbn10}</p>
            )}
          </div>

          {/* ISBN-13 */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="isbn13"
            >
              ISBN-13
            </label>
            <input
              id="isbn13"
              name="isbn13"
              type="text"
              value={bookDetails.isbn13}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.isbn13 ? "border-red-500" : ""
              }`}
              required
            />
            {errors.isbn13 && (
              <p className="text-red-500 text-sm">{errors.isbn13}</p>
            )}
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>

      {/* Add Another Book Button */}
      <button
        onClick={() => console.log("Add another book")}
        className="flex items-center mt-4 text-blue-600 hover:text-blue-700"
      >
        <FaPlus className="mr-2" /> Add Another Book
      </button>
    </div>
  );
}
