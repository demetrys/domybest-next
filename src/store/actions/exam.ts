import Router from 'next/router';

import { AppThunk } from 'store';
import examAPI from 'store/api/exam';
import { toggleAppLoader } from 'store/reducers/appLoader';
import {
  endTest,
  receiveExamInfo,
  receiveExamResumeInfo,
  receiveModule,
  receiveQuestion,
  receiveSection,
  toggleLoader,
  togglePause
} from 'store/reducers/exam';
import { openModalByType } from 'store/reducers/modal';
import { openErrorNotification } from 'store/reducers/notification';
import { receiveReviewQuestion } from 'store/reducers/reviewExam';

import { setStorage } from 'utils/storage';

import { ExamPage, SectionType } from 'constants/exam';
import { ROUTES } from 'constants/routes';
import {
  EndTest,
  ExamModule,
  ExamSection,
  Question,
  ResumeExamProps,
  ReviewNavigateData,
  SaveExamProps,
  StartExamProps,
  SubmitQuestionProps,
  TestId
} from 'types/models';

// Get exam general data with init questions
export const startExamTest =
  (examData: StartExamProps): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(toggleAppLoader(true));
      const data = await examAPI.startExamTest(examData);
      dispatch(receiveExamInfo(data));
      await Router.replace(`${ROUTES.exam}/${data.id}`);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(toggleAppLoader(false));
    }
  };

// Pause already started exam
export const pauseExamTest =
  (testId: TestId): AppThunk =>
  async (dispatch) => {
    try {
      const data = await examAPI.pauseExamTest(testId);
      dispatch(togglePause(Boolean(!data.end)));
    } catch (error) {
      console.error(error);
    }
  };

// Resume already started exam
export const resumeExamTest =
  ({ eid, testId }: ResumeExamProps): AppThunk =>
  async (dispatch) => {
    try {
      const data = await examAPI.resumeExamTest(testId);
      dispatch(receiveExamResumeInfo({ ...data, id: testId, eid }));
      await Router.push(`${ROUTES.exam}/${testId}`);
    } catch (error) {
      console.error(error);
      // TODO: all-in-one modal for all error types. BE will send 404 for overdue/finished exams
      dispatch(openModalByType('resumeError'));
    }
  };

// Save and Exit exam
export const saveExam =
  (examData: SaveExamProps): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(toggleAppLoader(true));
      await examAPI.saveExam(examData);

      // const { eid } = getState().examTest;
      // await Router.replace(`${ROUTES.onDemand}/${eid}`);
      // TODO: For Demo - return user to On-Demand page
      await Router.replace(ROUTES.onDemand);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(toggleAppLoader(false));
    }
  };

// Finish and Score exam
export const finishExam =
  (examData: SaveExamProps): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(toggleAppLoader(true));
      await examAPI.finishExam(examData);

      const { id } = getState().examTest;
      await Router.replace(`${ROUTES.exam}/${id}/${ExamPage.complete}`);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(toggleAppLoader(false));
    }
  };

// Submit single question by ID
export const submitQuestion =
  (questionData: SubmitQuestionProps): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(toggleAppLoader(true));
      const data = await examAPI.navigate(questionData);
      if ((data as Question).order_nr_local) {
        dispatch(receiveQuestion(data as Question));
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(toggleAppLoader(false));
    }
  };

// Similar to submitQuestion but receive next module || break
export const submitModule =
  (questionData: SubmitQuestionProps): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(toggleLoader(true));
      const data = await examAPI.navigate(questionData);

      const { id } = getState().examTest;
      // end test from BE response
      if ((data as EndTest).end_test) {
        dispatch(endTest(true));
        await Router.replace(`${ROUTES.exam}/${id}/${ExamPage.complete}`);
      }
      // if next module
      if ((data as ExamModule).total_questions) {
        dispatch(receiveModule(data as ExamModule));
      }
      // if break
      if ((data as ExamSection).id === SectionType.break) {
        dispatch(receiveSection(data as ExamSection));
        await Router.replace(`${ROUTES.exam}/${id}/${ExamPage.break}`);
      }
      // if math
      if ((data as ExamSection).id === SectionType.math) {
        dispatch(receiveSection(data as ExamSection));
        await Router.replace(`${ROUTES.exam}/${id}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(toggleLoader(false));
    }
  };

export const getReviewQuestion =
  (id: string, data: ReviewNavigateData): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(toggleAppLoader(true));

      const response = await examAPI.reviewNavigate(id, data);

      setStorage('reviewPosition', response.pos);
      dispatch(receiveReviewQuestion(response));
    } catch (error) {
      dispatch(openErrorNotification('Oops! Unexpected error'));
      throw new Error('Oops! Unexpected error');
    } finally {
      dispatch(toggleAppLoader(false));
    }
  };
