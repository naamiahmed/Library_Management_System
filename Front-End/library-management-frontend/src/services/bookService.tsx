import axios from 'axios';
import { Book } from '../types/Book';

const API_URL = 'http://localhost:5000/api/books';

export const getBooks = async (): Promise<Book[]> => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addBook = async (book: Book): Promise<void> => {
    await axios.post(API_URL, book);
};

export const updateBook = async (id: number, book: Book): Promise<void> => {
    await axios.put(`${API_URL}/${id}`, book);
};

export const deleteBook = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};
