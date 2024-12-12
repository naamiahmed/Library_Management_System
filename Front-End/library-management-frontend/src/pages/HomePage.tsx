// src/components/HomePage.tsx
import React from 'react';
import BookList from '../components/Book/BookList.tsx';
import BookForm from '../components/Book/BookForm.tsx';
import { Book } from '../types/Book.ts';

const HomePage: React.FC = () => {
    const [books, setBooks] = React.useState<Book[]>([]);
    const [editingBook, setEditingBook] = React.useState<Book | null>(null);

    const handleAddBook = (newBook: Book) => {
        setBooks([...books, newBook]);
    };

    const handleEditBook = (updatedBook: Book) => {
        setBooks(books.map(book => (book.id === updatedBook.id ? updatedBook : book)));
        setEditingBook(null);
    };

    const handleDeleteBook = (bookId: number) => {
        setBooks(books.filter(book => book.id !== bookId));
    };

    const handleEditClick = (book: Book) => {
        setEditingBook(book);
    };

    return (
        <div className="home-page">
            <h1>Library Management System</h1>
            <BookForm 
                onAddBook={handleAddBook} 
                onEditBook={handleEditBook} 
                editingBook={editingBook} 
            />
            <BookList 
                books={books} 
                onEdit={handleEditClick} 
                onDelete={handleDeleteBook} 
            />
        </div>
    );
};

export default HomePage;