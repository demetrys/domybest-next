import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { GetTestData, Test } from 'types/models';

export type TestsStore = {
  isLoading: boolean;
  testList: Test[];
  count: number;
  test: Test;
};

const initialState: TestsStore = {
  isLoading: false,
  testList: [],
  count: 0,
  test: {} as Test
};

export const testsSlice = createSlice({
  name: 'Admin-Tests',
  initialState,
  reducers: {
    toggleLoader: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    receiveTestList: (state, action: PayloadAction<GetTestData>) => {
      state.testList = action.payload.results;
      state.count = action.payload.count;
    },
    receiveTest: (state, action: PayloadAction<Test>) => {
      state.test = action.payload;
    }
  }
});

export const { receiveTest, receiveTestList, toggleLoader } =
  testsSlice.actions;

export default testsSlice.reducer;
