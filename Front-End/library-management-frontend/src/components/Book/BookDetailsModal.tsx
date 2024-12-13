// src/components/Book/BookDetailsModal.tsx
import React from 'react';
import { Book } from '../../types/Book';

interface BookDetailsModalProps {
    book: Book;
    isOpen: boolean;
    onClose: () => void;
}

const BookDetailsModal: React.FC<BookDetailsModalProps> = ({ book, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content book-details" onClick={e => e.stopPropagation()}>
                <h2>{book.title}</h2>
                <div className="book-detail">
                    <strong>Author:</strong> {book.author}
                </div>
                <div className="book-detail">
                    <strong>Category:</strong> {book.category}
                </div>
                <div className="book-detail">
                    <strong>Description:</strong>
                    <p>{book.description}</p>
                </div>
                <button className="btn-close" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default BookDetailsModal;