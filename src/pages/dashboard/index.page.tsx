import { useAppSelector } from 'store/hooks';

import { Roles } from 'constants/roles';

import { LearnerPage, ProctorPage } from './components';

const DashboardPage = () => {
  const self = useAppSelector((state) => state.self.self);

  if (self.role === Roles.Learner) {
    return <LearnerPage />;
  }

  if (self.role === Roles.Proctor) {
    return <ProctorPage />;
  }

  return null;
};

export default DashboardPage;
