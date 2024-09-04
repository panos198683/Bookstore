import React from "react";
import Image from "next/image"; // Importing Image component from Next.js
import Link from "next/link";
import { StarRating } from "../StarRating";
import { ProductCardProps } from "@/types";

export default function ProductCard({
  isbn,
  title,
  image,
  rating,
}: ProductCardProps) {
  return (
    <Link href={`/book/${isbn}`} passHref>
      <div className="border border-gray-300 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer">
        {/* Display the book image */}
        <div className="w-full h-48 mb-4 relative">
          <Image
            src={image || ""} // Use the image URL from JSON
            alt={title}
            layout="fill"
            objectFit="contain"
            className="rounded-lg w-auto h-auto"
          />
        </div>
        {/* Book title */}
        <h2 className="text-lg font-semibold mb-2 overflow-hidden text-ellipsis whitespace-nowrap">
          {title}
        </h2>
        {/* Display star rating */}
        <div className="flex items-center">
          <StarRating rating={rating as number} />
        </div>
      </div>
    </Link>
  );
}
