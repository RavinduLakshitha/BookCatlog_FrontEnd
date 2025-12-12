import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from './Button';
import { MdEdit } from 'react-icons/md';

describe('Button', () => {
  it('renders with label', () => {
    render(<Button label="Click Me" />);
    expect(screen.getByRole('button', { name: /Click Me/i })).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(<Button label="Click Me" onClick={onClick} />);
    fireEvent.click(screen.getByRole('button', { name: /Click Me/i }));
    expect(onClick).toHaveBeenCalled();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button label="Disabled" disabled />);
    expect(screen.getByRole('button', { name: /Disabled/i })).toBeDisabled();
  });

  it('renders with icon', () => {
    render(<Button label="Edit" icon={<MdEdit data-testid="icon" />} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('applies the correct variant class', () => {
    const { rerender } = render(<Button label="Primary" variant="primary" />);
    expect(screen.getByRole('button')).toHaveClass('bg-green-500');
    rerender(<Button label="Danger" variant="danger" />);
    expect(screen.getByRole('button')).toHaveClass('bg-red-500');
    rerender(<Button label="Secondary" variant="secondary" />);
    expect(screen.getByRole('button')).toHaveClass('bg-orange-500');
  });

  it('applies fullWidth class when fullWidth is true', () => {
    render(<Button label="Full" fullWidth />);
    expect(screen.getByRole('button')).toHaveClass('w-l');
  });
});
