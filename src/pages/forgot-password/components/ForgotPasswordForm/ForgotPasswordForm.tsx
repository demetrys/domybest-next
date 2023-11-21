import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Box, Button, Text } from '@chakra-ui/react';

import { AUTH_VALIDATION } from 'constants/login';
import { UsernameType } from 'types/models';

import { TextField } from 'components';

type ForgotPasswordProps = {
  handleFormSubmit: (values: UsernameType) => void;
};

const forgotPasswordSchema = yup.object({
  username: yup.string().required(AUTH_VALIDATION.isEmpty)
});

const ForgotPasswordForm = ({ handleFormSubmit }: ForgotPasswordProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<UsernameType>({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      username: ''
    }
  });

  const onSubmit = (username: UsernameType) => {
    handleFormSubmit(username);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Text textStyle='big1' color='blue.700'>
        Forgot Password
      </Text>
      <Box mt='30px'>
        <Controller
          name='username'
          control={control}
          render={({ field: { ref, ...other } }) => (
            <TextField
              {...other}
              error={errors?.username?.message}
              placeholder='Username'
            />
          )}
        />
      </Box>
      <Button w='100%' mt='30px' type='submit'>
        Reset password
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
