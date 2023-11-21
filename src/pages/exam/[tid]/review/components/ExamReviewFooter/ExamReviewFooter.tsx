import { useCallback } from 'react';

import { Box, Button, Checkbox, Flex } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getReviewQuestion } from 'store/actions/exam';

import { NavigateDirection, ReviewNavigateData } from 'types/models';

import { BorderDashed } from 'components';

type ExamReviewFooterProps = {
  id: string;
  hidden: boolean;
  onHideToggle: () => void;
};

const ExamReviewFooter = ({
  id,
  hidden,
  onHideToggle
}: ExamReviewFooterProps) => {
  const dispatch = useAppDispatch();
  const { pos, next, back } = useAppSelector(
    (state) => state.reviewExam.question
  );

  const handleReviewNavigate = useCallback(
    (direction: NavigateDirection) => async () => {
      try {
        const data: ReviewNavigateData = {
          current_path: pos,
          to: {
            [direction]: true
          }
        };
        await dispatch(getReviewQuestion(id, data));
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch, id, pos]
  );

  return (
    <Box as='footer' position='relative' bgColor='white' order={1} zIndex={8}>
      <BorderDashed isColor />
      <Flex
        p={4}
        alignItems='center'
        bgColor='white'
        justifyContent='space-between'
      >
        <Checkbox
          checked={hidden}
          variant='exam'
          size='md'
          onChange={onHideToggle}
        >
          Hide correct answer and explanation
        </Checkbox>
        <Flex gap={3} alignItems='center' justifyContent='flex-end'>
          {back && (
            <Button
              colorScheme='examBlue'
              onClick={handleReviewNavigate('prev_question')}
            >
              Back
            </Button>
          )}
          {next && (
            <Button
              colorScheme='examBlue'
              onClick={handleReviewNavigate('next_question')}
            >
              Next
            </Button>
          )}
        </Flex>
      </Flex>

      {/* Copyright */}
      <Flex
        alignItems='center'
        justifyContent='center'
        bgColor='#f4f5f8'
        color='#808180'
        fontSize='10px'
        minH={6}
      >
        SAT® and PSAT/NMSQT® are trademarks registered by the College Board,
        which is not affiliated with, and does not endorse, SAT Prep.
      </Flex>
    </Box>
  );
};

export default ExamReviewFooter;
