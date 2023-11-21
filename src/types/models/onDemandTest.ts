import { TestCommonFields } from 'types/global';

import { TestId } from './exam';

export type OnDemandTestType = TestCommonFields & {
  testId?: TestId;
  progress?: number;
};
