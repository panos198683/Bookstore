import React from "react";
import {  render, screen } from "@testing-library/react";
import AddBookPage from "./page";

describe("AddBookPage", () => {
  it("should render the form", () => {
    render(<AddBookPage />);
    const form = screen.getByRole("form");
    expect(form).toBeInTheDocument();
  });
  it("renders the AddBookPage component correctly", () => {
    render(<AddBookPage />);

    // Check if the title is rendered
    const titleElement = screen.getByText(/Add a New Book/i);
    expect(titleElement).toBeInTheDocument();

    // Check if the form input fields are rendered
    const titleInput = screen.getByLabelText(/Title/i);
    const descriptionInput = screen.getByLabelText(/Description/i);
    const categoriesInput = screen.getByLabelText(/Categories/i);
    const authorInput = screen.getByLabelText(/Author Names/i);
    const publisherInput = screen.getByLabelText(/Publisher/i);
    const yearInput = screen.getByLabelText(/Year/i);
    const pagesInput = screen.getByLabelText(/Page Numbers/i);
    const isbn10Input = screen.getByLabelText(/ISBN-10/i);
    const isbn13Input = screen.getByLabelText(/ISBN-13/i);

    // Expect all fields to be in the document
    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(categoriesInput).toBeInTheDocument();
    expect(authorInput).toBeInTheDocument();
    expect(publisherInput).toBeInTheDocument();
    expect(yearInput).toBeInTheDocument();
    expect(pagesInput).toBeInTheDocument();
    expect(isbn10Input).toBeInTheDocument();
    expect(isbn13Input).toBeInTheDocument();
  });
});

it("should render the form", () => {
  const { getByText } = render(<AddBookPage />);
  expect(getByText("Add a New Book")).toBeInTheDocument();
});
