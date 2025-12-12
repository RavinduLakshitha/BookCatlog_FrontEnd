import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BookCatalogPage } from './BookCatlogPage';

jest.mock('../services/Books/BookApi', () => ({
  useGetAllBooksQuery: jest.fn(),
  useDeleteBookMutation: jest.fn(() => [jest.fn(), { isLoading: false }]),
  useCreateBookMutation: jest.fn(() => [jest.fn(), { isLoading: false }]),
  useUpdateBookMutation: jest.fn(() => [jest.fn(), { isLoading: false }]),
}));

const { useGetAllBooksQuery } = require('../services/Books/BookApi');

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('BookCatalogPage', () => {
  it('renders book catalog and books', () => {
    useGetAllBooksQuery.mockReturnValue({
      data: [
        { id: 1, name: 'Book 1', description: 'Desc 1', author: 'Author 1', quantity: 2, price: 10 },
        { id: 2, name: 'Book 2', description: 'Desc 2', author: 'Author 2', quantity: 3, price: 20 },
      ],
      isLoading: false,
      error: undefined,
    });
    render(<BookCatalogPage />);
    expect(screen.getByText(/Book Catalog/i)).toBeInTheDocument();
    expect(screen.getByText('Book 1')).toBeInTheDocument();
    expect(screen.getByText('Book 2')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    useGetAllBooksQuery.mockReturnValue({ data: [], isLoading: true, error: undefined });
    render(<BookCatalogPage />);
    expect(screen.getByText((content) => /Loading books/i.test(content))).toBeInTheDocument();
  });

  it('shows error state', () => {
    useGetAllBooksQuery.mockReturnValue({ data: [], isLoading: false, error: true });
    render(<BookCatalogPage />);
    expect(screen.getByText((content) => /Error loading books/i.test(content))).toBeInTheDocument();
  });

  it('shows empty state when no books', () => {
    useGetAllBooksQuery.mockReturnValue({ data: [], isLoading: false, error: undefined });
    render(<BookCatalogPage />);
    expect(screen.getByText((content) => /No books available/i.test(content))).toBeInTheDocument();
    expect(screen.getByText((content) => /Add the first book/i.test(content))).toBeInTheDocument();
  });
});
