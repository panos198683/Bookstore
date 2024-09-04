"use client";
import React, { useEffect, useState } from "react";
import { Book, BookDetails, BookErrors } from "@/types";
import { generateUniqueId, validateField } from "@/utils/bookutils";
import { Modal } from "@/components/Modal";

export default function AddBookPage() {
  const [bookDetails, setBookDetails] = useState<BookDetails>({
    title: "",
    description: "",
    categories: [],
    author: "",
    publisher: "",
    year: 0,
    pages: 0,
    image: null || "", // image can be null initially
    rating: 0, // rating is optional
    isbn10: "",
    isbn13: "",
  });

  const [errors, setErrors] = useState<BookErrors>({
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

  const [books, setBooks] = useState<Book[]>([]); // State for books
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  useEffect(() => {
    // Load books from localStorage on page load
    const storedBooks = localStorage.getItem("books");
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
    }
  }, []);

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setBookDetails({ ...bookDetails, [name]: value });
    setErrors({ ...errors, [name]: error });
  };

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setBookDetails({ ...bookDetails, image: base64String });
        setImagePreview(base64String); // Set the image preview
      };
      reader.readAsDataURL(file); // Convert the file to base64 string
    }
  };

  // Prevent keyboard input for rating field, allowing only arrows, backspace, and delete
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = ["ArrowUp", "ArrowDown", "Backspace", "Delete"];
    if (!allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !bookDetails.title ||
      !bookDetails.author ||
      !bookDetails.isbn10 ||
      !bookDetails.isbn13
    ) {
      // Handle validation errors or return early
      console.error("Missing required fields");
      return;
    }
    // Add a unique ID if the book doesn't have an ISBN-10 or ISBN-13
    const newBook: Book = {
      ...bookDetails, // Spread the book details
      isbn: generateUniqueId(), // Generate a unique ID
      image: bookDetails.image || "", // Default to empty string if image is missing
      rating: bookDetails.rating || 0, // Parse rating, default to 0
      subtitle: bookDetails.subtitle || "", // Ensure subtitle is a string
      published: new Date().toISOString(), // Set a default published date if necessary
      website: bookDetails.website || "", // Set a default website if necessary
    } as Book; // Type assertion to ensure all required fields are present

    const updatedBooks = [...books, newBook];
    localStorage.setItem("books", JSON.stringify(updatedBooks));
    setBooks(updatedBooks);
    // Show modal to notify user
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal
    setImagePreview(null); // Clear image preview
    setBookDetails({
      title: "",
      description: "",
      categories: [],
      author: "",
      publisher: "",
      year: 0,
      pages: 0,
      image: null,
      rating: 0,
      isbn10: "",
      isbn13: "",
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Add a New Book</h1>

      <form
        name="form"
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
              onKeyDown={handleKeyDown} // Disable keyboard input except for allowed keys
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
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 "
          >
            Save
          </button>
        </div>
      </form>

      {/* Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal} // Close modal handler
        title="Book Added"
        message="The book has been successfully added."
      />
    </div>
  );
}
