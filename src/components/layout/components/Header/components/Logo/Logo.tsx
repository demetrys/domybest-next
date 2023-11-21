import NextLink from 'next/link';

import { Box } from '@chakra-ui/react';

import { Roles } from 'constants/roles';
import { ROUTES } from 'constants/routes';

import AdminIcon from 'assets/icons/logo/admin.svg';
import GeneralIcon from 'assets/icons/logo/general.svg';
import ProctorIcon from 'assets/icons/logo/proctor.svg';
import LearnerIcon from 'assets/icons/logo/student.svg';

type LogoProps = {
  role: Roles | null;
};

const Logo = ({ role }: LogoProps) => {
  const renderIcon = () => {
    if (role === Roles.Learner) {
      return (
        <NextLink href={ROUTES.dashboard}>
          <LearnerIcon />
        </NextLink>
      );
    }

    if (role === Roles.Admin) {
      return (
        <NextLink href={ROUTES.users}>
          <AdminIcon />
        </NextLink>
      );
    }

    if (role === Roles.Proctor) {
      return (
        <NextLink href={ROUTES.dashboard}>
          <ProctorIcon />
        </NextLink>
      );
    }

    return <GeneralIcon />;
  };

  return (
    <Box w={{ base: '131px', md: '161px' }} h={{ base: '26px', md: '32px' }}>
      {renderIcon()}
    </Box>
  );
};

export default Logo;
