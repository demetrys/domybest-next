import { Children } from 'react';
import { RiCheckLine } from 'react-icons/ri';

import {
  Box,
  Flex,
  Grid,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
  useDisclosure
} from '@chakra-ui/react';

import { useAppSelector } from 'store/hooks';

import { PASSWORD_UPDATE } from 'constants/login';
import { Roles } from 'constants/roles';
import { ROUTES } from 'constants/routes';

import LogoIcon from 'assets/icons/logo/general.svg';
import bannerSrc from 'assets/images/banners/profile_banner.jpg';

import { Breadcrumbs, Dialog, HeroBanner, Link } from 'components';
import { ChangePasswordForm } from './components';

const Profile = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { self } = useAppSelector((state) => state.self);

  const isStudent = self.role === Roles.Learner;

  const onFormSubmit = () => {
    onOpen();
  };

  return (
    <>
      {isStudent && (
        <Breadcrumbs
          nav={[
            { title: 'Dashboard', path: ROUTES.dashboard },
            { title: 'My Profile', path: ROUTES.profile }
          ]}
        />
      )}

      <Box
        mb={{ base: '70px', md: '60px' }}
        mt={{ base: isStudent ? 0 : 5, md: isStudent ? 0 : '30px' }}
      >
        <HeroBanner
          title='My Profile'
          imageSrc={bannerSrc}
          imageAlt='My Profile'
        />
      </Box>

      <Box mb={{ base: 14, md: 100 }}>
        <Flex
          flexDirection={{ base: 'column', lg: 'row' }}
          justifyContent={{ lg: 'space-between' }}
          mt={{ base: 16, lg: 14 }}
        >
          <Text textStyle='h2' as='h2' color='blue.700' mr={2} mb={7}>
            Profile Details
          </Text>
          <Box
            bg='white'
            px={{ base: 4, lg: 6 }}
            py={{ base: 5, lg: 9 }}
            borderRadius={10}
            w={{ lg: '75%' }}
          >
            <Grid templateColumns={{ md: '1fr 1fr' }} gap={4}>
              <Stack>
                <Text color='blue.700' fontWeight={500}>
                  First name
                </Text>
                <Box bg='blue.50' borderRadius={20} p='10px 20px' h={10}>
                  {self.first_name}
                </Box>
              </Stack>
              <Stack>
                <Text color='blue.700' fontWeight={500}>
                  Last name
                </Text>
                <Box bg='blue.50' borderRadius={20} p='10px 20px' h={10}>
                  {self.last_name}
                </Box>
              </Stack>
              <Stack>
                <Text color='blue.700' fontWeight={500}>
                  Email
                </Text>
                <Box bg='blue.50' borderRadius={20} p='10px 20px' h={10}>
                  {self.email}
                </Box>
              </Stack>
              <Stack>
                <Text color='blue.700' fontWeight={500}>
                  Username
                </Text>
                <Box bg='blue.50' borderRadius={20} p='10px 20px' h={10}>
                  {self.username}
                </Box>
              </Stack>
            </Grid>
            <Text fontSize='xs' mt={6}>
              To edit your profile details please contact{' '}
              <Link
                to='mailto:info@satprep.com'
                sx={{ textDecoration: 'underline' }}
              >
                info@satprep.com
              </Link>{' '}
              or call{' '}
              <Link
                to='tel:1-203-352-3500'
                sx={{ textDecoration: 'underline' }}
              >
                (203) 352-3500
              </Link>
            </Text>
          </Box>
        </Flex>

        <Flex
          flexDirection={{ base: 'column', lg: 'row' }}
          justifyContent={{ lg: 'space-between' }}
          mt={{ base: 16, lg: 14 }}
        >
          <Text textStyle='h2' as='h2' color='blue.700' mr={2} mb={7}>
            Change Password
          </Text>
          <Box
            bg='white'
            borderRadius={10}
            px={{ base: 4, lg: 6 }}
            py={{ base: 5, lg: 9 }}
            w={{ lg: '75%' }}
          >
            <ChangePasswordForm handleFormSubmit={onFormSubmit} />

            <Box
              bg='blue.50'
              borderRadius={10}
              p={{ base: 4, lg: '24px 16px' }}
              mt='30px'
            >
              <Text fontSize='md' fontWeight={500}>
                {PASSWORD_UPDATE.change.tips.title}
              </Text>
              <List
                spacing={3}
                mt={4}
                sx={{ display: 'flex', flexDirection: 'column' }}
              >
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
          </Box>
        </Flex>
      </Box>

      <Dialog isOpen={isOpen} title='' onClose={onClose}>
        <Box w='141px' h='28px'>
          <LogoIcon />
        </Box>
        <Text textStyle='big1' color='blue.700' mt={7}>
          {PASSWORD_UPDATE.change.success.title}
        </Text>
        <Text textStyle='reg' mt={5}>
          {PASSWORD_UPDATE.change.success.message}
        </Text>
      </Dialog>
    </>
  );
};

export default Profile;
