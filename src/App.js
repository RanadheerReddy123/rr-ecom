import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import FormBuilderPage from './pages/FormBuilderPage';

// Placeholder or imported view components for existing routes
const Home = () => (
  <div style={{ padding: '32px', textAlign: 'center' }}>
    <h2>Welcome to RR Store</h2>
    <p>Explore our products or check out our custom Form Builder module.</p>
  </div>
);

const Products = () => (
  <div style={{ padding: '32px' }}>
    <h2>Product Catalog</h2>
    <p>List of available store products will render here.</p>
  </div>
);

const Cart = () => (
  <div style={{ padding: '32px' }}>
    <h2>Your Shopping Cart</h2>
    <p>Your selected cart items will render here.</p>
  </div>
);

export default function App() {
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <div className="app-container" style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
        {/* Navigation Header */}
        <Navbar cartCount={cart.length} />

        {/* Dynamic Route Content */}
        <main style={{ paddingBottom: '40px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            
            {/* New Uncontrolled/Controlled Form Builder Feature Route */}
            <Route path="/form-builder" element={<FormBuilderPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}