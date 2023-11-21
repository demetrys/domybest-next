import { Box, Stack } from '@chakra-ui/react';

const DOT_STYLES = {
  width: 1,
  height: 1,
  bg: 'white',
  borderRadius: '50%'
};

const LEFT_DOT_STYLES = {
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: -2.5,
    ...DOT_STYLES
  }
};

const RIGHT_DOT_STYLES = {
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 2.5,
    ...DOT_STYLES
  }
};

const DragDots = () => (
  <Stack
    position='absolute'
    top='50%'
    left='50%'
    transform='translate(-50%, -50%)'
  >
    <Box
      position='relative'
      {...DOT_STYLES}
      sx={{
        ...LEFT_DOT_STYLES,
        ...RIGHT_DOT_STYLES
      }}
    />
    <Box
      position='relative'
      {...DOT_STYLES}
      sx={{
        ...LEFT_DOT_STYLES,
        ...RIGHT_DOT_STYLES
      }}
    />
  </Stack>
);

export default DragDots;
