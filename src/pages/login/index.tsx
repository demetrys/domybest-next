import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Box, Button, Grid, GridItem, Text } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { userLogin } from 'store/actions/auth';
import { receiveLoginError } from 'store/reducers/persistAuth';

import { AUTH_VALIDATION } from 'constants/login';
import { ROUTES } from 'constants/routes';
import { NextPageWithLayout } from 'types/global';
import { LoginTypes } from 'types/models';

import LogoIcon from 'assets/icons/logo/general.svg';

import { Link, TextField } from 'components';

const loginSchema = yup.object({
  username: yup.string().required(AUTH_VALIDATION.isEmpty),
  password: yup.string().required(AUTH_VALIDATION.isEmpty)
});

const Login: NextPageWithLayout = () => {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.persistAuth);

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors }
  } = useForm<LoginTypes>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  });

  useEffect(() => {
    if (error.message) {
      setError('username', { message: error.message });
      setError('password', { message: error.message });
    }
  }, [error.message, setError]);

  const updateFormState = () => {
    reset({}, { keepValues: true });
    dispatch(receiveLoginError({ message: '', type: '' }));
  };

  const onSubmit = (values: LoginTypes) => {
    dispatch(userLogin(values));
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
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Text textStyle='big1' color='blue.700'>
            Login
          </Text>
          <Box mt='30px'>
            <Controller
              name='username'
              control={control}
              render={({ field: { ref, ...other } }) => (
                <TextField
                  {...other}
                  error={errors?.username?.message}
                  onKeyUp={updateFormState}
                  placeholder='Username'
                />
              )}
            />
          </Box>
          <Box mt={4}>
            <Controller
              name='password'
              control={control}
              render={({ field: { ref, ...other } }) => (
                <TextField
                  {...other}
                  error={errors?.password?.message}
                  onKeyUp={updateFormState}
                  type='password'
                  placeholder='Password'
                  autoComplete='on'
                />
              )}
            />
          </Box>
          <Grid gridTemplateColumns={{ md: '1fr 1fr' }} gap='10px' mt='30px'>
            <GridItem gridColumn={{ md: '1/3' }}>
              <Button w='100%' type='submit'>
                Log in
              </Button>
            </GridItem>
            <GridItem>
              <Link
                to={ROUTES.forgotPassword}
                buttonProps={{ colorScheme: 'light', width: '100%' }}
              >
                Forgot password?
              </Link>
            </GridItem>
            <GridItem>
              <Link
                to={ROUTES.forgotUsername}
                buttonProps={{ colorScheme: 'light', width: '100%' }}
              >
                Forgot username?
              </Link>
            </GridItem>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
