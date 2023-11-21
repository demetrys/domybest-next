import { useEffect, useState } from 'react';
import { AiOutlinePauseCircle } from 'react-icons/ai';
import { MdOutlineTimer } from 'react-icons/md';
import { useStopwatch } from 'react-timer-hook';

import { Button, Flex, Stack, Text } from '@chakra-ui/react';

import { CountdownState } from 'hooks/useCountdown';

import { getTimerText } from 'utils/time';

type StopwatchProps = {
  offset: number; // in seconds
  timerState?: CountdownState;
  onPause?: () => void;
  onResume?: () => void;
};

const Stopwatch = ({
  offset,
  timerState,
  onPause,
  onResume
}: StopwatchProps) => {
  const dateOffset = new Date();
  dateOffset.setSeconds(dateOffset.getSeconds() + offset);

  const { seconds, minutes, hours, isRunning, pause, start } = useStopwatch({
    autoStart: true,
    offsetTimestamp: dateOffset
  });

  const [hidden, setHidden] = useState<boolean>(false);

  useEffect(() => {
    if (timerState === 'pause') {
      if (onPause) {
        onPause();
      }
      pause();
    }

    if (timerState === 'resume' && !isRunning) {
      if (onResume) {
        onResume();
      }
      start();
    }
  }, [timerState, pause, start, onResume, onPause, isRunning]);

  const handleVisibilityToggle = () => {
    setHidden((prevState) => !prevState);
  };

  const timerText = getTimerText({ seconds, minutes, hours });

  return (
    <Stack spacing='10px' alignItems='center'>
      <Flex gap={2} alignItems='center'>
        {!isRunning && <AiOutlinePauseCircle size={16} />}
        <Text
          textStyle='exam-2xl'
          color='#424242'
          fontWeight={500}
          transform='translateY(1px)'
        >
          {hidden ? <MdOutlineTimer size={23} /> : timerText}
        </Text>
      </Flex>
      <Button
        sx={{
          padding: '5px 12px',
          minHeight: 5,
          lineHeight: '14px',
          bg: 'transparent',
          color: '#1e1e1e',
          border: '1px solid #1e1e1e',
          fontWeight: 500,
          minW: 65,
          _hover: {
            bg: '#2222221f'
          }
        }}
        onClick={handleVisibilityToggle}
      >
        {hidden ? 'Show' : 'Hide'}
      </Button>
    </Stack>
  );
};

export default Stopwatch;
