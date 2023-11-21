import { StaticImageData } from 'next/image';

import { ExamPage } from 'constants/exam';
import { SectionId } from 'types/global';

/**
 * ExamId - test ID. Increments when new test is added to DB.
 * TestId = live_test_id - test instance ID. Increments when user start new exam by ExamId.
 */
export type ExamId = string;
export type TestId = string;
export type ModuleId = string;
export type QuestionId = string;
export type QuestionOrder = number;
export type QuestionKey = string;
export type QuestionAnswer = string;
export type CrossOutItem = string;
export type TestMode = string;
export type IsTimed = boolean;
export type StartTime = number;
export type ExamTools = string[];
export type TargetStep = QuestionOrder | ExamPage.review;

type ExamCommonFields = {
  id: TestId;
  mode: {
    mode: TestMode;
    timed: IsTimed;
  };
};

export type Exam = ExamCommonFields & {
  start_at: StartTime;
  tools: ExamTools;
  modules: ExamSection[];
};

export type ResumedExam = ExamCommonFields & {
  eid: ExamId;
  pos: string;
  section: ExamSection;
};

export type ExamSection = {
  id: SectionId;
  slug: string;
  time: number;
  title: string;
  description?: string;
  type?: string;
  tools: ExamTools | null;
  modules?: ExamModule[];
};

export type ExamModule = {
  id: ModuleId;
  slug: string;
  time: number;
  title: string;
  passage?: string;
  total_questions: number;
  type?: string;
  questions?: Question[];
};

export type Question = {
  id: QuestionId;
  order_nr_local: QuestionOrder;
  type: string;
  equation?: string;
  image?: {
    url: string;
    width: number;
    height: number;
  };
  passage?: string;
  question: string;
  choices?: Choice[];
  answer?: QuestionAnswer;
  bookmark?: boolean;
};

export type Choice = {
  title: string;
  value: string;
  content?: string;
  image?: {
    url: string;
    width: number;
    height: number;
  };
};

export type DemoChoice = Omit<Choice, 'image'> & {
  image?: {
    url: StaticImageData;
    width: number;
    height: number;
  };
};

export type DemoQuestion = Omit<Question, 'image' | 'choices'> & {
  image?: {
    url: StaticImageData;
    width: number;
    height: number;
  };
  choices?: DemoChoice[];
};

export type EndTest = { end_test: boolean };

// Data requests props
export type ConfigExamProps = {
  examId: ExamId;
  timed?: IsTimed;
  mode?: TestMode;
};

export type StartExamProps = {
  examId: ExamId;
  timed: IsTimed;
  mode: TestMode;
};

export type PauseExamProps = {
  start: number;
  end?: number;
  duration?: number;
};

export type SaveExamProps = {
  testId: TestId;
  current: {
    answer?: QuestionAnswer;
    bookmark?: boolean;
  };
};

export type ResumeExamProps = {
  eid: ExamId;
  testId: TestId;
};

export type SubmitQuestionProps = SaveExamProps & {
  to: {
    path?: QuestionKey;
    next_module?: boolean;
    next_question?: boolean;
  };
  returnQuestion?: boolean;
};

export type ToggleCrossOutsProps = {
  id: TestId;
  item: CrossOutItem;
};

export type RemainingTimeData = {
  status: string;
  time_remaining: number;
  test_status: string;
};

export type NavigateDirection = 'next_question' | 'prev_question';

export type ReviewNavigateData = {
  current_path: string;
  to: Partial<Record<NavigateDirection, boolean>> & {
    path?: string;
  };
};

export type ReviewQuestion = Omit<Question, 'answer'> & {
  answer: null | string;
  back: boolean;
  is_correct: boolean;
  correct_answer: string[];
  explanation: string;
  module_nr: number;
  module_title: string;
  next: boolean;
  pos: string;
  section_nr: number;
  section_title: string;
};
