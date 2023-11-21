import { Center, Text } from '@chakra-ui/react';

import { Link } from 'components/ui';

type TestsFallbackProps = {
  variant: 'on-demand' | 'in-person' | 'completed';
};

const TestsFallback = ({ variant }: TestsFallbackProps) =>
  variant === 'completed' ? (
    <Center borderRadius={10} bg='whiteAlpha.200' height={364}>
      <Text textStyle='big3' color='white' fontWeight={400}>
        You do not currently have any completed tests.
      </Text>
    </Center>
  ) : (
    <Center borderRadius={10} bg='white' flexDir='column' height={247}>
      <Text
        textStyle='big3'
        color='blue.700'
        fontWeight={400}
        mb={9}
      >{`Schedule an ${
        variant === 'on-demand' ? 'On-Demand' : 'In-Person'
      } test now!`}</Text>
      <Link
        to='https://www.satprep.com/practice-tests/'
        external
        buttonProps={{ colorScheme: 'blue' }}
      >
        Start
      </Link>
    </Center>
  );

export default TestsFallback;
