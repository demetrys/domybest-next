import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getQuestions, getSectionScores } from 'utils/completedTest';

import { ResponseError } from 'types/global';
import {
  CompletedTest,
  CompletedTestScores,
  CompletedTestType,
  CompletedTransformedQuestions
} from 'types/models';

export type CompletedTestsStore = {
  isLoading: boolean;
  testList: CompletedTestType[];
  testInfo: {
    test: CompletedTest;
    scores: CompletedTestScores;
    questions: CompletedTransformedQuestions;
    error: ResponseError;
  };
};

const initialState: CompletedTestsStore = {
  isLoading: false,
  testList: [],
  testInfo: {
    test: {} as CompletedTest,
    scores: {} as CompletedTestScores,
    questions: {} as CompletedTransformedQuestions,
    error: {} as ResponseError
  }
};

export const completedTestsSlice = createSlice({
  name: 'On Demand Tests',
  initialState,
  reducers: {
    toggleLoader: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    receiveCompletedTestList: (
      state,
      action: PayloadAction<CompletedTestType[]>
    ) => {
      state.testList = action.payload;
    },
    receiveCompletedTest: (state, action: PayloadAction<CompletedTest>) => {
      state.testInfo.test = action.payload;

      const sectionScores = getSectionScores(action.payload.sections);
      state.testInfo.scores = {
        ...sectionScores,
        total: {
          min: action.payload.lower_grade,
          max: action.payload.upper_grade
        }
      };
      state.testInfo.questions = getQuestions(action.payload.sections);
    },
    receiveCompletedTestError: (
      state,
      action: PayloadAction<ResponseError>
    ) => {
      state.testInfo.error = action.payload;
    }
  }
});

export const {
  toggleLoader,
  receiveCompletedTestList,
  receiveCompletedTestError,
  receiveCompletedTest
} = completedTestsSlice.actions;

export default completedTestsSlice.reducer;
