// src/components/Book/BookCard.tsx
import React from 'react';
import { Book } from '../../types/Book.ts';
import '../../styles/global.css';

interface BookCardProps {
    book: Book;
    onEdit: () => void;
    onDelete: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onEdit, onDelete }) => {
    return (
        <div className="book-card">
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>{book.description}</p>
            <p>Category: {book.category}</p>
            <button onClick={onEdit}>Edit</button>
            <button onClick={onDelete}>Delete</button>
        </div>
    );
};

export default BookCard;