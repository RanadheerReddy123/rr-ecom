import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import ProductReviews from './ProductReviews';
import Pagination from './Pagination';
import QuickSearch from './QuickSearch';

function Products() {
  const dispatch = useDispatch();
  
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products?limit=5`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [pageNumber]);

  // 1. useCallback: Prevent re-creating callback references across re-renders
  const handleNext = useCallback(() => {
    setPageNumber((prev) => prev + 1);
  }, []);

  const handlePrevious = useCallback(() => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleQuickSearch = useCallback((value) => {
    setSearchTerm(value);
  }, []);

  // 2. useMemo: Memoize expensive filtering & sorting calculations
  const processedItems = useMemo(() => {
    const filtered = items.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return [...filtered].sort((a, b) => {
      return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    });
  }, [items, searchTerm, sortOrder]);

  if (loading) return <h2>Loading products...</h2>;

  return (
    <div>
      <h2>Product Catalog (Optimized)</h2>

      {/* Uncontrolled Input Component using useRef */}
      <QuickSearch onSearchSubmit={handleQuickSearch} />

      {/* Controlled Search Box */}
      <div style={{ marginBottom: '15px' }}>
        <input
          type="text"
          placeholder="Filter products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '8px', width: '250px' }}
        />
      </div>

      {/* Sort Buttons */}
      <div style={{ marginBottom: '15px' }}>
        <span>Sort by Price: </span>
        <button onClick={() => setSortOrder('asc')}>Price Low to High ▲</button>
        <button onClick={() => setSortOrder('desc')} style={{ marginLeft: '8px' }}>
          Price High to Low ▼
        </button>
      </div>

      {/* Render Product Cards with Reviews */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {processedItems.map((item) => (
          <div key={item.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3>{item.title}</h3>
                <p>Category: {item.category} | Price: ${item.price}</p>
              </div>
              <button onClick={() => dispatch(addToCart(item))} style={{ padding: '8px 16px', cursor: 'pointer' }}>
                Add to Cart
              </button>
            </div>

            {/* Embedded Product Reviews Component */}
            <ProductReviews productId={item.id} />
          </div>
        ))}
      </div>

      {/* Memoized Callback Pagination */}
      <Pagination
        pageNumber={pageNumber}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
      />
    </div>
  );
}

export default Products;