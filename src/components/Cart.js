import React from 'react';
import { useSelector } from 'react-redux';

function Cart() {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <div>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item, index) => (
          <div key={index} style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>
            <h4>{item.title}</h4>
            <p>${item.price}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;