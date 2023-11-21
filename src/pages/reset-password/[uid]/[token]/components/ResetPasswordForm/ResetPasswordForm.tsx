import { Children, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { RiCheckLine } from 'react-icons/ri';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import * as yup from 'yup';

import {
  Box,
  Button,
  List,
  ListIcon,
  ListItem,
  Text,
  useDisclosure
} from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { confirmPassword } from 'store/actions/auth';
import { receiveLoginError } from 'store/reducers/persistAuth';

import { AUTH_VALIDATION, PASSWORD_UPDATE } from 'constants/login';
import { ROUTES } from 'constants/routes';
import { ResetPasswordTypes } from 'types/models';

import { passwordValidator } from 'validators';

import { Dialog, Link, TextField } from 'components';

type ResetPasswordProps = {
  handleFormSubmit: () => void;
};

const resetPasswordSchema = yup.object({
  new_password: passwordValidator,
  confirmation: yup
    .string()
    .required(AUTH_VALIDATION.isEmpty)
    .oneOf([yup.ref('new_password')], AUTH_VALIDATION.notEqual)
});

const ResetPasswordForm = ({ handleFormSubmit }: ResetPasswordProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isReady, query } = useRouter();
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.persistAuth);
  const {
    control,
    setError,
    reset,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<ResetPasswordTypes>({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: {
      new_password: '',
      confirmation: ''
    },
    mode: 'onChange'
  });
  const [state, setState] = useState({ uid: '', token: '' });

  useEffect(() => {
    if (isReady) {
      const uid = query.uid?.toString() || '';
      const token = query.token?.toString() || '';
      setState({ uid, token });
    }
  }, [isReady, query.uid, query.token]);

  useEffect(() => {
    if (error.message) {
      setError('new_password', { message: error.message });
      dispatch(receiveLoginError({ message: '', type: '' }));
    }
  }, [error, setError, dispatch]);

  const onSubmit = async ({ new_password }: ResetPasswordTypes) => {
    try {
      await dispatch(
        confirmPassword({ uid: state.uid, token: state.token, new_password })
      );
      reset();
      handleFormSubmit();
    } catch (e) {
      if ((e as { message: string }).message === 'expired') {
        onOpen();
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Text textStyle='big1' color='blue.700'>
          Create new password
        </Text>
        <Box mt='30px'>
          <Controller
            name='new_password'
            control={control}
            render={({ field: { ref, ...other } }) => (
              <TextField
                {...other}
                error={errors?.new_password?.message}
                type='password'
                autoComplete='off'
                placeholder='Enter new password'
              />
            )}
          />
        </Box>
        <Box mt={4}>
          <Controller
            name='confirmation'
            control={control}
            render={({ field: { ref, ...other } }) => (
              <TextField
                {...other}
                error={errors?.confirmation?.message}
                type='password'
                autoComplete='off'
                placeholder='Confirm new password'
              />
            )}
          />
        </Box>
        <Box
          bg='blue.50'
          borderRadius={10}
          p={{ base: '24px 20px', lg: 5 }}
          mt={5}
        >
          <Text fontSize='md' fontWeight={500}>
            {PASSWORD_UPDATE.change.tips.title}
          </Text>
          <List spacing={3} mt={4}>
            {Children.toArray(
              PASSWORD_UPDATE.change.tips.list.map((item) => (
                <ListItem key={item} display='inline-flex'>
                  <ListIcon as={RiCheckLine} color='blue.700' />
                  {item}
                </ListItem>
              ))
            )}
          </List>
        </Box>
        <Button w='100%' mt='30px' type='submit' isDisabled={!isValid}>
          Create new password
        </Button>
      </form>

      <Dialog isOpen={isOpen} title='Error!' onClose={onClose}>
        <Text textStyle='big2' color='blue.700' mt={2}>
          {PASSWORD_UPDATE.create.error.token.title}
        </Text>
        <Text textStyle='reg' mt={2}>
          {PASSWORD_UPDATE.create.error.token.message}
        </Text>
        <Link to={ROUTES.forgotPassword} buttonProps={{ mt: 7 }}>
          Create new link
        </Link>
      </Dialog>
    </>
  );
};

export default ResetPasswordForm;
