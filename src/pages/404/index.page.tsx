import { ReactElement } from 'react';

import { Center, Stack, Text } from '@chakra-ui/react';

import { useAppSelector } from 'store/hooks';

import { Roles } from 'constants/roles';
import { ROUTES } from 'constants/routes';

import { Link } from 'components';
import { Container, Footer, Header } from 'components/layout/components';

const Error = () => {
  const {
    user: { role },
    masqueradeUser: { role: masqueradeRole },
    isAuthorized
  } = useAppSelector((state) => state.persistAuth);

  if (isAuthorized) {
    const currentRole = masqueradeRole || role;
    const isAdmin = currentRole === Roles.Admin;

    const linkText = isAdmin ? 'Back to Users' : 'Back to Dashboard';
    const linkUrl = isAdmin ? ROUTES.users : ROUTES.dashboard;

    return (
      <>
        <Header />
        <Center as='main' flexDirection='column' gap={4}>
          <Text as='h1' textStyle='h1'>
            404
          </Text>
          <Text>Oops, the page you were looking for can not be found.</Text>
          <Link to={linkUrl} buttonProps={{ colorScheme: 'blue' }}>
            {linkText}
          </Link>
        </Center>
        {!isAdmin && <Footer />}
      </>
    );
  }

  return (
    <>
      <Stack
        as='main'
        flexGrow={1}
        gap={4}
        alignItems='center'
        justifyContent='center'
      >
        <Text as='h1' textStyle='h1'>
          404
        </Text>
        <Text>Oops, the page you were looking for can not be found.</Text>
        <Link to={ROUTES.login} buttonProps={{ colorScheme: 'blue' }}>
          Back to Login
        </Link>
      </Stack>
      <Footer />
    </>
  );
};

Error.getLayout = (page: ReactElement) => <Container>{page}</Container>;

export default Error;
