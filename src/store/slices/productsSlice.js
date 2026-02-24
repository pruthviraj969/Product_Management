import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = 'https://fakestoreapi.com';

export const fetchProducts = createAsyncThunk('products/fetchAll', async (_, { rejectWithValue }) => {
  try { const res = await axios.get(`${API}/products`); return res.data; }
  catch (err) { return rejectWithValue(err.message); }
});

export const fetchCategories = createAsyncThunk('products/fetchCategories', async (_, { rejectWithValue }) => {
  try { const res = await axios.get(`${API}/products/categories`); return res.data; }
  catch (err) { return rejectWithValue(err.message); }
});

export const addProduct = createAsyncThunk('products/add', async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${API}/products`, data);
    return { ...data, id: res.data.id || Date.now() };
  } catch (err) { return rejectWithValue(err.message); }
});

export const updateProduct = createAsyncThunk('products/update', async ({ id, ...data }, { rejectWithValue }) => {
  try { await axios.put(`${API}/products/${id}`, data); return { id, ...data }; }
  catch (err) { return rejectWithValue(err.message); }
});

export const deleteProduct = createAsyncThunk('products/delete', async (id, { rejectWithValue }) => {
  try { await axios.delete(`${API}/products/${id}`); return id; }
  catch (err) { return rejectWithValue(err.message); }
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [], categories: [], status: 'idle',
    error: null, search: '', selectedCategory: 'all', newIds: [],
  },
  reducers: {
    setSearch:   (state, action) => { state.search = action.payload; },
    setCategory: (state, action) => { state.selectedCategory = action.payload; },
    clearNewId:  (state, action) => { state.newIds = state.newIds.filter(id => id !== action.payload); },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending,   (state)          => { state.status = 'loading'; state.error = null; })
      .addCase(fetchProducts.fulfilled, (state, action)  => { state.status = 'succeeded'; state.items = action.payload; })
      .addCase(fetchProducts.rejected,  (state, action)  => { state.status = 'failed'; state.error = action.payload; })
      .addCase(fetchCategories.fulfilled, (state, action) => { state.categories = action.payload; })
      .addCase(addProduct.fulfilled,    (state, action)  => { state.items.unshift(action.payload); state.newIds.push(action.payload.id); })
      .addCase(updateProduct.fulfilled, (state, action)  => {
        const idx = state.items.findIndex(p => p.id === action.payload.id);
        if (idx !== -1) state.items[idx] = { ...state.items[idx], ...action.payload };
      })
      .addCase(deleteProduct.fulfilled, (state, action)  => { state.items = state.items.filter(p => p.id !== action.payload); });
  },
});

export const { setSearch, setCategory, clearNewId } = productsSlice.actions;

export const selectAllProducts      = s => s.products.items;
export const selectCategories       = s => s.products.categories;
export const selectStatus           = s => s.products.status;
export const selectSearch           = s => s.products.search;
export const selectCategory         = s => s.products.selectedCategory;
export const selectNewIds           = s => s.products.newIds;
export const selectFilteredProducts = s => {
  const { items, search, selectedCategory } = s.products;
  return items.filter(p => {
    const q = search.toLowerCase();
    return (!q || p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
      && (selectedCategory === 'all' || p.category === selectedCategory);
  });
};

export default productsSlice.reducer;