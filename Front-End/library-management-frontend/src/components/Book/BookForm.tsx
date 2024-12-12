// src/components/Book/BookForm.tsx
import React, { useState, useEffect } from 'react';
import { Book } from '../../types/Book';
import '../../styles/global.css';

const BOOK_CATEGORIES = [
    'Adventure',
    'Science Fiction',
    'Story',
    'Self Development',
    'Other'
] as const;

interface BookFormProps {
    onAddBook: (book: Book) => void;
    onEditBook: (book: Book) => void;
    editingBook: Book | null;
}

const BookForm: React.FC<BookFormProps> = ({ onAddBook, onEditBook, editingBook }) => {
    const [book, setBook] = useState<Book>({ 
        id: 0, 
        title: '', 
        author: '', 
        description: '', 
        category: BOOK_CATEGORIES[0] 
    });

    useEffect(() => {
        if (editingBook) {
            setBook(editingBook);
        } else {
            setBook({ 
                id: 0, 
                title: '', 
                author: '', 
                description: '', 
                category: BOOK_CATEGORIES[0] 
            });
        }
    }, [editingBook]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingBook) {
            onEditBook(book);
        } else {
            onAddBook({ ...book, id: Date.now() });
        }
        setBook({ 
            id: 0, 
            title: '', 
            author: '', 
            description: '', 
            category: BOOK_CATEGORIES[0] 
        });
    };

    return (
        <form className="book-form" onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="title" 
                value={book.title} 
                onChange={handleChange} 
                placeholder="Title" 
                required 
            />
            <input 
                type="text" 
                name="author" 
                value={book.author} 
                onChange={handleChange} 
                placeholder="Author" 
                required 
            />
            <textarea 
                name="description" 
                value={book.description} 
                onChange={handleChange} 
                placeholder="Description" 
                required 
            />
            <select 
                name="category" 
                value={book.category} 
                onChange={handleChange}
                required
            >
                {BOOK_CATEGORIES.map(category => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
            <button type="submit">{editingBook ? 'Update Book' : 'Add Book'}</button>
        </form>
    );
};

export default BookForm;