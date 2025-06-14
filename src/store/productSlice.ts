import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts } from '../services/productsServices';

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const res = await getProducts();
  return res.data;
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
      items: [],
      status: 'idle',
      error: null as string | null,
    },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export default productsSlice.reducer;
