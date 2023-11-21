import { ReactElement, useCallback, useEffect, useState } from 'react';
import { RiCheckLine } from 'react-icons/ri';
import { useRouter } from 'next/router';

import {
  Box,
  Button,
  Flex,
  List,
  ListIcon,
  ListItem,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack
} from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { startExamTest } from 'store/actions/exam';
import { configExam } from 'store/reducers/exam';

import { ExamMode } from 'constants/exam';

import { ExamLayout } from 'components';

const ExamStart = () => {
  const dispatch = useAppDispatch();
  const { back, query } = useRouter();
  const { mode, timed } = useAppSelector((state) => state.examTest);

  // Take examId before it will be replaced with testId
  const examId = query.tid?.toString() || '';

  const [timeMode, setTimeMode] = useState<string>('');

  useEffect(() => {
    if (timeMode.length) {
      dispatch(configExam({ examId, timed: timeMode === 'timed' }));
    }
  }, [dispatch, examId, timeMode]);

  const handleExamStart = useCallback(() => {
    dispatch(startExamTest({ examId, timed, mode }));
  }, [dispatch, examId, mode, timed]);

  return (
    <>
      <Box position='relative' flex='1 1 0%' overflowY='auto' bgColor='#fafafa'>
        <VStack py={10} minH='100%'>
          <Box
            borderRadius={10}
            bgColor='white'
            p='60px'
            w='100%'
            maxW='600px'
            shadow='md'
            color='black'
          >
            <Text textStyle='exam-4xl' fontWeight={600}>
              You are about to begin this test in {mode.toUpperCase()} MODE:
            </Text>
            <List spacing={3} mt={4} color='black'>
              <ListItem display='inline-flex'>
                <ListIcon as={RiCheckLine} color='blue.700' />
                Be sure you meet the Technology Requirements and are fully
                prepared before you begin (please refer to the Details page).
              </ListItem>
              {mode === ExamMode.test ? (
                <>
                  <ListItem display='inline-flex'>
                    <ListIcon as={RiCheckLine} color='blue.700' />
                    You have 2 hours and 24 minutes to complete this test. This
                    includes one break.
                  </ListItem>
                  <ListItem display='inline-flex'>
                    <ListIcon as={RiCheckLine} color='blue.700' />
                    You will not be able to pause or stop this test. If you exit
                    the test before completion, your work will be lost.
                  </ListItem>
                </>
              ) : (
                <ListItem display='inline-flex'>
                  <ListIcon as={RiCheckLine} color='blue.700' />
                  You will be able to start, pause, or stop this test at any
                  time.
                </ListItem>
              )}
            </List>

            {mode === ExamMode.practice && (
              <>
                <Box mt={4}>
                  <Text textStyle='exam-xl' fontWeight={500}>
                    Please select your timing mode:
                  </Text>
                </Box>
                <Box as='form' mt={4}>
                  <RadioGroup name='time_mode' onChange={setTimeMode}>
                    <Stack gap={2}>
                      <Radio value='timed' variant='exam'>
                        <b>TIMED PRACTICE MODE:</b> Complete each section within
                        the time limits of the actual test
                      </Radio>
                      <Radio value='untimed' variant='exam'>
                        <b>UNTIMED PRACTICE MODE:</b> Complete questions at your
                        own pace
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </Box>
              </>
            )}
          </Box>
        </VStack>
      </Box>
      <Flex
        as='footer'
        position='relative'
        alignItems='center'
        justifyContent='space-between'
        gap={5}
        p={4}
        bgColor='white'
        borderTop='1px solid #d1d1d1'
      >
        <Flex gap={3} wrap='wrap' alignItems='center' ml='auto'>
          <Button colorScheme='examBlue' onClick={back}>
            Back
          </Button>
          <Button
            colorScheme='examBlue'
            isDisabled={mode === ExamMode.practice && !timeMode.length}
            onClick={handleExamStart}
          >
            Next
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default ExamStart;

ExamStart.getLayout = (page: ReactElement) => <ExamLayout>{page}</ExamLayout>;
