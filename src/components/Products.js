import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import Pagination from './Pagination';

function Products() {
  const dispatch = useDispatch();
  
  // State variables for data, search, sort, and pagination
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch data dynamically when pageNumber updates
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

  // Controlled search input handler
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Sorting callbacks
  const handleSortAscending = () => setSortOrder('asc');
  const handleSortDescending = () => setSortOrder('desc');

  // Pagination navigation callbacks
  const handleNext = () => setPageNumber((prev) => prev + 1);
  const handlePrevious = () => setPageNumber((prev) => Math.max(prev - 1, 1));

  // Dynamic search filtering
  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Dynamic sorting (Ascending / Descending by Price)
  const sortedItems = [...filteredItems].sort((a, b) => {
    return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
  });

  if (loading) return <h2>Loading page {pageNumber}...</h2>;

  return (
    <div>
      <h2>Product Catalog</h2>

      {/* Controlled Search Box */}
      <div style={{ marginBottom: '15px' }}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ padding: '8px', width: '250px' }}
        />
      </div>

      {/* Sort Buttons */}
      <div style={{ marginBottom: '15px' }}>
        <span>Sort by Price: </span>
        <button onClick={handleSortAscending}>Price Low to High ▲</button>
        <button onClick={handleSortDescending} style={{ marginLeft: '8px' }}>
          Price High to Low ▼
        </button>
      </div>

      {/* Product List */}
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
          {sortedItems.map((item) => (
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

      {/* Pagination Controls */}
      <Pagination
        pageNumber={pageNumber}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
      />
    </div>
  );
}

export default Products;