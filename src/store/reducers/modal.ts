import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { InPersonTestActionData, Modals, PerformTestModal } from 'types/global';
import { QuestionOrder } from 'types/models';

type ModalsType = {
  [key in Modals]: boolean;
};

export type ModalStore = {
  modals: ModalsType;
  perform: PerformTestModal;
  reportLiveId: string;
  step: QuestionOrder;
  inPersonTestActionData: InPersonTestActionData;
};

const initialModalState: ModalsType = {
  device: false,
  report: false,
  perform: false,
  saveExam: false,
  finishExam: false,
  restartExam: false,
  resumeError: false,
  learnerEdit: false,
  pauseTest: false,
  startTest: false,
  attendance: false
};

const initialState: ModalStore = {
  modals: initialModalState,
  perform: {} as PerformTestModal,
  reportLiveId: '',
  step: 0,
  inPersonTestActionData: {} as InPersonTestActionData
};

const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModalByType: (state, { payload }: PayloadAction<Modals>) => {
      state.modals[payload] = true;
    },
    openPerformTestModal: (
      state,
      { payload }: PayloadAction<PerformTestModal>
    ) => {
      state.modals.perform = true;
      state.perform = payload;
    },
    openReportTestModal: (state, { payload }: PayloadAction<string>) => {
      state.modals.report = true;
      state.reportLiveId = payload;
    },
    openSaveExamModal: (state, { payload }: PayloadAction<QuestionOrder>) => {
      state.modals.saveExam = true;
      state.step = payload;
    },
    openFinishExamModal: (state, { payload }: PayloadAction<QuestionOrder>) => {
      state.modals.finishExam = true;
      state.step = payload;
    },
    openPauseTestModal: (
      state,
      { payload }: PayloadAction<InPersonTestActionData>
    ) => {
      state.modals.pauseTest = true;
      state.inPersonTestActionData = payload;
    },
    openStartTestModal: (
      state,
      { payload }: PayloadAction<InPersonTestActionData>
    ) => {
      state.modals.startTest = true;
      state.inPersonTestActionData = payload;
    },
    closeModals: (state) => {
      state.modals = initialModalState;
    }
  }
});

export const {
  openModalByType,
  openPerformTestModal,
  openReportTestModal,
  openSaveExamModal,
  openFinishExamModal,
  openPauseTestModal,
  openStartTestModal,
  closeModals
} = modalSlice.actions;

export default modalSlice.reducer;
