import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ cartCount = 0 }) {
  return (
    <nav style={styles.nav}>
      <div style={styles.logoContainer}>
        <Link to="/" style={styles.brandLogo}>
          RR Store
        </Link>
      </div>

      <div style={styles.navLinks}>
        <Link to="/" style={styles.link}>
          Home
        </Link>
        <Link to="/products" style={styles.link}>
          Products
        </Link>
        <Link to="/form-builder" style={styles.link}>
          Custom Form Builder
        </Link>
        <Link to="/cart" style={styles.cartLink}>
          Cart {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
        </Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 32px',
    backgroundColor: '#1f2937',
    color: '#ffffff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  brandLogo: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    color: '#ffffff',
    textDecoration: 'none',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  },
  link: {
    color: '#e5e7eb',
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: '500',
    transition: 'color 0.2s ease',
  },
  cartLink: {
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: 'bold',
    backgroundColor: '#2563eb',
    padding: '8px 16px',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  badge: {
    backgroundColor: '#ef4444',
    color: '#ffffff',
    borderRadius: '50%',
    padding: '2px 8px',
    fontSize: '0.8rem',
  },
};