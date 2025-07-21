import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from '../src/hooks/useAuth'; // ✅ adjust this path if needed

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        {' '}
        {/* ✅ Wrap AuthProvider around App */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
