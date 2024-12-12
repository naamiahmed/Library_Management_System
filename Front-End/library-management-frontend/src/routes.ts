// src/routes.ts
import { lazy } from 'react';

const HomePage = lazy(() => import('./components/HomePage'));
const AddBookPage = lazy(() => import('./components/AddBookPage'));
const EditBookPage = lazy(() => import('./components/EditBookPage'));
const NotFoundPage = lazy(() => import('./components/NotFoundPage'));

const routes = [
    { path: '/', component: HomePage },
    { path: '/add', component: AddBookPage },
    { path: '/edit/:id', component: EditBookPage },
    { path: '*', component: NotFoundPage },
];

export default routes;