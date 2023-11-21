import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Button, Stack, Text } from '@chakra-ui/react';

import { useAppDispatch } from 'store/hooks';
import { forgotUsername } from 'store/actions/auth';

import { BaseError } from 'types/global';
import { ForgotUsername } from 'types/models';

import { Link, TextField } from 'components';

const schema = yup.object({
  email: yup
    .string()
    .required('The email is required')
    .email('Email is not valid.')
});

type ForgotUsernameFormProps = {
  onSuccess: () => void;
};

const ForgotUsernameForm = ({ onSuccess }: ForgotUsernameFormProps) => {
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<ForgotUsername>({
    defaultValues: {
      email: ''
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: ForgotUsername) => {
    try {
      await dispatch(forgotUsername(data));
      onSuccess();
    } catch (error) {
      const e = error as BaseError;

      setError('email', {
        message: e.message
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing='30px'>
        <Text textStyle='big1' color='blue.700'>
          Forgot Username
        </Text>
        <Controller
          control={control}
          name='email'
          render={({ field: { ref, ...other } }) => (
            <TextField
              {...other}
              type='email'
              error={
                errors?.email?.message === 'THROTTLE' ? (
                  <Text>
                    Contact us at{' '}
                    <Link
                      to='mailto:info@satprep.com'
                      sx={{ color: 'error.200', textDecoration: 'underline' }}
                    >
                      info@satprep.com
                    </Link>{' '}
                    if you need assistance retrieving your username.
                  </Text>
                ) : (
                  errors?.email?.message
                )
              }
              placeholder='Email'
            />
          )}
        />
        <Button type='submit' width='100%'>
          Confirm
        </Button>
      </Stack>
    </form>
  );
};

export default ForgotUsernameForm;
