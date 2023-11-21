import { useState } from 'react';
import { AiOutlinePauseCircle } from 'react-icons/ai';
import { MdOutlineTimer } from 'react-icons/md';
import { useTimer } from 'react-timer-hook';

import { Button, Flex, Stack, Text } from '@chakra-ui/react';

import { CountdownState } from 'hooks/useCountdown';

import { getTimerText } from 'utils/time';

import { DEMO_SECTION_CLASS_NAMES } from 'constants/demo';

type CommonProps = {
  timeStamp: number; // in seconds
  onExpire: () => void;
};

type ConditionalProps<T> = T extends false
  ? {
      state?: CountdownState;
      isBreak?: T;
    }
  : {
      state?: never;
      isBreak?: T;
    };

type CountdownProps<T> = CommonProps & ConditionalProps<T>;

const Countdown = <T = false,>({
  timeStamp,
  onExpire,
  state,
  isBreak
}: CountdownProps<T>) => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + timeStamp);

  const { hours, minutes, seconds, totalSeconds } = useTimer({
    expiryTimestamp: time,
    onExpire
  });

  const [hidden, setHidden] = useState<boolean>(false);
  const fewTimeLeft = totalSeconds <= 300; // 5 mins

  const handleVisibilityToggle = () => {
    setHidden((prevState) => !prevState);
  };

  const timerText = getTimerText({ seconds, minutes, hours });

  return isBreak ? (
    <Stack
      justifyContent='center'
      alignItems='center'
      border='1px solid #eee'
      boxShadow='0 0 8px 5px rgba(153, 153, 153, .15)'
      borderRadius={8}
      py='14px'
      mb={8}
      color='white'
      bg='transparent'
      w='100%'
      maxWidth={275}
    >
      <Text fontSize={19} lineHeight='1' fontWeight={700}>
        Remaining Break Time:
      </Text>
      <Text fontSize={64} lineHeight='1' fontWeight={500}>
        {timerText}
      </Text>
    </Stack>
  ) : (
    <Stack spacing='10px' alignItems='center'>
      <Flex gap={2} alignItems='center'>
        {state === 'pause' && <AiOutlinePauseCircle size={16} />}
        <Text
          textStyle='exam-2xl'
          letterSpacing='1px'
          color={fewTimeLeft ? 'red.500' : 'examGray.400'}
          fontWeight={500}
          transform='translateY(1px)'
          className={DEMO_SECTION_CLASS_NAMES.timer}
        >
          {hidden && !fewTimeLeft ? <MdOutlineTimer size={23} /> : timerText}
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
          },
          _disabled: {
            opacity: 0.4,
            cursor: 'not-allowed',
            _hover: {
              bg: 'transparent'
            },
            _active: {
              color: '#1e1e1e'
            }
          }
        }}
        isDisabled={fewTimeLeft}
        onClick={handleVisibilityToggle}
      >
        {hidden ? 'Show' : 'Hide'}
      </Button>
    </Stack>
  );
};

export default Countdown;
