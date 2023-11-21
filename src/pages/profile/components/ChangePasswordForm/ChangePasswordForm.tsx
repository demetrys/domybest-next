import { memo, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Box, Button, Stack } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { changePassword } from 'store/actions/auth';
import { receiveLoginError } from 'store/reducers/persistAuth';

import { AUTH_VALIDATION } from 'constants/login';

import { passwordValidator } from 'validators';

import { TextField } from 'components';

const schema = yup.object({
  current_password: yup.string().required('The password is required'),
  new_password: passwordValidator,
  confirmation: yup
    .string()
    .required('The password is required')
    .oneOf([yup.ref('new_password')], AUTH_VALIDATION.notEqual)
});

type FormProps = {
  handleFormSubmit: () => void;
};

type ChangePasswordProps = {
  current_password: string;
  new_password: string;
  confirmation: string;
};

const ChangePasswordForm = memo(({ handleFormSubmit }: FormProps) => {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.persistAuth);
  const {
    control,
    setError,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<ChangePasswordProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      current_password: '',
      new_password: '',
      confirmation: ''
    },
    mode: 'onChange'
  });

  useEffect(() => {
    if (error.message) {
      if (error.type === 'current_password') {
        setError('current_password', { message: error.message });
        dispatch(receiveLoginError({ message: '', type: '' }));
      } else {
        setError('new_password', { message: error.message });
        setError('confirmation', { message: error.message });
        dispatch(receiveLoginError({ message: '', type: '' }));
      }
    }
  }, [dispatch, error, setError]);

  const onSubmit = async (passwords: ChangePasswordProps) => {
    try {
      await dispatch(changePassword(passwords));
      handleFormSubmit();
      reset();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Box>
        <Controller
          name='current_password'
          control={control}
          render={({ field: { ref, ...other } }) => (
            <TextField
              {...other}
              error={errors?.current_password?.message}
              type='password'
              autoComplete='off'
              placeholder='Enter your current password'
            />
          )}
        />
      </Box>
      <Stack mt={4} gap={4} direction={{ base: 'column', md: 'row' }}>
        <Box flex='1 0 48%' display='flex' mt='auto'>
          <Controller
            name='new_password'
            control={control}
            render={({ field: { ref, ...other } }) => (
              <TextField
                {...other}
                error={
                  errors?.new_password?.message || errors?.confirmation?.message
                }
                type='password'
                autoComplete='off'
                placeholder='Enter your new password'
              />
            )}
          />
        </Box>
        <Box flex='1 0 48%' display='flex' mt='auto'>
          <Controller
            name='confirmation'
            control={control}
            render={({ field: { ref, ...other } }) => (
              <TextField
                {...other}
                error={errors?.confirmation?.message}
                type='password'
                autoComplete='off'
                placeholder='Confirm your new password'
              />
            )}
          />
        </Box>
      </Stack>
      <Button
        isDisabled={!isValid}
        type='submit'
        mt='30px'
        w={{ base: '100%', sm: 'auto' }}
      >
        Change password
      </Button>
    </form>
  );
});

ChangePasswordForm.displayName = 'ChangePasswordForm';

export default ChangePasswordForm;
