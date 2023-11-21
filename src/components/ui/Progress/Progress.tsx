import {
  Flex,
  Progress as ChakraProgress,
  Stack,
  Text
} from '@chakra-ui/react';

type ProgressProps = {
  value: number;
  variant?: 'default' | 'alternative';
};

const Progress = ({ value, variant = 'default' }: ProgressProps) =>
  variant === 'default' ? (
    <Stack gap='6px'>
      <Text textStyle='sm1' color='blue.500'>
        {value}%
      </Text>
      <ChakraProgress value={value} height='2px' borderRadius={1} />
    </Stack>
  ) : (
    <Flex
      px={2.5}
      py={2}
      borderRadius={6}
      bg='whiteAlpha.100'
      gap={2.5}
      width={300}
      alignItems='center'
    >
      <ChakraProgress
        width={244}
        value={value}
        height='2px'
        borderRadius={1}
        sx={{ bg: 'blue.700', '& > div': { bg: 'yellow.300' } }}
      />
      <Text textStyle='sm1' color='white' lineHeight='11px'>
        {value}%
      </Text>
    </Flex>
  );

export default Progress;
