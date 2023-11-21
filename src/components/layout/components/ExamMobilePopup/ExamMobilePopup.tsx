import { Center, Stack, Text } from '@chakra-ui/react';

import DesktopMobileIcon from 'assets/icons/desktop-mobile.svg';

const ExamMobilePopup = () => (
  <Center
    height='100vh'
    bgColor='blue.700'
    sx={{
      display: 'flex',
      '@media screen and (min-width: 1024px) and (min-height: 700px)': {
        display: 'none'
      }
    }}
  >
    <Stack
      maxWidth={500}
      px={{ base: 4, md: '30px' }}
      py={{ base: 8, md: '60px' }}
      mx={4}
      borderRadius={10}
      bgColor='white'
      gap={5}
      alignItems='center'
      textAlign='center'
    >
      <DesktopMobileIcon />
      <Text textStyle='big1' color='blue.700' mb={5}>
        Please expand your page size
      </Text>
      <Text>Unfortunately, your current window is too small to continue.</Text>
      <Text mt={-2.5}>
        SAT Prep digital practice tests are designed to work on desktops,
        laptops, and tablets that are at least 1024x700. Supported browsers
        include Chrome, Safari, and Firefox.
      </Text>
    </Stack>
  </Center>
);

export default ExamMobilePopup;
