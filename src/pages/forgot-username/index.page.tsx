import { ReactElement, useState } from 'react';

import { Box, Text } from '@chakra-ui/react';

import { ROUTES } from 'constants/routes';
import { NextPageWithLayout } from 'types/global';

import LogoIcon from 'assets/icons/logo/general.svg';

import { AuthLayout, Link } from 'components';
import { ForgotUsernameForm } from './components';

const ForgotUsername: NextPageWithLayout = () => {
  const [isSuccessStep, setSuccessStep] = useState<boolean>(false);

  const handleSuccessStep = () => {
    setSuccessStep(true);
  };

  return (
    <Box
      borderRadius={40}
      bg='white'
      p={{ base: '60px 16px ', md: '40px 50px' }}
      w='100%'
      maxW='lg'
    >
      <Box w='141px' h='28px'>
        <LogoIcon />
      </Box>

      <Box mt={7}>
        {isSuccessStep ? (
          <>
            <Text textStyle='big1' color='blue.700'>
              Thank you!
            </Text>
            <Text mt={5}>
              You will receive an email in the next five minutes that includes
              your username.
            </Text>
            <Text mt='30px'>
              If you don’t receive this E-mail, please check your junk mail
              folder or contact us at{' '}
              <Link
                to='mailto:info@satprep.com'
                sx={{ textDecoration: 'underline' }}
              >
                info@satprep.com
              </Link>
            </Text>
            <Link to={ROUTES.login} buttonProps={{ w: '100%', mt: '30px' }}>
              Back to login
            </Link>
          </>
        ) : (
          <ForgotUsernameForm onSuccess={handleSuccessStep} />
        )}
      </Box>
    </Box>
  );
};

export default ForgotUsername;

ForgotUsername.getLayout = (page: ReactElement) => (
  <AuthLayout>{page}</AuthLayout>
);
