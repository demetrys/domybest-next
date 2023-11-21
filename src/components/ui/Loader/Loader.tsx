import { Waveform } from '@uiball/loaders';

import { Center } from '@chakra-ui/react';

type LoaderProps = {
  fixed?: boolean;
};

const Loader = ({ fixed }: LoaderProps) => {
  const defaultProps = {
    speed: 1.1,
    color: '#1A3E6D'
  };

  if (fixed) {
    return (
      <Center
        position='fixed'
        top={0}
        left={0}
        width='100vw'
        height='100vh'
        bg='rgba(238, 244, 249, 0.75)'
        zIndex={10000}
      >
        <Waveform size={60} {...defaultProps} />
      </Center>
    );
  }

  return <Waveform size={40} {...defaultProps} />;
};

export default Loader;
