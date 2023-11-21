import { Flex, Stack, Text } from '@chakra-ui/react';

const TestScore = () => (
  <Stack
    gap={4}
    flexDirection={{ base: 'column', lg: 'row' }}
    pb={{ lg: '34px' }}
    borderColor='grey.300'
    borderBottomWidth={{ lg: 1 }}
  >
    <Stack
      gap={3}
      pb={{ base: '29px', lg: 0 }}
      borderBottomWidth={{ base: 1, lg: 0 }}
      borderColor='grey.300'
      width={{ lg: '40%' }}
    >
      <Stack gap='1px'>
        <Text textStyle='sm1' opacity={0.75}>
          Total Score
        </Text>
        <Text textStyle='score-4xl' color='blue.700'>
          1555
        </Text>
      </Stack>
      <Stack gap={2}>
        <Text textStyle='sm1' opacity={0.75}>
          Score Range
        </Text>
        <Text textStyle='score-sm' fontWeight={700} color='blue.700'>
          1550-1560
        </Text>
      </Stack>
    </Stack>
    <Flex
      justifyContent={{ base: 'space-between', lg: 'flex-start' }}
      flexDirection={{ lg: 'column' }}
      gap={{ lg: 5 }}
      pb={{ base: 4, lg: 0 }}
      borderBottomWidth={{ base: 1, lg: 0 }}
      borderColor='grey.300'
      width={{ lg: '30%' }}
    >
      <Stack gap={1.5}>
        <Text textStyle='sm1' opacity={0.75}>
          R&W Score
        </Text>
        <Text textStyle='score-2xl' color='blue.700'>
          755
        </Text>
      </Stack>
      <Stack gap={{ base: 1, lg: 2.5 }}>
        <Text textStyle='sm1' opacity={0.75}>
          Score Range
        </Text>
        <Text textStyle='score-sm' fontWeight={700} color='blue.700'>
          750-760
        </Text>
      </Stack>
    </Flex>
    <Flex
      justifyContent={{ base: 'space-between', lg: 'flex-start' }}
      flexDirection={{ lg: 'column' }}
      gap={{ lg: 5 }}
      pb={{ base: 4, lg: 0 }}
      borderBottomWidth={{ base: 1, lg: 0 }}
      borderColor='grey.300'
      width={{ lg: '30%' }}
    >
      <Stack gap={1.5}>
        <Text textStyle='sm1' opacity={0.75}>
          Math Score
        </Text>
        <Text textStyle='score-2xl' color='blue.700'>
          755
        </Text>
      </Stack>
      <Stack gap={{ base: 1, lg: 2.5 }}>
        <Text textStyle='sm1' opacity={0.75}>
          Score Range
        </Text>
        <Text textStyle='score-sm' fontWeight={700} color='blue.700'>
          750-760
        </Text>
      </Stack>
    </Flex>
  </Stack>
);

export default TestScore;
