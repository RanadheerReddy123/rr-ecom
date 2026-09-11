import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Helper functions for localStorage sync
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (err) {
    console.error('Failed to load cart from localStorage:', err);
    return [];
  }
};

const saveCartToStorage = (cartItems) => {
  try {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  } catch (err) {
    console.error('Failed to save cart to localStorage:', err);
  }
};

export const fetchProductsAsync = createAsyncThunk(
  'cart/fetchProducts',
  async () => {
    const response = await fetch('https://fakestoreapi.com/products?limit=5');
    const data = await response.json();
    return data;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: loadCartFromStorage(), // Load persisted items on app initialization
    products: [],
    status: 'idle',
  },
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push(action.payload);
      saveCartToStorage(state.cartItems); // Persist updated cart list
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((_, index) => index !== action.payload);
      saveCartToStorage(state.cartItems); // Persist updated cart list
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem('cartItems'); // Clear storage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProductsAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;