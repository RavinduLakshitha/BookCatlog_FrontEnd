import React, { useState } from "react";
import { MdAdd } from "react-icons/md";
import { Button } from "../Components/Button";
import { BookCard } from "../Components/BookCard";
import { BookModal } from "../Components/AddBookModal";
import {
  useGetAllBooksQuery,
  useDeleteBookMutation,
  type BookDto,
} from "../services/Books/BookApi";

export const BookCatalogPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookDto | null>(null);
  const { data: books = [], isLoading, error } = useGetAllBooksQuery();
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();

  const handleAddBook = () => {
    setSelectedBook(null);
    setIsModalOpen(true);
  };

  const handleUpdateBook = (id: number) => {
    const book = books.find((b) => b.id === id);
    if (book) {
      setSelectedBook(book);
      setIsModalOpen(true);
    }
  };

  const handleDeleteBook = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await deleteBook(id).unwrap();
      } catch (err) {
        console.error("Failed to delete book:", err);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">Loading books...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-red-600">Error loading books. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 min-w-screen">
      <BookModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} book={selectedBook} />
      <div className="py-6 text-white shadow-md bg-fuchsia-50">
        <div className="px-4 mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="pl-6 mb-5 text-5xl font-bold text-black">Book Catalog</h1>
            <Button
              label="Add Book"
              onClick={handleAddBook}
              variant="primary"
              icon={<MdAdd size={18} />}
              pr-5
            />
          </div>
        </div>
      </div>
      <div className="px-4 py-8 mx-auto">

        {/* Books Grid */}
        {books.length === 0 ? (
          <div className="py-12 text-center border border-gray-300 rounded-lg bg-gray-50">
            <p className="mb-4 text-lg font-semibold text-gray-700">No books available</p>
            <Button
              label="Add the first book"
              onClick={handleAddBook}
              variant="primary"
              icon={<MdAdd size={18} />}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {books.map((book: BookDto) => (
              <BookCard
                key={book.id}
                book={book}
                onUpdate={handleUpdateBook}
                onDelete={handleDeleteBook}
                isDeleting={isDeleting}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
