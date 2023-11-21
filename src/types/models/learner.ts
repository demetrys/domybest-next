import { AbsenceStatus } from '../global';

export type LearnerId = string;

export type Device = {
  name: string;
  status: string;
};

export type Learner = {
  id: LearnerId;
  first_name?: string;
  last_name?: string;
  notes_to?: string;
  extended_time: boolean;
  absence_status: AbsenceStatus;
  notes?: string;
  enrollment_id: string;
  status: string;
  time: number | null;
  devices?: Device[];
};
