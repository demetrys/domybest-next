import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { InPersonTestType } from 'types/models';

export type InPersonTestsStore = {
  isLoading: boolean;
  testList: InPersonTestType[];
  test: InPersonTestType;
};

const initialState: InPersonTestsStore = {
  isLoading: false,
  testList: [],
  test: {} as InPersonTestType
};

export const inPersonTestsSlice = createSlice({
  name: 'In-Person Tests',
  initialState,
  reducers: {
    toggleLoader: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    receiveInPersonTestList: (
      state,
      action: PayloadAction<InPersonTestType[]>
    ) => {
      state.testList = action.payload;
    },
    receiveInPersonTest: (state, action: PayloadAction<InPersonTestType>) => {
      state.test = action.payload;
    }
  }
});

export const { toggleLoader, receiveInPersonTestList, receiveInPersonTest } =
  inPersonTestsSlice.actions;

export default inPersonTestsSlice.reducer;
