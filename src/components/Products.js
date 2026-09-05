import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

function Products() {
  // 1. Declare state variables using useState
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. Fetch remote data on component mount using useEffect
  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=5')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []); // Empty dependency array [] ensures this runs only once on mount

  if (loading) return <h2>Loading products...</h2>;

  return (
    <div>
      <h2>Product Catalog</h2>
      {/* 3. Render lists efficiently using unique key props */}
      {products.map((item) => (
        <ProductCard
          key={item.id} // Essential for Virtual DOM reconciliation
          title={item.title}
          price={item.price}
          category={item.category}
        />
      ))}
    </div>
  );
}

export default Products;