import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';

import { TestType } from 'constants/global';

export type ResponseError = {
  detail?: string;
  code?: string;
};

export type DemandTestSubType = 'act' | 'sat';

export type TestCommonFields = {
  id: string;
  title: string;
  type: TestType;
  isExtended: boolean;
  subtype: DemandTestSubType;
};

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type SelectOptions = {
  value: string | number;
  label: string;
};

export type Modals =
  | 'device'
  | 'report'
  | 'perform'
  | 'saveExam'
  | 'finishExam'
  | 'restartExam'
  | 'resumeError'
  | 'learnerEdit'
  | 'pauseTest'
  | 'startTest'
  | 'attendance';

export type PerformTestType = 'start' | 'restart';

export type PerformTestModal = {
  type: PerformTestType;
  id: string;
};

export type AbsenceStatus = 'present' | 'absent' | '';

export type InPersonTestActionData = {
  isExtended: boolean;
  id: string;
};

export type BaseError = {
  message: string;
};

export type SectionId = 'reading_and_writing' | 'math' | 'break';

export type GetAdminAPIData<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type DefaultDataParams = {
  ordering?: string;
  page?: number;
  limit?: number;
} & Record<string, string | number | string[]>;
