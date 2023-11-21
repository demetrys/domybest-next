import { MouseEvent } from 'react';
import { useRouter } from 'next/router';

import { Button, Flex, Stack, Text } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { configExam } from 'store/reducers/exam';

import { ExamPage } from 'constants/exam';
import { ROUTES } from 'constants/routes';

type SaveExamProps = {
  onClose: () => void;
};

const RestartExam = ({ onClose }: SaveExamProps) => {
  const dispatch = useAppDispatch();
  const { push: routerPush } = useRouter();
  const { eid: examId } = useAppSelector((state) => state.examTest);

  const handleExamConfig = async (event: MouseEvent<HTMLButtonElement>) => {
    await dispatch(
      configExam({
        examId,
        mode: (event.target as HTMLButtonElement).value
      })
    );
    onClose();
    await routerPush(`${ROUTES.exam}/${examId}/${ExamPage.start}`);
  };

  return (
    <Stack gap='16px'>
      <Text textStyle='exam-4xl' width='calc(100% - 48px)'>
        Restart test?
      </Text>
      <Text textStyle='exam-lg' mt={2}>
        If you RESTART this test, your previous work will be lost. Are you sure
        you want to restart? If not, you can return to the previous page to
        RESUME your test.
      </Text>

      <Stack gap={3}>
        <Flex gap={2.5}>
          <Button
            colorScheme='examYellow'
            border='1px solid black'
            value='test'
            onClick={handleExamConfig}
            sx={{ flexGrow: 1 }}
          >
            Restart TEST MODE
          </Button>
          <Button
            colorScheme='examYellow'
            border='1px solid black'
            value='practice'
            onClick={handleExamConfig}
            sx={{ flexGrow: 1 }}
          >
            Restart PRACTICE MODE
          </Button>
        </Flex>
        <Button width='100%' colorScheme='light' onClick={onClose}>
          Cancel
        </Button>
      </Stack>
    </Stack>
  );
};

export default RestartExam;
