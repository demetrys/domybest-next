import { MouseEvent } from 'react';
import { useRouter } from 'next/router';

import { Button, Flex, Stack, Text } from '@chakra-ui/react';

import { useAppDispatch } from 'store/hooks';
import { configExam } from 'store/reducers/exam';

import { ExamPage } from 'constants/exam';
import { ROUTES } from 'constants/routes';
import { PerformTestType } from 'types/global';
import { ExamId } from 'types/models';

type PerformTestProps = {
  onClose: () => void;
  type: PerformTestType;
  examId: ExamId;
};

const PerformTest = ({ examId, type, onClose }: PerformTestProps) => {
  const dispatch = useAppDispatch();
  const { push: routerPush } = useRouter();

  const handleExamConfig = async (event: MouseEvent<HTMLButtonElement>) => {
    dispatch(
      configExam({
        examId,
        mode: (event.target as HTMLButtonElement).value
      })
    );
    onClose();
    await routerPush(`${ROUTES.exam}/${examId}/${ExamPage.start}`);
  };

  return (
    <Stack gap='30px'>
      {type === 'start' ? (
        <Stack gap={2.5}>
          <Text>You have two distinct options to take this practice test:</Text>
          <Text sx={{ '& > span': { fontWeight: 600 } }}>
            <span>PRACTICE MODE:</span> Provides the most flexibility - you can
            start and stop at any time.
          </Text>
          <Text sx={{ '& > span': { fontWeight: 600 } }}>
            <span>TEST MODE:</span> Simulates real test timing. Once the clock
            starts running be prepared to complete the entire test.
          </Text>
        </Stack>
      ) : (
        <Text>
          If you RESTART this test, your previous work will be lost. Are you
          sure you want to restart? If not, you can return to the previous page
          to RESUME your test.
        </Text>
      )}
      <Stack gap={3}>
        <Flex gap={2.5}>
          <Button
            colorScheme='blue'
            value='test'
            onClick={handleExamConfig}
            sx={{ flexGrow: 1 }}
          >
            {type === 'start' ? 'TEST MODE' : 'Restart TEST MODE'}
          </Button>
          <Button
            colorScheme='blue'
            value='practice'
            onClick={handleExamConfig}
            sx={{ flexGrow: 1 }}
          >
            {type === 'start' ? 'PRACTICE MODE' : 'Restart PRACTICE MODE'}
          </Button>
        </Flex>
        <Button width='100%' colorScheme='light' onClick={onClose}>
          Cancel
        </Button>
      </Stack>
    </Stack>
  );
};

export default PerformTest;
