import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ReviewQuestion } from 'types/models';

export type ReviewExamStore = {
  question: ReviewQuestion;
};

const initialState: ReviewExamStore = {
  question: {} as ReviewQuestion
};

const reviewExamSlice = createSlice({
  name: 'Review Exam',
  initialState,
  reducers: {
    receiveReviewQuestion: (state, action: PayloadAction<ReviewQuestion>) => {
      state.question = action.payload;
    }
  }
});

export const { receiveReviewQuestion } = reviewExamSlice.actions;

export default reviewExamSlice.reducer;
