import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import MyOrders from './MyOrders.jsx';
import ProtectedRoute from './ProtectedRoute';
import Browse from './Browse.jsx';
import { CartProvider } from "./context/cartContext.jsx";
import Vendors from "./Vendors";
import './index.css';
import Analytics from './Analytics.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <CartProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/my-orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />
      </Routes>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);

