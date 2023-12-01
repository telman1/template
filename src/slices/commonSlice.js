import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  isMobile: false,
};

export const getData = createAsyncThunk('common/getData', async () => {
  // console.log('Fetching data...');
  // await new Promise(resolve => setTimeout(resolve, 2000));
  //   return {
  //     data: await getData({ Id }),
  //     Id,
  //   };
  return await fetch('https://dummyjson.com/posts?skip=5&limit=10').then(res => res.json());
});

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setIsMobile: (state, { payload }) => {
      console.log(payload, 'payload');
      state.isMobile = payload;
    },
  },
  extraReducers: {
    [getData.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getData.fulfilled]: (state, { payload }) => {
      state.loading = false;
    },
  },
});

export const { setIsMobile } = commonSlice.actions;

export default commonSlice.reducer;
