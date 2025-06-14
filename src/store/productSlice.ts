import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts, createProductService, updateProductService, deleteProductService } from '../services/productsServices';

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const res = await getProducts();
  return res.data;
});

export const createProduct = createAsyncThunk(
  'products/create',
  async (productData: {
    name: string;
    description: string;
    price: number;
    category_id: string;
  }, thunkAPI) => {
    try {
      const res = await createProductService(productData);
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to create product');
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/update',
  async (
    { id, data }: { id: string; data: { name: string; description: string; price: number, category_id: string } },
    thunkAPI
  ) => {
    try {
      const res = await updateProductService(id, data);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update product');
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id: string, thunkAPI) => {
    try {
      await deleteProductService(id);
      return id; 
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to delete product');
    }
  })

type Product = {
  id?: string;
  name: string;
  description: string;
  price: number;
  category_id: string;
};

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [] as Product[],
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
      })

      // Handle Create Product
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.push(action.payload); // Add the new product to the list
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});


export default productsSlice.reducer;
