import ReactSelect, { Props as ReactSelectProps } from 'react-select';

import { Box, SystemStyleObject, Text } from '@chakra-ui/react';

type SelectProps = ReactSelectProps & {
  label?: string;
  boxStyles?: SystemStyleObject;
  colorScheme?: string;
  error?: string;
};

const Select = ({
  label,
  error,
  boxStyles,
  colorScheme,
  ...props
}: SelectProps) => (
  <Box width='100%' sx={boxStyles}>
    {label && (
      <Text mb={2} color='blue.700' fontWeight={500}>
        {label}
      </Text>
    )}
    {error && (
      <Text color='red.500' ml={5} mb={1} mt={0} textStyle='sm1'>
        {error}
      </Text>
    )}
    <ReactSelect
      id='select'
      instanceId='instance'
      isSearchable={false}
      styles={{
        container: (base) => ({
          ...base,
          width: '100%'
        }),
        valueContainer: (base) => ({
          ...base,
          padding: '0 10px 0 0'
        }),
        control: (base, state) => ({
          ...base,
          minHeight: 'initial',
          padding: '10px 16px',
          borderWidth: colorScheme === 'lightBlue' ? 1 : 0,
          ...(error
            ? { borderColor: '#E31B23' }
            : {
                borderColor:
                  colorScheme === 'lightBlue' ? '#AFC1D9' : 'transparent'
              }),
          cursor: 'pointer',
          borderRadius: state.menuIsOpen
            ? '20px 20px 0 0'
            : '20px 20px 20px 20px',
          boxShadow: 'none',
          '& .indicators-container': {
            transform: state.menuIsOpen ? 'rotate(180deg)' : 'rotate(0)'
          },
          '&:hover': {
            ...(error
              ? { borderColor: '#E31B23' }
              : {
                  borderColor:
                    colorScheme === 'lightBlue'
                      ? 'rgba(26, 62, 109, 0.5)'
                      : 'transparent'
                })
          }
        }),
        indicatorsContainer: (base) => ({
          ...base,
          transition: '0.2s linear transform',
          '& > div': {
            padding: 0,
            '& > svg': {
              ...(error
                ? { fill: '#E31B23' }
                : {
                    fill:
                      colorScheme === 'lightBlue'
                        ? 'rgba(26, 62, 109, 0.5)'
                        : '#262B32'
                  }),
              width: 14,
              height: 14
            }
          }
        }),
        indicatorSeparator: () => ({
          display: 'none'
        }),
        placeholder: (base) => ({
          ...base,
          marginTop: 2,
          marginLeft: 0,
          marginRight: 0,
          ...(error
            ? { color: 'rgba(227, 27, 35, 0.5)' }
            : {
                color:
                  colorScheme === 'lightBlue'
                    ? 'rgba(26, 62, 109, 0.5)'
                    : '#262B32'
              })
        }),
        singleValue: (base) => ({
          ...base,
          marginTop: 2,
          marginLeft: 0,
          marginRight: 0,
          color: error ? '#E31B23' : '#262B32'
        }),
        menu: (base) => ({
          ...base,
          margin: 0,
          boxShadow: '0 1px 1px #EEF4F9',
          borderRadius: '0 0 20px 20px',
          borderColor: colorScheme === 'lightBlue' ? '#AFC1D9' : 'transparent',
          borderWidth: colorScheme === 'lightBlue' ? '0 1px 1px 1px' : 0,
          overflow: 'hidden'
        }),
        menuList: (base) => ({
          ...base,
          padding: 0
        }),
        option: (base) => ({
          ...base,
          cursor: 'pointer'
        })
      }}
      classNames={{
        indicatorsContainer: () => 'indicators-container'
      }}
      {...props}
    />
  </Box>
);

export default Select;
