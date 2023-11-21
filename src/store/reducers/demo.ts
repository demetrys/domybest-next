import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DEMO_TESTS_MATH, DEMO_TESTS_WRITING } from 'constants/demo';
import { DemoQuestion } from 'types/models';

const questions = [...DEMO_TESTS_WRITING, ...DEMO_TESTS_MATH];

export type DemoStore = {
  questions: DemoQuestion[];
  markedQuestions: string[];
  answeredQuestions: Record<string, string>;
  crossOuts: string[];
};

const initialState: DemoStore = {
  questions,
  markedQuestions: [],
  answeredQuestions: {},
  crossOuts: []
};

export const demoSlice = createSlice({
  name: 'demo',
  initialState,
  reducers: {
    toggleQuestionMark: (state, action: PayloadAction<string>) => {
      if (state.markedQuestions.includes(action.payload)) {
        state.markedQuestions = state.markedQuestions.filter(
          (question) => question !== action.payload
        );
      } else {
        state.markedQuestions = [...state.markedQuestions, action.payload];
      }
    },
    addTestAnswers: (state) => {
      state.markedQuestions = [questions[1].id, questions[5].id];
      state.answeredQuestions = {
        [questions[0].id]: 'A',
        [questions[1].id]: 'A',
        [questions[2].id]: 'A',
        [questions[3].id]: 'A',
        [questions[4].id]: 'A'
      };
    },
    receiveQuestionAnswer: (
      state,
      action: PayloadAction<{ id: string; answer: string }>
    ) => {
      state.answeredQuestions[action.payload.id] = action.payload.answer;
    },
    toggleCrossOuts: (state, action: PayloadAction<string>) => {
      if (state.crossOuts.includes(action.payload)) {
        state.crossOuts = state.crossOuts.filter(
          (item) => item !== action.payload
        );
      } else {
        state.crossOuts = [...state.crossOuts, action.payload];
      }
    },
    deleteCrossOut: (state, action: PayloadAction<string>) => {
      state.crossOuts = state.crossOuts.filter(
        (item) => item !== action.payload
      );
    },
    clearCrossOut: (state) => {
      state.crossOuts = [];
    },
    clearTestAnswers: (state) => {
      state.markedQuestions = [];
      state.answeredQuestions = {};
    }
  }
});

export const {
  toggleQuestionMark,
  receiveQuestionAnswer,
  toggleCrossOuts,
  deleteCrossOut,
  addTestAnswers,
  clearTestAnswers
} = demoSlice.actions;

export default demoSlice.reducer;
