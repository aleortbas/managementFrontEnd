import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCartService } from '../services/cartServices';

export const addToCart = createAsyncThunk(
  'cart/add',
  async (data: { product_id: string; quantity: number }, thunkAPI) => {
    try {
      const res = await addToCartService(data);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to add to cart');
    }
  }
);

export interface CartItem {
  product_id: string;
  quantity: number;
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [] as CartItem[],
    status: 'idle',
    error: null as string | null,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.items.push(action.payload as CartItem);
    });
  },
});

export default cartSlice.reducer;
