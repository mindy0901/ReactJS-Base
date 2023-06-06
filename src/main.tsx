import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Layout } from './components/common';
import { AboutPage, AuthPage, ErrorPage, HelpPage, HomePage, ProductsPage } from './pages';
import theme from './assets/theme';
import './assets/styles/index.css';

const router = createBrowserRouter([
    { path: 'auth', element: <AuthPage /> },
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'about', element: <AboutPage /> },
            { path: 'products', element: <ProductsPage /> },
            { path: 'help', element: <HelpPage /> },
        ],
    },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <RouterProvider router={router} />
        </ThemeProvider>
    </QueryClientProvider>
);
