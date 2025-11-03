import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import ProductDetail from './pages/ProductDetail';
import { ProductProvider } from './context/ProductContext';
import './App.css';

const App = () => {
  return (
    <ProductProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/edit/:id" element={<EditProduct />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
    </ProductProvider>
    
  );
};

export default App;
