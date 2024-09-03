import { NextResponse } from "next/server";
import booksData from "../../data/books.json"; // Adjust path based on your structure

export async function GET() {
  return NextResponse.json(booksData);
}
