import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCartService, getCartService, checkout as checkoutService } from '../services/cartServices';

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

export const fetchCart = createAsyncThunk('cart/fetch', async (_, thunkAPI) => {
  try {
    const res = await getCartService();
    return res.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch cart');
  }
});

export const checkout = createAsyncThunk(
  'cart/checkout',
  async (_, thunkAPI) => {
    try {
      const res = await checkoutService();
      return res.data.details; // return only the checkout info
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to checkout'
      );
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
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.items = action.payload;
    })

  },
});

export default cartSlice.reducer;
