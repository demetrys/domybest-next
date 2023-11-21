import { Center, Flex, Text } from '@chakra-ui/react';

type ResultsOverviewProps = {
  total: number;
  correct: number;
  incorrect: number;
  omitted: number;
};

const QuestionsOverview = ({
  total,
  correct,
  incorrect,
  omitted
}: ResultsOverviewProps) => (
  <Flex
    py={{ base: '30px', md: 3 }}
    px={4}
    bg='yellow.300'
    borderRadius={10}
    wrap='wrap'
    gap='24px 0'
  >
    <Center flexDir='column' width={{ base: '50%', md: '25%' }}>
      <Text textStyle='h1' color='blue.700' mb='2px'>
        {total}
      </Text>
      <Text textStyle='sm1'>total questions</Text>
    </Center>
    <Center flexDir='column' width={{ base: '50%', md: '25%' }}>
      <Text textStyle='h1' color='blue.700' mb='2px'>
        {correct}
      </Text>
      <Text textStyle='sm1'>correct answers</Text>
    </Center>
    <Center flexDir='column' width={{ base: '50%', md: '25%' }}>
      <Text textStyle='h1' color='blue.700' mb='2px'>
        {incorrect}
      </Text>
      <Text textStyle='sm1'>incorrect answers</Text>
    </Center>
    <Center flexDir='column' width={{ base: '50%', md: '25%' }}>
      <Text textStyle='h1' color='blue.700' mb='2px'>
        {omitted}
      </Text>
      <Text textStyle='sm1'>omitted questions</Text>
    </Center>
  </Flex>
);

export default QuestionsOverview;
