import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 1. Asynchronous thunk to execute API requests outside of components
export const fetchProductsAsync = createAsyncThunk(
  'cart/fetchProducts',
  async () => {
    const response = await fetch('https://fakestoreapi.com/products?limit=5');
    const data = await response.json();
    return data;
  }
);

// 2. Create slice with initial state and reducer actions
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    products: [],
    status: 'idle',
  },
  reducers: {
    // Reducer action to add items to cart
    addToCart: (state, action) => {
      state.cartItems.push(action.payload);
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

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;