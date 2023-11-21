import { Box } from '@chakra-ui/react';

import bannerSrc from 'assets/images/banners/learner_dashboard_banner.jpg';

import { HeroBanner } from 'components';

const DashboardBanner = () => (
  <Box mt={{ base: '30px', md: 10 }} mb={{ base: '70px', md: '60px' }}>
    <HeroBanner
      title='Welcome!'
      imageSrc={bannerSrc}
      imageAlt='Welcome to SAT Prep'
    />
  </Box>
);

export default DashboardBanner;
