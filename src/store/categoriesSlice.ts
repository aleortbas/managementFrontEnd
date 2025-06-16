import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCategories, deleteCategoriesService, updateCategoriesService, createCategoriesService } from '../services/categoriesServices';

export const fetchcategories = createAsyncThunk('categories/fetch', async () => {
  const res = await getCategories();
  return res.data;
});

export const createcategory = createAsyncThunk(
  'categories/create',
  async (categoryData: {
    name: string;
  }, thunkAPI) => {
    try {
      const res = await createCategoriesService(categoryData);
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to create category');
    }
  }
);

export const updatecategory = createAsyncThunk(
  'categories/update',
  async (
    { id, data }: { id: string; data: { name: string } },
    thunkAPI
  ) => {
    try {
      const res = await updateCategoriesService(id, data);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update category');
    }
  }
);

export const deletecategory = createAsyncThunk(
  'categories/delete',
  async (id: string, thunkAPI) => {
    try {
      await deleteCategoriesService(id);
      return id; 
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to delete category');
    }
  })

type category = {
  id?: string;
  name: string;
  description: string;
  price: number;
  category_id: string;
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    items: [] as category[],
    status: 'idle',
    error: null as string | null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchcategories.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchcategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchcategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch categories';
      })

      // Handle Create category
      .addCase(createcategory.fulfilled, (state, action) => {
        state.items.push(action.payload); // Add the new category to the list
      })
      .addCase(createcategory.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});


export default categoriesSlice.reducer;
