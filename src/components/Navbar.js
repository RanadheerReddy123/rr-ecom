import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Navbar() {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <nav style={{ display: 'flex', gap: '20px', padding: '15px', background: '#f4f4f4', marginBottom: '20px' }}>
      <Link to="/" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Home</Link>
      <Link to="/products" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Products</Link>
      <Link to="/cart" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Cart ({cartItems.length})</Link>
    </nav>
  );
}

export default Navbar;