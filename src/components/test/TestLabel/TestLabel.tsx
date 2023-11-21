import { PropsWithChildren, ReactNode } from 'react';

import { Box, Center, Flex, Text } from '@chakra-ui/react';

type TestLabelProps = PropsWithChildren & {
  icon?: ReactNode;
  color?: string;
  bg?: string;
  noBox?: boolean;
};

const TestLabel = ({
  icon,
  color = 'blue.900',
  bg = 'whiteAlpha.300',
  noBox,
  children
}: TestLabelProps) => {
  const renderInner = () => (
    <>
      {icon && (
        <Box
          width={4}
          height={4}
          mr='7px'
          color={color}
          sx={{ '& > svg': { width: '100%', height: '100%' } }}
        >
          {icon}
        </Box>
      )}
      <Text color={color} textStyle='sm1' transform='translateY(1px)'>
        {children}
      </Text>
    </>
  );

  return noBox ? (
    <Flex alignItems='center'>{renderInner()}</Flex>
  ) : (
    <Center px={2.5} py={1.5} bg={bg} borderRadius={6}>
      {renderInner()}
    </Center>
  );
};

export default TestLabel;
