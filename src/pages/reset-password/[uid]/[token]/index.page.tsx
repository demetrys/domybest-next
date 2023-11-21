import { ReactElement, useState } from 'react';

import { Box, Text } from '@chakra-ui/react';

import { ROUTES } from 'constants/routes';
import { NextPageWithLayout } from 'types/global';

import LogoIcon from 'assets/icons/logo/general.svg';

import { AuthLayout, Link } from 'components';
import { ResetPasswordForm } from './components';

const ResetPassword: NextPageWithLayout = () => {
  const [showForm, setShowForm] = useState(true);

  const onConfirmPassword = () => {
    setShowForm(false);
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
          <ResetPasswordForm handleFormSubmit={onConfirmPassword} />
        ) : (
          <>
            {/* Success step */}
            <Text textStyle='big1' color='blue.700'>
              Success!
            </Text>
            <Text mt={5}>Your new password was successfully created.</Text>
            <Link to={ROUTES.login} buttonProps={{ w: '100%', mt: '30px' }}>
              Back to login
            </Link>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ResetPassword;

ResetPassword.getLayout = (page: ReactElement) => (
  <AuthLayout>{page}</AuthLayout>
);
