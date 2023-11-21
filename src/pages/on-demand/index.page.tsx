import { Box } from '@chakra-ui/react';

import { ROUTES } from 'constants/routes';

import bannerSrc from 'assets/images/banners/on-demand_tests_banner.jpg';

import { Breadcrumbs, HeroBanner } from 'components';
import { Accordion, OnDemandTestsTabs } from './components';

const OnDemandTest = () => (
  <>
    <Breadcrumbs
      nav={[
        { title: 'Dashboard', path: ROUTES.dashboard },
        { title: 'On-Demand Tests' }
      ]}
    />
    <Box mb={{ base: '30px', md: '60px' }}>
      <HeroBanner
        title='On-Demand Tests'
        imageAlt='On-Demand Tests'
        imageSrc={bannerSrc}
      />
    </Box>
    <Accordion />
    <OnDemandTestsTabs />
  </>
);

export default OnDemandTest;
