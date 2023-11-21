import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { omit } from 'utils/omit';

import {
  ConfigExamProps,
  Exam,
  ExamId,
  ExamModule,
  ExamSection,
  IsTimed,
  Question,
  QuestionOrder,
  ResumedExam,
  StartTime,
  TestId,
  TestMode
} from 'types/models';

export type ExamStore = {
  eid: ExamId;
  id: TestId;
  isLoading: boolean;
  isPaused: boolean;
  timed: IsTimed;
  startAt: StartTime;
  mode: TestMode;
  section: ExamSection;
  module: ExamModule;
  questions: Question[];
  markedQuestions: QuestionOrder[];
  endTest: boolean;
  time: number | null;
  pos: string | null;
};

const initialState: ExamStore = {
  eid: '0',
  id: '0',
  isLoading: false,
  isPaused: false,
  timed: true,
  startAt: 0,
  mode: '',
  section: {} as ExamSection,
  module: {} as ExamModule,
  questions: [],
  markedQuestions: [],
  endTest: false,
  time: null,
  pos: null
};

export const examSlice = createSlice({
  name: 'Exam',
  initialState,
  reducers: {
    toggleLoader: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    togglePause: (state, { payload }: PayloadAction<boolean>) => {
      state.isPaused = payload;
    },
    clearExamInfo: () => initialState,
    configExam: (state, { payload }: PayloadAction<ConfigExamProps>) => {
      state.eid = payload.examId;
      if (Object.hasOwn(payload, 'timed')) {
        state.timed = !!payload.timed;
      }
      if (payload.mode) {
        state.mode = payload.mode;
      }
    },
    receiveExamInfo: (state, { payload }: PayloadAction<Exam>) => {
      state.id = payload.id;
      state.startAt = payload.start_at;

      // set initial data
      const initSection = payload.modules[0];
      state.section = omit(initSection, ['modules']);

      const initModule = initSection.modules?.[0];
      if (initModule) {
        state.module = omit(initModule, ['questions']);
        state.questions = initModule.questions || [];
      }
    },
    receiveExamResumeInfo: (state, { payload }: PayloadAction<ResumedExam>) => {
      state.eid = payload.eid;
      state.id = payload.id;
      state.mode = payload.mode.mode;
      state.timed = payload.mode.timed;
      state.pos = payload.pos;
      state.section = omit(payload.section, ['modules']);
      const initModule = payload.section.modules?.[0];
      if (initModule) {
        state.module = omit(initModule, ['questions']);
        const questions = initModule.questions || [];
        if (questions) {
          state.questions = questions;
          state.markedQuestions = questions
            .filter((q) => q.bookmark)
            .map((q) => q.order_nr_local);
        }
      }
    },
    receiveSection: (state, { payload }: PayloadAction<ExamSection>) => {
      // Reset time store to prevent unexpected finish on math section
      state.time = null;
      // Reset position on Exam Resume
      state.pos = null;

      state.section = omit(payload, ['modules']);

      const initModule = payload.modules?.[0];
      if (initModule) {
        state.module = omit(initModule, ['questions']);
        state.questions = initModule.questions || [];
      } else {
        // Clear module and questions storage
        state.module = {} as ExamModule;
        state.questions = [];
      }
    },
    receiveModule: (state, { payload }: PayloadAction<ExamModule>) => {
      state.module = omit(payload, ['questions']);
      state.questions = payload.questions || [];
    },
    receiveQuestion: (state, { payload }: PayloadAction<Question>) => {
      const index = state.questions.findIndex(
        (q) => q.order_nr_local === payload.order_nr_local
      );

      if (index !== -1) {
        state.questions[index] = { ...state.questions[index], ...payload };
      } else {
        state.questions = [...state.questions, payload];
      }
    },
    receiveAnswer: (state, { payload }: PayloadAction<Question>) => {
      const index = state.questions.findIndex(
        (q) => q.order_nr_local === payload.order_nr_local
      );

      if (index !== -1) {
        state.questions[index] = payload;
      }
    },
    endTest: (state, { payload }: PayloadAction<boolean>) => {
      state.endTest = payload;
    },
    toggleQuestionMark: (state, { payload }: PayloadAction<QuestionOrder>) => {
      if (state.markedQuestions.includes(payload)) {
        state.markedQuestions = state.markedQuestions.filter(
          (question) => question !== payload
        );
      } else {
        state.markedQuestions = [...state.markedQuestions, payload];
      }
    },
    clearQuestionMarks: (state) => {
      state.markedQuestions = [];
    },
    receiveTime: (state, { payload }: PayloadAction<null | number>) => {
      state.time = payload;
    }
  }
});

export const {
  toggleLoader,
  togglePause,
  clearExamInfo,
  configExam,
  receiveExamInfo,
  receiveExamResumeInfo,
  receiveSection,
  receiveModule,
  receiveQuestion,
  receiveAnswer,
  endTest,
  toggleQuestionMark,
  clearQuestionMarks,
  receiveTime
} = examSlice.actions;

export default examSlice.reducer;
