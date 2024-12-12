// src/components/IntroPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';

const IntroPage: React.FC = () => {
    return (
        <div className="intro-container">
            <div className="intro-content">
                <h1>Welcome to Library Management System</h1>
                <p>Manage your books efficiently and effectively</p>
                <div className="intro-buttons">
                    <Link to="/signin" className="btn btn-primary">Sign In</Link>
                    <Link to="/signup" className="btn btn-secondary">Sign Up</Link>
                </div>
            </div>
        </div>
    );
};

export default IntroPage;