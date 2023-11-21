import { InPersonPageType } from 'constants/exam';

import { AbsenceStatus, TestCommonFields } from '../global';

export type InPersonTestType = TestCommonFields & {
  date: string;
  location: string;
  startTime: string;
  endTime: string;
};

export type CurrentPageType = keyof typeof InPersonPageType;

export type CheckInProps = {
  enrollment_id: string;
  class_id: string;
  absence_status: AbsenceStatus;
  absence_date?: string;
  notes?: string;
  extended_time?: boolean;
  technology_loaned_out?: unknown;
  technology_loaned_out_status?: unknown;
};
