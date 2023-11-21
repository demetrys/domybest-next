import { useEffect } from 'react';
import { A11y, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Flex, Grid, GridItem, Text } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getInPersonTestList } from 'store/actions/inPersonTests';

import { ROUTES } from 'constants/routes';

import StyledSwiper from 'styles/StyledSwiper';

import { InPersonTest, Link, SwiperNavButton, TestsFallback } from 'components';

const IN_PERSON_SWIPER_NAV = {
  prevEl: '.swiper-button-prev-in-person',
  nextEl: '.swiper-button-next-in-person'
};

const InPersonTests = () => {
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
        <Text mb={3} textStyle='h2' color='blue.700'>
          In-Person Tests
        </Text>
        <Text mb={3}>
          In-person practice tests provide a proctored, classroom environment
          that simulates the actual test day experience.
        </Text>
        <Text>
          Here are the upcoming in-person practice tests you are registered for:
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
            navigation={IN_PERSON_SWIPER_NAV}
          >
            {testList.map((test) => (
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
          <Flex justifyContent='space-between'>
            <Link to={ROUTES.inPerson} buttonProps={{ colorScheme: 'blue' }}>
              Show all
            </Link>
            <Flex gap={5} ml='auto'>
              <SwiperNavButton
                type='prev'
                className={IN_PERSON_SWIPER_NAV.prevEl.slice(1)}
              />
              <SwiperNavButton
                type='next'
                className={IN_PERSON_SWIPER_NAV.nextEl.slice(1)}
              />
            </Flex>
          </Flex>
        </GridItem>
      )}
    </Grid>
  );
};

export default InPersonTests;
