import { ReactElement, useState } from 'react';

import { Box, Text } from '@chakra-ui/react';

import authApi from 'store/api/auth';

import { ROUTES } from 'constants/routes';
import { NextPageWithLayout } from 'types/global';
import { UsernameType } from 'types/models';

import LogoIcon from 'assets/icons/logo/general.svg';

import { AuthLayout, Link } from 'components';
import { ForgotPasswordForm } from './components';

const ForgotPassword: NextPageWithLayout = () => {
  const [showForm, setShowForm] = useState(true);

  const onForgotPassword = async (username: UsernameType) => {
    await authApi.resetPassword(username).then(() => {
      setShowForm(false);
    });
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
        {showForm ? (
          <ForgotPasswordForm handleFormSubmit={onForgotPassword} />
        ) : (
          <>
            {/* Thank You step */}
            <Text textStyle='big1' color='blue.700'>
              Thank you!
            </Text>
            <Text mt={5}>
              If the user exists, you will receive an E-mail in the next 5
              minutes with instructions for resetting your password.
            </Text>
            <Text mt='30px'>
              If you don’t receive this E-mail, please check your junk mail
              folder or address{' '}
              <Link
                to='mailto:info@satprep.com'
                sx={{ textDecoration: 'underline' }}
              >
                info@satprep.com
              </Link>{' '}
              for further assistance.
            </Text>
            <Link to={ROUTES.login} buttonProps={{ w: '100%', mt: '30px' }}>
              Back to login
            </Link>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ForgotPassword;

ForgotPassword.getLayout = (page: ReactElement) => (
  <AuthLayout>{page}</AuthLayout>
);
