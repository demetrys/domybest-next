import { Box, ListItem, UnorderedList } from '@chakra-ui/react';

import { ROUTES } from 'constants/routes';

import { Link } from 'components/ui';

const AdminNavigation = () => (
  <Box
    as='nav'
    display={{ base: 'none', md: 'block' }}
    ml={{ md: 5, lg: 10, xl: '60px' }}
  >
    <UnorderedList
      display='flex'
      listStyleType='none'
      gap={{ md: 5, lg: 7, xl: 10 }}
    >
      <ListItem>
        <Link variant='main-nav' to={ROUTES.enrollments}>
          Enrollments
        </Link>
      </ListItem>
      <ListItem>
        <Link variant='main-nav' to={ROUTES.tests}>
          Tests
        </Link>
      </ListItem>
      <ListItem>
        <Link variant='main-nav' to={ROUTES.testStructures}>
          Test Structures
        </Link>
      </ListItem>
      <ListItem>
        <Link variant='main-nav' to={ROUTES.users}>
          Users
        </Link>
      </ListItem>
    </UnorderedList>
  </Box>
);

export default AdminNavigation;
