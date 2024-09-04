import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

import BookDetailPage from "./page";
import { BookProvider } from "@/provider/BookContext";

jest.mock("@/provider/BookContext", () => ({
  useBooks: () => ({
    books: [
      {
        isbn: "1234567890",
        title: "Test Book",
        author: "Test Author",
        description: "This is a test book description.",
        published: "2021-01-01",
        pages: 200,
        publisher: "Test Publisher",
        image: "test-image-url.jpg",
        rating: 4.5,
      },
      {
        isbn: "0987654321",
        title: "Another Test Book",
        author: "Another Author",
        description: "Another test book description.",
        published: "2022-01-01",
        pages: 300,
        publisher: "Another Publisher",
        image: "another-test-image-url.jpg",
        rating: 3,
      },
    ],
  }),
}));

describe("BookDetailPage", () => {
  it("should render a message if book is not found", () => {
    render(<BookDetailPage params={{ id: "123" }} />);
    expect(screen.getByText("Book not found.")).toBeInTheDocument();
  });

  it("handles book not found case", () => {
    render(<BookDetailPage params={{ id: "non-existent-id" }} />);

    // Check if the "Book not found" message is displayed
    expect(screen.getByText("Book not found.")).toBeInTheDocument();
  });
});
