import React from 'react';
import { useParams } from 'react-router-dom';
import BookForm from '../components/Book/BookForm.tsx';



const EditBookPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    // Fetch the book details using the id and pass it to the BookForm
    const book = { id: parseInt(id || '0'), title: '', author: '', description: '' }; // Replace with actual book fetching logic

    return (
        <div>
            <h1>Edit Book</h1>
            <BookForm onAddBook={() => {}} onEditBook={() => {}} editingBook={book} />
        </div>
    );
};

export default EditBookPage;