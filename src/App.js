import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

// Dynamically import components using React.lazy
const Home = lazy(() => import('./components/Home'));
const Products = lazy(() => import('./components/Products'));
const Cart = lazy(() => import('./components/Cart'));

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <div style={{ padding: '0 20px' }}>
          {/* Wrap lazy routes with Suspense to show fallback during loading */}
          <Suspense fallback={<h2>Loading page component...</h2>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;