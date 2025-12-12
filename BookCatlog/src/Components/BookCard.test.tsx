import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BookCard } from './BookCard';

const mockBook = {
  id: 1,
  name: 'Test Book',
  description: 'A test description',
  author: 'Test Author',
  quantity: 3,
  price: 19.99,
};

describe('BookCard', () => {
  it('renders book details', () => {
    render(
      <BookCard book={mockBook} onUpdate={jest.fn()} onDelete={jest.fn()} />
    );
    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText(/Test Author/)).toBeInTheDocument();
    expect(screen.getByText(/A test description/)).toBeInTheDocument();
    expect(screen.getByText(/\$19.99/)).toBeInTheDocument();
    expect(screen.getByText(/3/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Update/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Delete/i })).toBeInTheDocument();
  });

  it('calls onUpdate when Update button is clicked', () => {
    const onUpdate = jest.fn();
    render(
      <BookCard book={mockBook} onUpdate={onUpdate} onDelete={jest.fn()} />
    );
    fireEvent.click(screen.getByRole('button', { name: /Update/i }));
    expect(onUpdate).toHaveBeenCalledWith(mockBook.id);
  });

  it('calls onDelete when Delete button is clicked', () => {
    const onDelete = jest.fn();
    render(
      <BookCard book={mockBook} onUpdate={jest.fn()} onDelete={onDelete} />
    );
    fireEvent.click(screen.getByRole('button', { name: /Delete/i }));
    expect(onDelete).toHaveBeenCalledWith(mockBook.id);
  });

  it('disables buttons when isDeleting is true', () => {
    render(
      <BookCard book={mockBook} onUpdate={jest.fn()} onDelete={jest.fn()} isDeleting />
    );
    expect(screen.getByRole('button', { name: /Update/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /Delete/i })).toBeDisabled();
  });
});
