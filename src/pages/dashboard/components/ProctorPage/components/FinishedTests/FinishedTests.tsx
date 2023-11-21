import { useEffect } from 'react';
import { A11y, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Flex, Grid, GridItem, Text } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getInPersonTestList } from 'store/actions/inPersonTests';

import StyledSwiper from 'styles/StyledSwiper';

import { InPersonTest, SwiperNavButton, TestsFallback } from 'components';

const FINISHED_SWIPER_NAV = {
  prevEl: '.swiper-button-prev-finished',
  nextEl: '.swiper-button-next-finished'
};

const FinishedTests = () => {
  const dispatch = useAppDispatch();
  const { testList, isLoading } = useAppSelector(
    (state) => state.inPersonTests
  );
  const isEmpty = !testList.length;

  useEffect(() => {
    dispatch(getInPersonTestList());
  }, [dispatch]);

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
        <Text textStyle='h2' color='blue.700' mr={{ lg: 120 }}>
          Finished In-person Tests
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
            navigation={FINISHED_SWIPER_NAV}
          >
            {testList.slice(0, 2).map((test) => (
              <SwiperSlide key={test.id}>
                <InPersonTest test={test} />
              </SwiperSlide>
            ))}
          </Swiper>
        </StyledSwiper>
      ) : (
        <TestsFallback variant='in-person' />
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
          <Flex gap={5} justifyContent='flex-end'>
            <SwiperNavButton
              type='prev'
              className={FINISHED_SWIPER_NAV.prevEl.slice(1)}
            />
            <SwiperNavButton
              type='next'
              className={FINISHED_SWIPER_NAV.nextEl.slice(1)}
            />
          </Flex>
        </GridItem>
      )}
    </Grid>
  );
};

export default FinishedTests;
