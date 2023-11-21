import { MouseEvent, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Grid, GridItem, Stack, useMediaQuery } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { resumeExamTest } from 'store/actions/exam';
import { getOnDemandTest } from 'store/actions/onDemandTests';
import { openModalByType, openPerformTestModal } from 'store/reducers/modal';

import { ROUTES } from 'constants/routes';
import { PerformTestType } from 'types/global';

import { Breadcrumbs } from 'components';
import {
  Directions,
  ScoreReportAndResults,
  TestOverview
} from 'components/exam/ExamInfo';
import {
  OnDemandTestBanner,
  TechnologyRequirements,
  WhatYouNeed
} from './components';

const OnDemandTestPage = () => {
  const dispatch = useAppDispatch();
  const {
    test: { testId, title },
    isLoading
  } = useAppSelector((state) => state.onDemandTests);
  const { query } = useRouter();
  const [isDesktop] = useMediaQuery('(min-width: 1024px)');

  const eid = query?.eid?.toString() || '';

  const isDataLoading = isLoading || !title;

  useEffect(() => {
    dispatch(getOnDemandTest(eid));
  }, [dispatch, eid]);

  const handleResume = (event: MouseEvent<HTMLButtonElement>) => {
    if (isDesktop) {
      // TODO: Get live_test_id from getOnDemandTest() before resume
      if (testId) {
        dispatch(resumeExamTest({ eid, testId }));
      }
    } else {
      event.preventDefault();
      dispatch(openModalByType('device'));
    }
  };

  const handlePerform = (type: PerformTestType) => () => {
    if (isDesktop) {
      dispatch(openPerformTestModal({ type, id: eid }));
    } else {
      dispatch(openModalByType('device'));
    }
  };

  return (
    <>
      {!isDataLoading && (
        <Breadcrumbs
          nav={[
            { title: 'Dashboard', path: ROUTES.dashboard },
            { title: 'On-Demand Tests', path: ROUTES.onDemand },
            { title }
          ]}
        />
      )}
      <OnDemandTestBanner
        onStart={handlePerform('start')}
        onRestart={handlePerform('restart')}
        onResume={handleResume}
      />
      <Stack
        gap='30px'
        mt={{ base: '30px', md: '60px' }}
        mb={{ base: '70px', md: '100px' }}
      >
        <TestOverview />
        <Grid
          gap='30px'
          gridTemplateColumns={{
            base: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)'
          }}
        >
          <GridItem>
            <WhatYouNeed />
          </GridItem>
          <GridItem>
            <TechnologyRequirements />
          </GridItem>
          <GridItem>
            <Directions />
          </GridItem>
        </Grid>
        <ScoreReportAndResults />
      </Stack>
    </>
  );
};

export default OnDemandTestPage;
