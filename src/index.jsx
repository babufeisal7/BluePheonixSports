import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import HomePage from './HomePage';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement); // Create a root using createRoot

root.render(
    <React.StrictMode>
        <HomePage />
    </React.StrictMode>
);
