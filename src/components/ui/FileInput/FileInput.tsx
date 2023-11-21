import { ChangeEvent } from 'react';

import {
  Box,
  Button,
  CloseButton,
  Flex,
  FormLabel,
  Input,
  Stack,
  Text
} from '@chakra-ui/react';

type FileInputProps = {
  value?: File | null;
  label?: string;
  placeholder?: string;
  error?: string;
  onChange: (value: File | null) => void;
};

const FileInput = ({
  value,
  label,
  placeholder,
  error,
  onChange
}: FileInputProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.files?.[0] || null);
  };

  const handleReset = () => {
    onChange(null);
  };

  return (
    <Flex
      gap='15px'
      alignItems={{ sm: 'flex-end' }}
      width='100%'
      flexDirection={{ base: 'column', sm: 'row' }}
    >
      <Stack gap='5px' maxWidth={415} flexGrow={1}>
        {label && (
          <Text color='blue.700' fontWeight={500}>
            {label}
          </Text>
        )}
        {error && (
          <Text color='red.500' ml={5} mb={1} mt={0} textStyle='sm1'>
            {error}
          </Text>
        )}
        <Flex
          justifyContent='space-between'
          alignItems='center'
          height={10}
          bg='blue.50'
          px={5}
          borderRadius={10}
        >
          {value?.name ? (
            <>
              <Box maxWidth={340} py={2.5} overflowX='auto'>
                <Text
                  color={error ? 'red.500' : 'blue.700'}
                  fontWeight={500}
                  lineHeight='20px'
                  sx={{ wordWrap: 'initial' }}
                >
                  {value.name}
                </Text>
              </Box>
              <CloseButton
                color={error ? 'red.500' : 'blue.700'}
                size='sm'
                width={5}
                height={5}
                borderRadius='50%'
                onClick={handleReset}
              />
            </>
          ) : (
            <Box maxWidth={340} py={2.5} overflowX='auto'>
              <Text
                color={error ? 'red.500' : 'blue.600'}
                lineHeight='20px'
                sx={{ wordWrap: 'initial' }}
              >
                {placeholder || 'Upload the file'}
              </Text>
            </Box>
          )}
        </Flex>
      </Stack>
      <FormLabel m={0}>
        <Input
          value=''
          onChange={handleChange}
          type='file'
          accept='.zip'
          hidden
        />
        <Button as='span' colorScheme='light' cursor='pointer'>
          Upload
        </Button>
      </FormLabel>
    </Flex>
  );
};

export default FileInput;
