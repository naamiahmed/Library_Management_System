// src/components/Book/BookList.tsx
import React from 'react';
import { Book } from '../../types/Book.ts';
import BookCard from './BookCard.tsx';

interface BookListProps {
    books: Book[];
    onEdit: (book: Book) => void;
    onDelete: (bookId: number) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onEdit, onDelete }) => {
    return (
        <div className="book-list">
            {books.map(book => (
                <BookCard 
                    key={book.id} 
                    book={book} 
                    onEdit={() => onEdit(book)} 
                    onDelete={() => onDelete(book.id)} 
                />
            ))}
        </div>
    );
};

export default BookList;