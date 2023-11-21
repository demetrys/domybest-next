import { Button, Flex, Stack, Text } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { finishExam } from 'store/actions/exam';

import { QuestionOrder } from 'types/models';

type SaveExamProps = {
  step: QuestionOrder;
  onClose: () => void;
};

const FinishExam = ({ step, onClose }: SaveExamProps) => {
  const dispatch = useAppDispatch();
  const {
    id: testId,
    questions,
    markedQuestions
  } = useAppSelector((state) => state.examTest);

  const handleExamFinish = async () => {
    onClose();

    const currentQuestion =
      questions.find((q) => q.order_nr_local === step) || null;

    if (currentQuestion) {
      const data = {
        testId,
        current: {
          answer: currentQuestion.answer,
          bookmark: markedQuestions.includes(currentQuestion.order_nr_local)
        }
      };
      dispatch(finishExam(data));
    }
  };

  return (
    <Stack gap='16px'>
      <Text textStyle='exam-4xl' width='calc(100% - 48px)'>
        Are you finished and ready to have your test scored?
      </Text>
      <Text textStyle='exam-lg' mt={2}>
        Please note: you will only receive score(s) if you complete Section: 1
        Reading and Writing and/or Section 2: Math.
      </Text>

      <Flex justifyContent='flex-end' gap={8}>
        <Button
          variant='link'
          color='examBlue.500'
          fontWeight={700}
          onClick={onClose}
        >
          Continue Practice Test
        </Button>
        <Button
          colorScheme='examYellow'
          border='1px solid black'
          onClick={handleExamFinish}
        >
          Finish and Score
        </Button>
      </Flex>
    </Stack>
  );
};

export default FinishExam;
