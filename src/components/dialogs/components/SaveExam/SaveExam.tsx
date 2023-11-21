import { Button, Flex, Stack, Text } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { saveExam } from 'store/actions/exam';

import { QuestionOrder } from 'types/models';

type SaveExamProps = {
  step: QuestionOrder;
  onClose: () => void;
};

const SaveExam = ({ step, onClose }: SaveExamProps) => {
  const dispatch = useAppDispatch();
  const {
    id: testId,
    questions,
    markedQuestions
  } = useAppSelector((state) => state.examTest);

  const handleExamSave = async () => {
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
      dispatch(saveExam(data));
    }
  };

  return (
    <Stack gap='16px'>
      <Text textStyle='exam-4xl' width='calc(100% - 48px)'>
        Do you want to exit this practice test?
      </Text>
      <Text textStyle='exam-lg' mt={2}>
        If you exit now, your progress will be saved and your test will not be
        scored. You can resume this test anytime.
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
          onClick={handleExamSave}
        >
          Save and Exit
        </Button>
      </Flex>
    </Stack>
  );
};

export default SaveExam;
