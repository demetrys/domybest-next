import { MouseEvent, useEffect } from 'react';
import { A11y, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Box, Flex, Text, useMediaQuery } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getCompletedTestList } from 'store/actions/completedTests';
import { openModalByType, openPerformTestModal } from 'store/reducers/modal';

import { ROUTES } from 'constants/routes';

import StyledSwiper from 'styles/StyledSwiper';

import {
  CompletedTest,
  FullWidthBg,
  Link,
  SwiperNavButton,
  TestsFallback
} from 'components';

const COMPLETED_SWIPER_NAV = {
  prevEl: '.swiper-button-prev-completed',
  nextEl: '.swiper-button-next-completed'
};

const CompletedTests = () => {
  const dispatch = useAppDispatch();
  const { testList, isLoading } = useAppSelector(
    (state) => state.completedTests
  );
  const [isDesktop] = useMediaQuery('(min-width: 1024px)');

  const isEmpty = !testList.length;

  useEffect(() => {
    dispatch(getCompletedTestList());
  }, [dispatch]);

  const handleResume = (event: MouseEvent<HTMLButtonElement>) => {
    if (!isDesktop) {
      event.preventDefault();
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
    <Box py={{ base: '50px', md: 20 }} position='relative'>
      <FullWidthBg bg='blue.700' />
      <Text textStyle='h2' color='white' mb={{ base: '30px', md: 10 }}>
        Completed Tests
      </Text>
      {!isEmpty ? (
        <StyledSwiper>
          <Swiper
            modules={[Navigation, A11y]}
            spaceBetween={16}
            slidesPerView={1.25}
            breakpoints={{
              600: {
                slidesPerView: 1.5
              },
              768: {
                slidesPerView: 2
              },
              1200: {
                slidesPerView: 2,
                spaceBetween: 30
              }
            }}
            navigation={COMPLETED_SWIPER_NAV}
          >
            {testList.map((test) => (
              <SwiperSlide key={test.id}>
                <CompletedTest
                  test={test}
                  onResume={handleResume}
                  onRestart={handleRestart(test.id)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </StyledSwiper>
      ) : (
        <TestsFallback variant='completed' />
      )}
      {!isEmpty && (
        <Flex justifyContent='space-between' mt={{ base: '30px', md: '50px' }}>
          <Link
            to={ROUTES.completed}
            buttonProps={{ colorScheme: 'white', isDisabled: isEmpty }}
          >
            Show all
          </Link>
          <Flex ml='auto' gap={5}>
            <SwiperNavButton
              type='prev'
              className={COMPLETED_SWIPER_NAV.prevEl.slice(1)}
              colorScheme='blue'
            />
            <SwiperNavButton
              type='next'
              className={COMPLETED_SWIPER_NAV.nextEl.slice(1)}
              colorScheme='blue'
            />
          </Flex>
        </Flex>
      )}
    </Box>
  );
};

export default CompletedTests;
