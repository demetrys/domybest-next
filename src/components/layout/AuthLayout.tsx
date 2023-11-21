import { ReactNode } from 'react';

import { VStack } from '@chakra-ui/react';

import { Container, Footer } from './components';

type LayoutProps = {
  children: ReactNode;
};

const AuthLayout = ({ children }: LayoutProps) => (
  <Container>
    <VStack
      flexGrow={1}
      py={10}
      justifyContent={{ base: 'flex-start', md: 'center' }}
    >
      {children}
    </VStack>
    <Footer />
  </Container>
);

export default AuthLayout;
