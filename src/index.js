import React from 'react';
import { createRoot } from 'react-dom';
import App from './App';
import { AuthProvider } from './components/Login/AuthContext'; // Update the path as per your file structure

const root = document.getElementById('root');
const rootElement = createRoot(root);

rootElement.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
