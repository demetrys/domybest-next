import { Box, BoxProps } from '@chakra-ui/react';

const FullWidthBg = ({ ...props }: BoxProps) => (
  <Box
    position='absolute'
    top={0}
    bottom={0}
    left='50%'
    transform='translateX(-50%)'
    width='102vw'
    zIndex={-1}
    {...props}
  />
);

export default FullWidthBg;
