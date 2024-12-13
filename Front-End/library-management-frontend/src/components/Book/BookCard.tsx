// src/components/Book/BookCard.tsx
import React, { useState } from 'react';
import { Book } from '../../types/Book';
import BookDetailsModal from './BookDetailsModal.tsx';
import '../../styles/global.css';

interface BookCardProps {
    book: Book;
    onEdit: () => void;
    onDelete: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onEdit, onDelete }) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <>
            <div className="book-card" onClick={() => setShowDetails(true)}>
                <h3>{book.title}</h3>
                <p>Author: {book.author}</p>
                <p className="book-description">{book.description.substring(0, 100)}...</p>
                <p>Category: {book.category}</p>
                <div className="book-actions" onClick={e => e.stopPropagation()}>
                    <button onClick={onEdit}>Edit</button>
                    <button onClick={onDelete}>Delete</button>
                </div>
            </div>
            <BookDetailsModal 
                book={book}
                isOpen={showDetails}
                onClose={() => setShowDetails(false)}
            />
        </>
    );
};

export default BookCard;