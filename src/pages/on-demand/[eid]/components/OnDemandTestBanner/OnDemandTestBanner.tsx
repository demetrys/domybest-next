import { MouseEvent, ReactNode, useMemo } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';

import { Button } from '@chakra-ui/react';

import { useAppSelector } from 'store/hooks';

import { TestBanner } from 'components';

type OnDemandTestBannerProps = {
  onStart: () => void;
  onRestart: () => void;
  onResume: (event: MouseEvent<HTMLButtonElement>) => void;
};

const OnDemandTestBanner = ({
  onStart,
  onRestart,
  onResume
}: OnDemandTestBannerProps) => {
  const {
    test: { title, progress, isExtended }
  } = useAppSelector((state) => state.onDemandTests);

  const renderActions = () => {
    if (progress) {
      return (
        <>
          <Button colorScheme='white' onClick={onResume}>
            Resume
          </Button>
          <Button variant='outline' onClick={onRestart}>
            Restart
          </Button>
        </>
      );
    }
    return (
      <Button colorScheme='white' onClick={onStart}>
        Start
      </Button>
    );
  };

  const labels = useMemo<{ title: string; icon?: ReactNode }[]>(
    () => [
      ...(isExtended
        ? [{ title: '50% Extended time', icon: <AiOutlineInfoCircle /> }]
        : [])
    ],
    [isExtended]
  );

  return (
    <TestBanner
      title={title}
      progress={progress}
      labels={labels}
      renderActions={renderActions}
    />
  );
};

export default OnDemandTestBanner;
