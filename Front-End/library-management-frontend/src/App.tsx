// src/App.tsx
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IntroPage from './pages/IntroPage.tsx';
import SignInPage from './pages/Authentication/SignInPage.tsx';
import SignUpPage from './pages/Authentication/SignUpPage.tsx';
import HomePage from './pages/HomePage.tsx';

const App: React.FC = () => {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<IntroPage />} />
                    <Route path="/signin" element={<SignInPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/home" element={<HomePage />} />
                </Routes>
            </Suspense>
        </Router>
    );
};

export default App;