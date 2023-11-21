import { FinishedTests, UpcomingAndInProgressTests } from './components';
import { DashboardBanner } from '../DashboardBanner';

const ProctorPage = () => (
  <>
    <DashboardBanner />
    <UpcomingAndInProgressTests />
    <FinishedTests />
  </>
);

export default ProctorPage;
