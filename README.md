ABOUT THE PROJECT.
Features:
Search Functionality:

Users can search books by title, author, or publisher.
Search results are filtered dynamically based on user input.
Add Book Feature:

Users can add a new book by filling in details such as title, description, categories, author, publisher, year, pages, and more.
Form validation is implemented to ensure data integrity (e.g., title length, description starting with an uppercase letter, ISBN validation).
Books added by users are stored locally (in localStorage) to persist across sessions.
Book Details Page:

Clicking on a book from the search results displays its detailed information including author, description, rating, ISBN, and an option to favorite or share.
Books You Might Like:

At the bottom of each book detail page, a list of other suggested books is displayed for user engagement.
Image Handling:

Users can upload an image when adding a new book, which is previewed before submission.
Form Validations:

Detailed form validation is applied for fields like title, description, author, ISBN-10/ISBN-13, and more based on specific constraints.
Tech Stack:
Next.js (App Router): For building the user interface and server-side rendering.
TypeScript: For strong typing across the entire application.
Tailwind CSS: For responsive and flexible styling.
LocalStorage: Used to persist user-added books and retain them across sessions.
Installation and Setup:
Clone the repository: git clone <repository-url>
Install dependencies: npm install
Run the development server: npm run dev


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
