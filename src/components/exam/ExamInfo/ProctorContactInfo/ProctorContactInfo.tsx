import { Box, Text } from '@chakra-ui/react';

const ProctorContactInfo = () => (
  <Box
    minHeight={202}
    bg='white'
    py='30px'
    px={{ base: 4, md: 6 }}
    borderRadius={10}
  >
    <Text textStyle='big2' color='blue.700' mb={4}>
      Proctor Contact Information:
    </Text>
  </Box>
);

export default ProctorContactInfo;
