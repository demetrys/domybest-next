import { memo, useCallback } from 'react';
import { AiOutlinePauseCircle, AiOutlinePlayCircle } from 'react-icons/ai';

import { Box, Button, Flex, Grid, GridItem, Text } from '@chakra-ui/react';

import { useCountdown } from 'hooks';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { pauseExamTest } from 'store/actions/exam';

import { ExamMode } from 'constants/exam';
import { QuestionOrder } from 'types/models';

import { BorderDashed, Directions, Stopwatch } from 'components';
import { ExamTimer } from '../ExamTimer';
import { ExamTools } from '../ExamTools';

type ExamHeaderProps = {
  title: string | null;
  isReview: string | null;
  step: QuestionOrder;
};

const ExamHeader = memo(({ title, isReview, step }: ExamHeaderProps) => {
  const id = useAppSelector((state) => state.examTest.id);
  const mode = useAppSelector((state) => state.examTest.mode);
  const timed = useAppSelector((state) => state.examTest.timed);
  const isPaused = useAppSelector((state) => state.examTest.isPaused);
  const sectionId = useAppSelector((state) => state.examTest.section.id);

  const dispatch = useAppDispatch();
  const { handleCountdownToggle, countdownState } = useCountdown();

  const onCountdownToggle = useCallback(() => {
    handleCountdownToggle();

    // Use 'pause' method as toggle
    dispatch(pauseExamTest(id));
  }, [dispatch, handleCountdownToggle, id]);

  return (
    <Box position='relative' as='header' bgColor='white' order={-1} zIndex={10}>
      <Grid
        w='100%'
        gridTemplateColumns='repeat(3, 1fr)'
        alignItems='center'
        minH='60px'
        py={2}
        px={8}
        bgColor='white'
      >
        <GridItem>
          <Box>
            <Text textStyle='exam-2xl' color='examGray.400' fontWeight={500}>
              {title}
            </Text>
          </Box>
          {!!title && <Directions sectionId={sectionId} />}
        </GridItem>

        {/* Section timer */}
        <GridItem textAlign='center' pt={2} pb={1.5} minH='72px'>
          {/* TODO: Fix untimed mode. Update Stopwatch with WS logic */}
          {timed ? (
            <ExamTimer />
          ) : (
            <Stopwatch timerState={countdownState} offset={0} />
          )}
        </GridItem>

        {/* Module tools buttons */}
        <GridItem>
          <Flex justifyContent='flex-end'>
            {mode === ExamMode.practice && (
              <Button
                variant='link'
                flexDirection='column'
                fontSize={12}
                fontWeight={500}
                color='examGray.700'
                ml={4}
                sx={{ '& > svg': { mb: 1 } }}
                onClick={onCountdownToggle}
              >
                {isPaused ? (
                  <>
                    <AiOutlinePlayCircle size={18} />
                    Resume
                  </>
                ) : (
                  <>
                    <AiOutlinePauseCircle size={18} />
                    Pause time
                  </>
                )}
              </Button>
            )}
            {!isReview && <ExamTools step={step} />}
          </Flex>
        </GridItem>
      </Grid>
      <BorderDashed isColor={mode === ExamMode.test} />
    </Box>
  );
});

ExamHeader.displayName = 'ExamHeader';
export default ExamHeader;
