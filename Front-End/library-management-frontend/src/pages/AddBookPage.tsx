import React from 'react';
import BookForm from '../components/Book/BookForm.tsx';

const AddBookPage: React.FC = () => {
    return (
        <div>
            <h1>Add a New Book</h1>
            <BookForm onAddBook={() => {}} onEditBook={() => {}} editingBook={null} />
        </div>
    );
};

export default AddBookPage;