import { SectionId, TestCommonFields } from 'types/global';

// Todo - delete the type after Completed test list integration
export type CompletedTestType = TestCommonFields & {
  date: Date | string;
  pending: boolean;
  result?: {
    rw?: {
      total: number;
      actual: number;
    };
    math?: {
      total: number;
      actual: number;
    };
  };
  startTime?: string;
  endTime?: string;
  location?: string;
  questions: unknown[];
};

// The real data
export enum QuestionDifficulty {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard'
}

export const QuestionDifficultyLabel: { [key in QuestionDifficulty]: string } =
  {
    [QuestionDifficulty.Easy]: 'Easy',
    [QuestionDifficulty.Medium]: 'Medium',
    [QuestionDifficulty.Hard]: 'Hard'
  };

export type CompletedSectionId = Exclude<SectionId, 'break'>;

export type CompletedTestScore = {
  min: number;
  max: number;
};

export type CompletedTestScores = {
  total: CompletedTestScore;
  rw: CompletedTestScore;
  math: CompletedTestScore;
};

export type CompletedTest = {
  title: string;
  duration_time: string;
  extended_time_label: string;
  live_test_id: string;
  location: string;
  lower_grade: number;
  mode: string;
  score_report: string | null;
  sections: CompletedSections;
  start_date: string;
  type: string;
  upper_grade: number;
};

export type CompletedSections = {
  [key in CompletedSectionId]?: CompletedSection;
};

type CompletedSection = {
  correct_answers: number;
  id: CompletedSectionId;
  incorrect_answers: number;
  lower_grade: number;
  modules: CompletedModule[];
  omitted_questions: number;
  title: string;
  total_questions: number;
  unused_time: number;
  upper_grade: number;
};

type CompletedModule = {
  id: string;
  questions: CompletedQuestion[];
};

export type CompletedQuestion = {
  answer?: string;
  correct_answer: string[];
  is_correct: boolean;
  difficulty: QuestionDifficulty;
  id: string;
  order_nr_global: number;
  order_nr_local: number;
  time_spent?: number;
  topic: string;
  path: string;
};

export type CompletedTransformedQuestion = CompletedQuestion & {
  moduleId: string;
  sectionId: string;
  sectionTitle: string;
};

export type CompletedTransformedQuestions = {
  [key in CompletedSectionId]: CompletedTransformedQuestion[];
};
