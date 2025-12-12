import { BookApi } from './BookApi';


describe('BookApi', () => {
  it('should have expected endpoints', () => {
    expect(BookApi.endpoints).toHaveProperty('getAllBooks');
    expect(BookApi.endpoints).toHaveProperty('getBookById');
    expect(BookApi.endpoints).toHaveProperty('createBook');
    expect(BookApi.endpoints).toHaveProperty('updateBook');
    expect(BookApi.endpoints).toHaveProperty('deleteBook');
  });

  it('should have correct reducerPath', () => {
    expect(BookApi.reducerPath).toBe('BookApi');
  });
});
