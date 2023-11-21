import { PropsWithChildren } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { Link as ChakraLink } from '@chakra-ui/next-js';
import { Button, ButtonProps, SystemStyleObject } from '@chakra-ui/react';

type LinkProps = PropsWithChildren & {
  to: string;
  color?: string;
  variant?: string;
  sx?: SystemStyleObject;
  external?: boolean;
  buttonProps?: ButtonProps;
};

const Link = ({
  to,
  color,
  variant,
  buttonProps,
  external = false,
  sx = {},
  children
}: LinkProps) => {
  const router = useRouter();
  const isActive = router.pathname.includes(to);

  return buttonProps ? (
    <Button
      as={NextLink}
      {...buttonProps}
      href={to}
      {...(external ? { target: '_blank' } : {})}
    >
      {children}
    </Button>
  ) : (
    <ChakraLink
      display='inline-flex'
      alignItems='center'
      className={isActive ? 'active-link' : ''}
      variant={variant}
      gap={2}
      href={to}
      {...(color ? { color } : {})}
      {...(external ? { target: '_blank' } : {})}
      sx={{
        lineHeight: '20px',
        '& > svg': {
          width: 4,
          height: 4
        },
        ...sx
      }}
    >
      {children}
    </ChakraLink>
  );
};

export default Link;
