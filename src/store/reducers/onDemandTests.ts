import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { OnDemandTestType } from 'types/models';

export type OnDemandTestsStore = {
  isLoading: boolean;
  testList: OnDemandTestType[];
  test: OnDemandTestType;
};

const initialState: OnDemandTestsStore = {
  isLoading: false,
  testList: [],
  test: {} as OnDemandTestType
};

export const onDemandTestsSlice = createSlice({
  name: 'On Demand Tests',
  initialState,
  reducers: {
    toggleLoader: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    receiveOnDemandTestList: (
      state,
      action: PayloadAction<OnDemandTestType[]>
    ) => {
      state.testList = action.payload;
    },
    receiveOnDemandTest: (state, action: PayloadAction<OnDemandTestType>) => {
      state.test = action.payload;
    }
  }
});

export const { toggleLoader, receiveOnDemandTestList, receiveOnDemandTest } =
  onDemandTestsSlice.actions;

export default onDemandTestsSlice.reducer;
