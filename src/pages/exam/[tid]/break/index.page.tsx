import { ReactElement, useCallback, useEffect } from 'react';

import { Box, Button, Flex, Grid, GridItem, Text } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { submitModule } from 'store/actions/exam';

import { ExamMode, SectionType } from 'constants/exam';

import { ExamLayout } from 'components';
import { ExamTimer } from '../components';

const ExamBreak = () => {
  const dispatch = useAppDispatch();
  const {
    id: testId,
    mode,
    timed,
    time,
    section
  } = useAppSelector((state) => state.examTest);
  const { self } = useAppSelector((state) => state.self);

  const username = `${self.first_name} ${self.last_name}`;

  const navigateToNexModule = useCallback(() => {
    // navigate to first question Math section
    const data = {
      testId,
      current: {},
      to: { next_module: true }
    };
    dispatch(submitModule(data));
  }, [dispatch, testId]);

  useEffect(() => {
    if (time === 0) {
      navigateToNexModule();
    }
  }, [navigateToNexModule, time]);

  if (section.type !== SectionType.break) {
    // Show white screen if it's not a break
    return null;
  }

  return (
    <>
      <Box
        as='main'
        position='relative'
        color='white'
        bgColor='examGray.700'
        flex='1 1 0%'
        h='100%'
      >
        <Box
          position='absolute'
          overflowY='auto'
          overscrollBehaviorY='contain'
          h='100%'
          w='100%'
        >
          <Grid
            gridTemplateColumns='repeat(2, 1fr)'
            h='100%'
            w='100%'
            alignItems='center'
          >
            {/* Left panel */}
            <GridItem>
              <Flex flexDirection='column' alignItems='center' w='100%'>
                {/* Timer */}
                {timed && <ExamTimer isBreak />}

                {mode === ExamMode.practice && (
                  <Button
                    colorScheme='examYellow'
                    onClick={navigateToNexModule}
                  >
                    Resume Testing
                  </Button>
                )}
              </Flex>
            </GridItem>

            {/* Right panel */}
            <GridItem maxW='66%'>
              {/* Break text */}
              <Box pb={3}>
                {mode === ExamMode.test ? (
                  <>
                    <Text fontSize='32px' fontWeight={500} mb={5}>
                      Test Break
                    </Text>
                    <Text lineHeight={1.5}>
                      Please wait until the clock counts down.
                    </Text>
                  </>
                ) : (
                  <>
                    <Text fontSize='32px' fontWeight={500} mb={5}>
                      Practice Test Break
                    </Text>
                    <Text lineHeight={1.5}>
                      You can resume this practice test as soon as you`re ready
                      to move on. On test day, you`ll wait until the clock
                      counts down.
                    </Text>
                  </>
                )}
              </Box>

              <Box my={4} borderTop='1px solid #fff' />

              <Box pt={4}>
                <Text fontSize='32px' fontWeight={500} mb={5}>
                  Take a Break
                </Text>
                <Text lineHeight={1.5} mb={4}>
                  You may leave the room, but do not disturb students who are
                  still testing.
                </Text>
                <Text lineHeight={1.5} mb={4}>
                  Do not quit the website or close your device. Testing won`t
                  resume until you return.
                </Text>
              </Box>
            </GridItem>
          </Grid>
        </Box>
      </Box>

      <Flex
        as='footer'
        position='relative'
        alignItems='center'
        justifyContent='space-between'
        gap={5}
        p={4}
        bgColor='examGray.700'
      >
        <Grid
          w='100%'
          p={4}
          gridTemplateColumns='repeat(3, 1fr)'
          alignItems='center'
        >
          <GridItem>
            <Text textStyle='exam-2xl' fontWeight={700} color='white'>
              {username}
            </Text>
          </GridItem>
        </Grid>
      </Flex>
    </>
  );
};

export default ExamBreak;

ExamBreak.getLayout = (page: ReactElement) => <ExamLayout>{page}</ExamLayout>;
