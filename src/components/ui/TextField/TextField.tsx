import { ChangeEventHandler, ReactNode, useState } from 'react';
import { FiEye } from 'react-icons/fi';

import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  Text
} from '@chakra-ui/react';

type TextFieldProps = InputProps & {
  value: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  label?: string;
  error?: ReactNode;
  helperText?: string;
  type?: string;
};

const TextField = ({
  value,
  onChange,
  label,
  error,
  helperText,
  type = 'text',
  variant,
  width,
  ...inputProps
}: TextFieldProps) => {
  const [secure, setSecure] = useState(true);

  const fieldType = type === 'password' && !secure ? 'text' : type;

  const toggleSecure = () => setSecure(!secure);

  const inputGroupProp =
    variant === 'gridin'
      ? {
          border: '1px solid',
          borderColor: error ? 'red.500' : 'examGray.700',
          borderRadius: 10,
          p: '0 8px 8px',
          w: '100px'
        }
      : {};

  return (
    <FormControl isInvalid={Boolean(error)} width={width}>
      {label && (
        <FormLabel fontSize='sm' color='blue.700'>
          {label}
        </FormLabel>
      )}
      {error && variant !== 'gridin' && (
        <FormErrorMessage ml={5} mb={1} mt={0}>
          <Text textStyle='sm1'>{error}</Text>
        </FormErrorMessage>
      )}
      <InputGroup {...inputGroupProp}>
        <Input
          value={value}
          onChange={onChange}
          type={fieldType}
          variant={variant}
          {...inputProps}
        />
        {type === 'password' && (
          <InputRightElement>
            {value && (
              <IconButton
                aria-label='Show password'
                icon={<FiEye />}
                variant='ghost'
                onClick={toggleSecure}
                sx={{
                  color: 'blue.600',
                  _hover: {
                    bg: 'transparent',
                    color: 'blue.700'
                  }
                }}
              />
            )}
          </InputRightElement>
        )}
      </InputGroup>
      {error && variant === 'gridin' && (
        <FormErrorMessage mt={2}>
          <Text textStyle='exam-sm' fontWeight={700}>
            {error}
          </Text>
        </FormErrorMessage>
      )}
      {helperText && (
        <FormHelperText mt={1} ml={5}>
          <Text textStyle='sm1'>{helperText}</Text>
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default TextField;
