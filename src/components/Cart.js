import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../redux/cartSlice';

function Cart() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Your Shopping Cart (Persisted)</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <button
            onClick={() => dispatch(clearCart())}
            style={{ marginBottom: '15px', padding: '8px 12px', cursor: 'pointer', background: '#ff4d4d', color: '#fff', border: 'none', borderRadius: '4px' }}
          >
            Clear Entire Cart
          </button>
          {cartItems.map((item, index) => (
            <div key={index} style={{ borderBottom: '1px solid #ccc', padding: '10px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4>{item.title}</h4>
                <p>${item.price}</p>
              </div>
              <button
                onClick={() => dispatch(removeFromCart(index))}
                style={{ padding: '6px 10px', cursor: 'pointer' }}
              >
                Remove
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Cart;