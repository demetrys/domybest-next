import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Learner } from 'types/models';

export type LearnersStore = {
  isLoading: boolean;
  learnersList: Learner[];
  learner: Learner;
};

const initialState: LearnersStore = {
  isLoading: false,
  learnersList: [],
  learner: {} as Learner
};

export const learnersSlice = createSlice({
  name: 'Proctor-Learners',
  initialState,
  reducers: {
    toggleLoader: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    receiveLearnersList: (state, { payload }: PayloadAction<Learner[]>) => {
      state.learnersList = payload;
    },
    receiveLearner: (state, { payload }: PayloadAction<Learner>) => {
      state.learner = payload;
    }
  }
});

export const { toggleLoader, receiveLearnersList, receiveLearner } =
  learnersSlice.actions;

export default learnersSlice.reducer;
