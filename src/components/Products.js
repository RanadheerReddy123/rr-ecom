import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
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
  }, [items, searchTerm, sortOrder]); // Only recompute when dependencies change

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

      {/* Render Memoized List */}
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {processedItems.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.category}</td>
              <td>${item.price}</td>
              <td>
                <button onClick={() => dispatch(addToCart(item))}>Add to Cart</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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