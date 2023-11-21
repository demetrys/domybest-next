import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CrossOutItem, TestId, ToggleCrossOutsProps } from 'types/models';

export type CrossOutsStore = {
  id: TestId;
  showCrossOuts: boolean;
  crossOuts: string[];
};

const initialState: CrossOutsStore = {
  id: '0',
  showCrossOuts: false,
  crossOuts: []
};

export const crossOutsSlice = createSlice({
  name: 'persistCrossOuts',
  initialState,
  reducers: {
    toggleCrossOutsShow: (state, { payload }: PayloadAction<boolean>) => {
      state.showCrossOuts = payload;
    },
    toggleCrossOuts: (
      state,
      { payload }: PayloadAction<ToggleCrossOutsProps>
    ) => {
      // Replace localStore data for new exams
      if (state.id !== payload.id) {
        state.crossOuts = [payload.item];
        state.id = payload.id;
        return;
      }
      // Toggle logic
      if (state.crossOuts.includes(payload.item)) {
        state.crossOuts = state.crossOuts.filter(
          (item) => item !== payload.item
        );
      } else {
        state.crossOuts = [...state.crossOuts, payload.item];
      }
    },
    deleteCrossOut: (state, { payload }: PayloadAction<CrossOutItem>) => {
      state.crossOuts = state.crossOuts.filter((item) => item !== payload);
    },
    clearCrossOut: (state) => {
      state.id = '0';
      state.crossOuts = [];
    }
  }
});

export const {
  toggleCrossOutsShow,
  toggleCrossOuts,
  deleteCrossOut,
  clearCrossOut
} = crossOutsSlice.actions;

export default crossOutsSlice.reducer;
