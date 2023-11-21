import React from 'react';
import { useRouter } from 'next/router';

import { Box, Flex, MenuItem } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { logout, unmasquerade } from 'store/reducers/persistAuth';

import { getUsername } from 'utils/user';

import { Roles } from 'constants/roles';
import { ROUTES } from 'constants/routes';

import { FullWidthBg } from 'components/shared';
import { Link } from 'components/ui';
import { AdminNavigation, Logo, UserMenu } from './components';

const Header = () => {
  const dispatch = useAppDispatch();
  const { self } = useAppSelector((state) => state.self);
  const { role } = useAppSelector((state) => state.persistAuth.user);
  const { role: masqueradeRole } = useAppSelector(
    (state) => state.persistAuth.masqueradeUser
  );
  const router = useRouter();

  const currentRole = masqueradeRole || role;

  const isAdmin = currentRole === Roles.Admin;
  const username = getUsername(self);

  const finishSession = () => {
    dispatch(logout());
  };

  const finishMasquerade = async () => {
    dispatch(unmasquerade());
    await router.push(ROUTES.users);
  };

  return (
    <Flex position='relative' as='header' alignItems='center' py={3} bg='white'>
      <FullWidthBg bg='white' />
      <Logo role={currentRole} />
      {isAdmin && <AdminNavigation />}
      {Boolean(self.username) && (
        <Box marginLeft='auto'>
          <UserMenu username={username}>
            {isAdmin && (
              <>
                <Link to={ROUTES.enrollments}>Enrollments</Link>
                <Link to={ROUTES.tests}>Tests</Link>
                <Link to={ROUTES.testStructures}>Test Structures</Link>
                <Link to={ROUTES.users}>Users</Link>
              </>
            )}
            <Link to={ROUTES.profile}>My profile</Link>
            {masqueradeRole ? (
              <MenuItem onClick={finishMasquerade}>Unmasquerade</MenuItem>
            ) : (
              <MenuItem onClick={finishSession}>Log out</MenuItem>
            )}
          </UserMenu>
        </Box>
      )}
    </Flex>
  );
};

export default Header;
