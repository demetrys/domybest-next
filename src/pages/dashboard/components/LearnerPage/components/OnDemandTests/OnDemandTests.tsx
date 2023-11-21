import { useEffect } from 'react';
import { A11y, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Flex, Grid, GridItem, Text, useMediaQuery } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { resumeExamTest } from 'store/actions/exam';
import { getOnDemandTestList } from 'store/actions/onDemandTests';
import { openModalByType, openPerformTestModal } from 'store/reducers/modal';

import { ROUTES } from 'constants/routes';
import { ResumeExamProps } from 'types/models';

import StyledSwiper from 'styles/StyledSwiper';

import { Link, SwiperNavButton, TestsFallback } from 'components';
import { OnDemandTest } from './components';

const DEMAND_SWIPER_NAV = {
  prevEl: '.swiper-button-prev-on-demand',
  nextEl: '.swiper-button-next-on-demand'
};

const OnDemandTests = () => {
  const dispatch = useAppDispatch();
  const { testList, isLoading } = useAppSelector(
    (state) => state.onDemandTests
  );
  const [isDesktop] = useMediaQuery('(min-width: 1024px)');

  const isEmpty = !testList.length;

  useEffect(() => {
    dispatch(getOnDemandTestList());
  }, [dispatch]);

  const handleResume = ({ eid, testId }: ResumeExamProps) => {
    if (isDesktop) {
      if (testId) {
        dispatch(resumeExamTest({ eid, testId }));
      }
    } else {
      dispatch(openModalByType('device'));
    }
  };

  const handleRestart = (id: string) => () => {
    if (isDesktop) {
      dispatch(openPerformTestModal({ type: 'restart', id }));
    } else {
      dispatch(openModalByType('device'));
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <Grid
      gap={{
        base: 6,
        lg: '30px'
      }}
      my={{ base: '70px', md: '100px' }}
      gridTemplateRows={{
        lg: '1fr auto'
      }}
      gridTemplateColumns={{
        lg: '280px auto'
      }}
    >
      <GridItem
        gridRow={{
          lg: '1/2'
        }}
        gridColumn={{ lg: '1/2' }}
      >
        <Text mb={3} textStyle='h2' color='blue.700'>
          On-Demand Tests
        </Text>
        <Text>
          Take a test anytime, anywhere.
          <br /> Self-proctored practice tests on our digital platform mirror
          the official tests. Get started NOW!
        </Text>
      </GridItem>
      {!isEmpty ? (
        <StyledSwiper
          sx={{
            gridRow: {
              lg: '1/3'
            },
            gridColumn: {
              lg: '2'
            }
          }}
        >
          <Swiper
            modules={[Navigation, A11y]}
            spaceBetween={16}
            slidesPerView='auto'
            breakpoints={{
              1200: {
                spaceBetween: 30
              }
            }}
            navigation={DEMAND_SWIPER_NAV}
          >
            {testList.map((test) => (
              <SwiperSlide key={test.id}>
                <OnDemandTest
                  test={test}
                  onRestart={handleRestart(test.id)}
                  onResume={handleResume}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </StyledSwiper>
      ) : (
        <TestsFallback variant='on-demand' />
      )}
      {!isEmpty && (
        <GridItem
          gridRow={{ lg: '2' }}
          gridColumn={{ lg: '1/2' }}
          mt={{
            base: 4,
            lg: 0
          }}
        >
          <Flex justifyContent='space-between'>
            <Link to={ROUTES.onDemand} buttonProps={{ colorScheme: 'blue' }}>
              Show all
            </Link>
            <Flex gap={5} ml='auto'>
              <SwiperNavButton
                type='prev'
                className={DEMAND_SWIPER_NAV.prevEl.slice(1)}
              />
              <SwiperNavButton
                type='next'
                className={DEMAND_SWIPER_NAV.nextEl.slice(1)}
              />
            </Flex>
          </Flex>
        </GridItem>
      )}
    </Grid>
  );
};

export default OnDemandTests;
