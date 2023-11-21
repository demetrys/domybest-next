import { useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlinePauseCircle } from 'react-icons/ai';
import { MdOutlineTimer } from 'react-icons/md';

import { Button, Flex, Stack, Text } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { toggleAppLoader } from 'store/reducers/appLoader';
import { receiveTime } from 'store/reducers/exam';

import { getFormattedTime } from 'utils/time';

import { SectionType, TestingStatus } from 'constants/exam';
import { RemainingTimeData } from 'types/models';

type ExamTimerProps = {
  isBreak?: boolean;
};

const ExamTimer = ({ isBreak = false }: ExamTimerProps) => {
  const dispatch = useAppDispatch();
  const { id, time, section, module, isPaused } = useAppSelector(
    (state) => state.examTest
  );
  const { isLoading } = useAppSelector((state) => state.loader);

  const [hidden, setHidden] = useState<boolean>(false);

  const isAppLoading = useRef<boolean>(false);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const fewTimeLeft = Boolean(time && time <= 300); // 5 mins

  useEffect(() => {
    isAppLoading.current = isLoading;
  }, [isLoading]);

  const toggleLoaderOn = useCallback(() => {
    if (section.id === SectionType.rw && module.id === '1') {
      dispatch(toggleAppLoader(true));
    }
  }, [dispatch, module.id, section.id]);

  const toggleLoaderOff = useCallback(() => {
    if (isAppLoading.current) {
      dispatch(toggleAppLoader(false));
    }
  }, [dispatch]);

  useEffect(() => {
    const socket = new WebSocket(
      `${process.env.NEXT_PUBLIC_EXAM_WS_URL}/ws/exam/${id}/`
    );

    socket.onopen = () => {
      // Block user before exam start
      toggleLoaderOn();

      socket.send(
        JSON.stringify({
          action: 'ping',
          data: {}
        })
      );

      if (!timer.current) {
        timer.current = setInterval(() => {
          socket.send(
            JSON.stringify({
              action: 'ping',
              data: {}
            })
          );

          // Prevent false message sending if WS connection was closed
          if (socket.readyState === 2 || socket.readyState === 3) {
            if (timer.current) {
              clearInterval(timer.current);
              timer.current = null;
            }
          }
        }, 1000);
      }
    };

    socket.onmessage = (event: MessageEvent<string>) => {
      const { time_remaining, test_status } = JSON.parse(
        event.data
      ) as RemainingTimeData;

      // Toggle loader off when exam is running
      if (test_status === TestingStatus.running) {
        dispatch(receiveTime(Math.ceil(time_remaining)));
        toggleLoaderOff();
      }

      if (time_remaining === 0) {
        if (timer.current) {
          clearInterval(timer.current);
          timer.current = null;
        }
      }
    };

    return () => {
      socket.close();
      socket.onclose = () => {
        dispatch(receiveTime(null));
      };
      if (timer.current) {
        clearInterval(timer.current);
        timer.current = null;
      }
    };
    // Keep these deps to prevent socket reopen
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dispatch]);

  const handleVisibilityToggle = () => {
    setHidden((prevState) => !prevState);
  };

  if (time === null) {
    return null;
  }

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
        {getFormattedTime(time)}
      </Text>
    </Stack>
  ) : (
    <Stack spacing='10px' alignItems='center'>
      <Flex gap={2} alignItems='center'>
        {isPaused && <AiOutlinePauseCircle size={16} />}
        <Text
          textStyle='exam-2xl'
          letterSpacing='1px'
          color={fewTimeLeft ? 'red.500' : 'examGray.400'}
          fontWeight={500}
          transform='translateY(1px)'
        >
          {hidden && !fewTimeLeft ? (
            <MdOutlineTimer size={23} />
          ) : (
            getFormattedTime(time)
          )}
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

export default ExamTimer;
