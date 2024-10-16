import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import HomePage from './HomePage';
import App from './App';
import './index.css';
import 'admin-lte/dist/css/adminlte.min.css';
import 'admin-lte/plugins/jquery/jquery.min.js';
import 'admin-lte/plugins/bootstrap/js/bootstrap.bundle.min.js';
import 'admin-lte/dist/js/adminlte.min.js';



const rootElement = document.getElementById('root');
const root = createRoot(rootElement); // Create a root using createRoot

root.render(
    <React.StrictMode>
        <HomePage />
    </React.StrictMode>
);
