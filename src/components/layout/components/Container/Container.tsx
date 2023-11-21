import { PropsWithChildren } from 'react';

import { Container as ChakraContainer } from '@chakra-ui/react';

const Container = ({ children }: PropsWithChildren) => (
  <ChakraContainer
    maxW='container.xl'
    minH='100vh'
    display='flex'
    flexDir='column'
  >
    {children}
  </ChakraContainer>
);

export default Container;
