// src/components/HomePage.tsx
import React from 'react';
import BookList from '../components/Book/BookList.tsx';
import BookForm from '../components/Book/BookForm.tsx';
import ConfirmDialog from '../components/Common/ConfirmDialog.tsx';
import { Book } from '../types/Book';
import '../styles/global.css';

const HomePage: React.FC = () => {
    const [books, setBooks] = React.useState<Book[]>([]);
    const [editingBook, setEditingBook] = React.useState<Book | null>(null);
    const [deleteConfirm, setDeleteConfirm] = React.useState<{show: boolean; bookId: number | null}>({
        show: false,
        bookId: null
    });

    const handleAddBook = (newBook: Book) => {
        setBooks([...books, newBook]);
    };

    const handleEditBook = (updatedBook: Book) => {
        setBooks(books.map(book => (book.id === updatedBook.id ? updatedBook : book)));
        setEditingBook(null);
    };

    const handleDeleteConfirm = (bookId: number) => {
        setDeleteConfirm({ show: true, bookId });
    };

    const handleDeleteBook = () => {
        if (deleteConfirm.bookId) {
            setBooks(books.filter(book => book.id !== deleteConfirm.bookId));
            setDeleteConfirm({ show: false, bookId: null });
        }
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
                onDelete={handleDeleteConfirm} 
            />
            <ConfirmDialog 
                isOpen={deleteConfirm.show}
                onConfirm={handleDeleteBook}
                onCancel={() => setDeleteConfirm({ show: false, bookId: null })}
                title="Confirm Delete"
                message="Are you sure you want to delete this book?"
            />
        </div>
    );
};

export default HomePage;