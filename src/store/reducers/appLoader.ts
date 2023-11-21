import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AppLoaderStore = {
  isLoading: boolean;
};

const initialState: AppLoaderStore = {
  isLoading: false
};

export const appLoaderSlice = createSlice({
  name: 'appLoader',
  initialState,
  reducers: {
    toggleAppLoader: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    }
  }
});

export const { toggleAppLoader } = appLoaderSlice.actions;

export default appLoaderSlice.reducer;
