import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsAsync, addToCart } from '../redux/cartSlice';

function Products() {
  const dispatch = useDispatch();
  const { products, status, cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  if (status === 'loading') return <h2>Loading products via Redux...</h2>;

  return (
    <div>
      <h2>Product Catalog (Cart Items: {cartItems.length})</h2>
      {products.map((item) => (
        <div key={item.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <h3>{item.title}</h3>
          <p>Price: ${item.price}</p>
          <button onClick={() => dispatch(addToCart(item))}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default Products;