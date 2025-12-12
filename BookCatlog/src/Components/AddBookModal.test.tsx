import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BookModal } from './AddBookModal';

// Mock the hooks from BookApi
jest.mock('../services/Books/BookApi', () => ({
  useCreateBookMutation: () => [jest.fn(), { isLoading: false }],
  useUpdateBookMutation: () => [jest.fn(), { isLoading: false }],
}));

describe('BookModal', () => {
  const onClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Add New Book modal when open', () => {
    render(<BookModal isOpen={true} onClose={onClose} />);
    expect(screen.getByText(/Add New Book/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter book name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter author name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter book description/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter book price/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter quantity/i)).toBeInTheDocument();
  });

  it('does not render modal when isOpen is false', () => {
    render(<BookModal isOpen={false} onClose={onClose} />);
    expect(screen.queryByText(/Add New Book/i)).not.toBeInTheDocument();
  });

  it('calls onClose when Cancel is clicked', () => {
    render(<BookModal isOpen={true} onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));
    expect(onClose).toHaveBeenCalled();
  });

  it('renders Update Book modal in edit mode', () => {
    const book = {
      id: 1,
      name: 'Test Book',
      description: 'Test Desc',
      author: 'Test Author',
      quantity: 5,
      price: 10,
    };
    render(<BookModal isOpen={true} onClose={onClose} book={book} />);
    // There are two elements with 'Update Book' (header and button), so use getAllByText
    expect(screen.getAllByText(/Update Book/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByDisplayValue('Test Book')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Author')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Desc')).toBeInTheDocument();
    expect(screen.getByDisplayValue('5')).toBeInTheDocument();
    expect(screen.getByDisplayValue('10')).toBeInTheDocument();
  });
});
