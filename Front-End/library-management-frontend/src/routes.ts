// src/routes.ts
import { lazy } from 'react';

const HomePage = lazy(() => import('./components/HomePage.tsx'));
const AddBookPage = lazy(() => import('./components/AddBookPage.tsx'));
const EditBookPage = lazy(() => import('./components/EditBookPage.tsx'));
const NotFoundPage = lazy(() => import('./components/NotFoundPage.tsx'));

const routes = [
    { path: '/', component: HomePage },
    { path: '/add', component: AddBookPage },
    { path: '/edit/:id', component: EditBookPage },
    { path: '*', component: NotFoundPage },
];

export default routes;