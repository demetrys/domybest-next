import { Box } from '@chakra-ui/react';

const DesmosCalculator = () => (
  <Box
    height='100%'
    sx={{
      '& > embed': { width: '100%', height: '100%' }
    }}
  >
    <embed type='text/html' src='https://www.desmos.com/calculator/graphic' />
  </Box>
);

export default DesmosCalculator;
