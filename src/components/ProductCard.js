import React from 'react';

// Destructuring props directly in the parameter list
function ProductCard({ title, price, category }) {
  return (
    <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
      <h3>{title}</h3>
      <p>Category: {category}</p>
      <p>Price: ${price}</p>
    </div>
  );
}

export default ProductCard;