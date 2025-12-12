import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import {
  useCreateBookMutation,
  useUpdateBookMutation,
  type BookDto,
} from "../services/Books/BookApi";

type BookForm = {
  name: string;
  description: string;
  author: string;
  quantity: number | "";
  price: number | "";
};

interface BookModalProps {
  isOpen: boolean;
  onClose: () => void;
  book?: BookDto | null;
}

export const BookModal: React.FC<BookModalProps> = ({ isOpen, onClose, book }) => {
  const [formData, setFormData] = useState<BookForm>({
    name: "",
    description: "",
    author: "",
    quantity: "",
    price: "",
  });

  const [createBook, { isLoading: isCreating }] = useCreateBookMutation();
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

  const isLoading = isCreating || isUpdating;
  const isEditMode = !!book;

  useEffect(() => {
    if (isOpen) {
      if (isEditMode && book) {
        setFormData({
          name: book.name,
          description: book.description,
          author: book.author,
          quantity: book.quantity,
          price: book.price,
        });
      } else {
        setFormData({
          name: "",
          description: "",
          author: "",
          quantity: "",
          price: "",
        });
      }
    }
  }, [isOpen, book, isEditMode]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const numericFields = ["quantity", "price"];
    const fieldValue = numericFields.includes(name)
      ? value === "" ? "" : Number(value)
      : value;
    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        quantity: Number(formData.quantity),
        price: Number(formData.price),
      };
      if (isEditMode && book) {
        await updateBook({ id: book.id, book: payload }).unwrap();
      } else {
        await createBook(payload).unwrap();
      }
      setFormData({
        name: "",
        description: "",
        author: "",
        quantity: "",
        price: "",
      });
      onClose();
    } catch (err) {
      console.error("Failed to save book:", err);
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      description: "",
      author: "",
      quantity: "",
      price: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">
          {isEditMode ? "Update Book" : "Add New Book"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Book Name */}
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">
              Book Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter book name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Author */}
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">
              Author
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              placeholder="Enter author name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Enter book description"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">
              Price
            </label>
            <input
              type="text"
              inputMode="decimal"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              placeholder="Enter book price"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">
              Quantity
            </label>
            <input
              type="text"
              inputMode="numeric"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              placeholder="Enter quantity"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 font-semibold text-white transition-colors duration-300 bg-gray-500 rounded hover:bg-gray-600"
              disabled={isLoading}
            >
              Cancel
            </button>
            <Button
              type="submit"
              label={isLoading ? (isEditMode ? "Updating..." : "Creating...") : isEditMode ? "Update Book" : "Create Book"}
              onClick={() => {}}
              variant={isEditMode ? "secondary" : "primary"}
              disabled={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
