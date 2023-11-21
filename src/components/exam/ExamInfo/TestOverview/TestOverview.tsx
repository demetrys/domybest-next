import { Box, Text } from '@chakra-ui/react';

const TestOverview = () => (
  <Box
    minHeight={300}
    bg='white'
    py='30px'
    px={{ base: 4, md: 6 }}
    borderRadius={10}
  >
    <Text textStyle='big2' color='blue.700' mb={4}>
      Test Overview:
    </Text>
  </Box>
);

export default TestOverview;
