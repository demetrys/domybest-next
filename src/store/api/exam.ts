import axiosExam from 'utils/axios/exam';

import {
  EndTest,
  Exam,
  ExamModule,
  ExamSection,
  PauseExamProps,
  Question,
  ResumedExam,
  ReviewNavigateData,
  ReviewQuestion,
  SaveExamProps,
  StartExamProps,
  SubmitQuestionProps,
  TestId
} from 'types/models';

const examAPI = {
  startExamTest({ examId, timed, mode }: StartExamProps) {
    return axiosExam.post<Exam>(`/tests/${examId}/start/`, {
      config: { timed, mode }
    });
  },
  pauseExamTest(testId: TestId) {
    return axiosExam.post<PauseExamProps>(`/tests/live/${testId}/pause/`);
  },
  resumeExamTest(testId: TestId) {
    return axiosExam.get<ResumedExam>(`/tests/live/${testId}/resume/`);
  },
  saveExam({ testId, current }: SaveExamProps) {
    return axiosExam.post(`/tests/live/${testId}/save/`, { current });
  },
  finishExam({ testId, current }: SaveExamProps) {
    return axiosExam.post(`/tests/live/${testId}/finish/`, { current });
  },
  navigate({ testId, current, to, returnQuestion }: SubmitQuestionProps) {
    return axiosExam.post<Question | ExamModule | ExamSection | EndTest>(
      `/tests/live/${testId}/navigate/`,
      {
        current,
        to,
        return_question: returnQuestion
      }
    );
  },
  reviewNavigate(id: string, data: ReviewNavigateData) {
    return axiosExam.post<ReviewQuestion>(`/tests/${id}/view/navigate/`, data);
  }
};

export default examAPI;
