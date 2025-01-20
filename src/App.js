import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navigation from './components/Navigation';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <CssBaseline />
        <AuthProvider>
          <CartProvider>
            <Navigation />
            <AppRoutes />
            <ToastContainer 
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App; 