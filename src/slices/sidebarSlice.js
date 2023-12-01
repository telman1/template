import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebar: {},
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {},
  extraReducers: {},
});

export default sidebarSlice.reducer;
