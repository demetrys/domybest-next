import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FiDownload } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Stack,
  Text
} from '@chakra-ui/react';

import { useAppSelector } from 'store/hooks';

import { Link, TextField } from 'components/ui';

const schema = yup.object({
  email: yup
    .string()
    .required('The email is required')
    .email('Email is not valid.')
});

type FormFields = {
  email: string;
};

const ScoreReportForm = () => {
  const { reportLiveId } = useAppSelector((state) => state.modal);
  const [emails, setEmails] = useState<string[]>([]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setError
  } = useForm<FormFields>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: ''
    }
  });

  const onEmailSubmit = ({ email }: FormFields) => {
    if (emails.includes(email)) {
      setError('email', { message: 'The email was already added.' });
    } else {
      setEmails((prevState) => [...prevState, email]);
      reset({ email: '' }, { keepErrors: false, keepDirty: false });
    }
  };

  const handleRemoveEmail = (email: string) => () => {
    setEmails((prevState) => prevState.filter((em) => em !== email));
  };

  const handleFormSubmit = () => {
    console.log(emails);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onEmailSubmit)} noValidate>
        <Stack gap={{ base: '30px', md: 5 }} mb={{ base: 5, md: '30px' }}>
          <Text textStyle='reg'>
            To send this score report, please enter the recipient&apos;s email
            address below. Multiple email addresses should be separated by a
            comma.
          </Text>
          <Grid
            gap={{ base: '14px', md: '20px 10px' }}
            gridTemplateColumns={{ sm: '1fr auto' }}
            gridTemplateRows={{ base: 'auto auto auto', sm: 'auto auto' }}
          >
            <GridItem gridColumn={{ sm: '1/2' }}>
              <Controller
                name='email'
                control={control}
                render={({ field: { ref, ...other } }) => (
                  <TextField
                    {...other}
                    type='email'
                    placeholder='Email'
                    error={errors.email?.message}
                  />
                )}
              />
            </GridItem>
            {Boolean(emails.length) && (
              <GridItem gridRow={{ sm: '2' }} gridColumn={{ sm: '1/3' }}>
                <Stack gap={{ base: '10px', md: '14px' }}>
                  {emails.map((email) => (
                    <Flex
                      key={email}
                      justifyContent='space-between'
                      alignItems='center'
                    >
                      <Text
                        pl={{ sm: 5 }}
                        maxWidth={{
                          base: 'calc(100% - 30px)',
                          sm: 'calc(100% - 100px)'
                        }}
                        wordBreak='break-word'
                      >
                        {email}
                      </Text>
                      <Center
                        width={{ md: 100 }}
                        color='blue.700'
                        sx={{ '& > button': { width: 5, height: 5 } }}
                      >
                        <IconButton
                          aria-label='delete email'
                          minH={5}
                          minW={5}
                          bg='transparent'
                          color='blue.700'
                          onClick={handleRemoveEmail(email)}
                        >
                          <MdClose size='100%' />
                        </IconButton>
                      </Center>
                    </Flex>
                  ))}
                </Stack>
              </GridItem>
            )}
            <GridItem
              gridColumn={{ sm: '2' }}
              display='flex'
              flexDir='column'
              justifyContent='flex-end'
            >
              <Button colorScheme='light' type='submit'>
                Add
              </Button>
            </GridItem>
          </Grid>
        </Stack>
      </form>
      <Flex
        justifyContent='space-between'
        gap={2.5}
        width='100%'
        pt='30px'
        borderTop='1px solid'
        borderColor='grey.300'
        flexDir={{ base: 'column', sm: 'row' }}
      >
        <Link
          to={`${process.env.NEXT_PUBLIC_EXAM_API_URL}/tests/${reportLiveId}/pdf_report/`}
          external
          buttonProps={{ colorScheme: 'light', leftIcon: <FiDownload /> }}
        >
          Download PDF
        </Link>
        <Button onClick={handleFormSubmit} isDisabled={!emails.length}>
          Share scores
        </Button>
      </Flex>
    </>
  );
};

export default ScoreReportForm;
