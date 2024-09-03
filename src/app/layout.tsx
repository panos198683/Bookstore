import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import "./globals.css";
import { BookProvider } from "../provider/BookContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <BookProvider>
        <body className="bg-slate-300 min-h-screen flex flex-col ">
          <Header />
          <main className="flex-grow container mx-auto p-6">{children}</main>
          <Footer />
        </body>
      </BookProvider>
    </html>
  );
}
