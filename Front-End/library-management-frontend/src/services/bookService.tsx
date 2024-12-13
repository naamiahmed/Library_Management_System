// src/services/api.ts
import axios from 'axios';
import { Book } from '../types/Book';

const API_BASE_URL = 'https://localhost:7001/api';

const api = axios.create({
  baseURL: API_BASE_URL
});

export const bookService = {
  getBooks: async () => {
    const response = await api.get('/books');
    return response.data;
  },

  addBook: async (book: Omit<Book, 'id'>) => {
    const response = await api.post('/books', book);
    return response.data;
  },

  updateBook: async (id: number, book: Book) => {
    const response = await api.put(`/books/${id}`, book);
    return response.data;
  },

  deleteBook: async (id: number) => {
    await api.delete(`/books/${id}`);
  }
};