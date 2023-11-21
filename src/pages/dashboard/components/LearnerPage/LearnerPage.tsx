import { DemoBanner } from 'components';
import {
  CompletedTests,
  InPersonTests,
  OnDemandTests,
  PurchaseBanner
} from './components';
import { DashboardBanner } from '../DashboardBanner';

const LearnerPage = () => (
  <>
    <DashboardBanner />
    <DemoBanner />
    <OnDemandTests />
    <InPersonTests />
    <CompletedTests />
    <PurchaseBanner />
  </>
);

export default LearnerPage;
