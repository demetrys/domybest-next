import { Box, Text } from '@chakra-ui/react';

const Directions = () => (
  <Box
    minHeight={194}
    bg='white'
    py='30px'
    px={{ base: 4, md: 6 }}
    borderRadius={10}
  >
    <Text textStyle='big2' color='blue.700' mb={4}>
      Directions:
    </Text>
  </Box>
);

export default Directions;
