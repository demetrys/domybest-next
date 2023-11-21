import { ReactNode } from 'react';

import {
  Box,
  FormLabel,
  Text,
  Textarea as ChakraTextarea,
  TextareaProps as ChakraTextareaProps
} from '@chakra-ui/react';

type TextareaProps = ChakraTextareaProps & {
  label?: string;
  error?: ReactNode;
};

const Textarea = ({ label, error, id, isInvalid, ...props }: TextareaProps) => (
  <Box width='100%'>
    {label && (
      <FormLabel fontSize='sm' color='blue.700' htmlFor={id || 'text-area'}>
        {label}
      </FormLabel>
    )}
    {error && (
      <Text color='red.500' ml={5} mb={1} mt={0} textStyle='sm1'>
        {error}
      </Text>
    )}
    <ChakraTextarea
      {...props}
      id={id || 'text-area'}
      isInvalid={Boolean(error) || isInvalid}
    />
  </Box>
);

export default Textarea;
