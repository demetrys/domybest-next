import { PropsWithChildren } from 'react';

import { Box } from '@chakra-ui/react';

type NavigationItemProps = PropsWithChildren & {
  size?: 'small' | 'big';
  hasAnswer: boolean;
  isCurrent: boolean;
  onClick: () => void;
};

const NavigationItem = ({
  size = 'small',
  hasAnswer,
  isCurrent,
  onClick,
  children
}: NavigationItemProps) => {
  const isSmall = size === 'small';

  return (
    <Box
      as='button'
      onClick={onClick}
      w={isSmall ? 7 : 10}
      h={isSmall ? 7 : 10}
      minW={isSmall ? 7 : 10}
      minH={isSmall ? 7 : 10}
      m={isSmall ? 2 : 4}
      p={0}
      fontSize={isSmall ? 16 : 24}
      border={hasAnswer ? '1px solid' : '1px dashed'}
      borderColor={hasAnswer ? 'examBlue.500' : 'examGray.700'}
      bg={hasAnswer ? 'examBlue.500' : 'transparent'}
      color={hasAnswer ? 'white' : 'examBlue.500'}
      textDecoration={isCurrent ? 'underline' : 'none'}
      sx={{
        position: 'relative',
        borderRadius: 0,
        fontWeight: 700,
        '& > .position': {
          position: 'absolute',
          top: '-15px',
          left: '6px',
          color: 'examGray.700'
        },
        '& > .bookmark': {
          position: 'absolute',
          right: -1.5,
          top: -1.5,
          bg: 'white'
        }
      }}
    >
      {children}
    </Box>
  );
};

export default NavigationItem;
