// src/services/bookService.tsx
import axios, { AxiosError } from 'axios';
import { Book } from '../types/Book';

const API_BASE_URL = 'https://localhost:3000/api'; // Update this to match your backend URL

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add request/response interceptors
api.interceptors.response.use(
    response => response,
    (error: AxiosError) => {
        console.error('API Error:', error.message);
        throw error;
    }
);

export const bookService = {
    getBooks: async (): Promise<Book[]> => {
        try {
            const response = await api.get('/books');
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch books');
        }
    },

    getBookById: async (id: number): Promise<Book> => {
        try {
            const response = await api.get(`/books/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch book with id ${id}`);
        }
    },

    addBook: async (book: Omit<Book, 'id'>): Promise<Book> => {
        try {
            const response = await api.post('/books', book);
            return response.data;
        } catch (error) {
            throw new Error('Failed to add book');
        }
    },

    updateBook: async (id: number, book: Book): Promise<Book> => {
        try {
            const response = await api.put(`/books/${id}`, book);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to update book with id ${id}`);
        }
    },

    deleteBook: async (id: number): Promise<void> => {
        try {
            await api.delete(`/books/${id}`);
        } catch (error) {
            throw new Error(`Failed to delete book with id ${id}`);
        }
    }
};

export default bookService;