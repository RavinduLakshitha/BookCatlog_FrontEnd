import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { Button } from "./Button";
import type { BookDto } from "../services/Books/BookApi";

interface BookCardProps {
  book: BookDto;
  onUpdate: (id: number) => void;
  onDelete: (id: number) => void;
  isDeleting?: boolean;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  onUpdate,
  onDelete,
  isDeleting = false,
}) => {
  return (
    <div className="flex flex-col h-full p-6 transition-shadow duration-300 bg-white rounded-lg shadow-md w-l hover:shadow-lg">
      <h3 className="mb-2 text-3xl font-bold text-gray-900">{book.name}</h3>
      <p className="mb-2 text-gray-700">
        <strong>Author:</strong> {book.author}
      </p>
      <p className="mb-4 text-gray-600 line-clamp-3">{book.description}</p>
      <div className="flex items-center justify-between mb-4 text-sm text-gray-700">
        <span><strong>Price:</strong> ${book.price.toFixed(2)}</span>
        <span><strong>Stock:</strong> {book.quantity}</span>
      </div>
      <div className="flex items-center justify-center gap-20 mask-t-from-90% to-100% mt-auto pt-4 border-t">
        <Button
          label="Update"
          onClick={() => onUpdate(book.id)}
          variant="secondary"
          disabled={isDeleting}
          icon={<MdEdit size={18} />}
        />
        <Button
          label="Delete"
          onClick={() => onDelete(book.id)}
          variant="danger"
          disabled={isDeleting}
          icon={<MdDelete size={18} />}
        />
      </div>
    </div>
  );
};
