export interface Book {
  isbn: string;
  subtitle: string;
  published: string;
  website: string;
  title: string;
  description: string;
  categories: never[];
  author: string;
  publisher: string;
  year: number;
  pages: number | string;
  image: string | null;
  rating: number | string;
  isbn10: string;
  isbn13: string;
  id?: string; 
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}
export interface Params {
  id: string;
}
export interface ProductCardProps {
  isbn: string;
  title: string;
  image: string;
  rating: number | string;
}
export type BookDetails = Partial<Book>;

export type BookErrors = Partial<Record<keyof Book, string>>;
