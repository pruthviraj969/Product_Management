import { createSlice } from '@reduxjs/toolkit';

const toastSlice = createSlice({
  name: 'toast',
  initialState: { message: null, type: 'success' },
  reducers: {
    showToast: (state, action) => { state.message = action.payload.message; state.type = action.payload.type || 'success'; },
    hideToast: (state)         => { state.message = null; },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export const selectToast = s => s.toast;
export default toastSlice.reducer;