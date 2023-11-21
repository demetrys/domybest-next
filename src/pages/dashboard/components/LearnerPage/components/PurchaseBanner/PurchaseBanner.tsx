import Image from 'next/image';

import { Box, Text } from '@chakra-ui/react';

import bannerSrc from 'assets/images/banners/purchase_banner.jpg';

import { FullWidthBg, Link } from 'components';

const PurchaseBanner = () => (
  <Box position='relative' py={{ base: '60px', md: '100px' }} bg='white'>
    <FullWidthBg bg='white' />
    <Text
      color='blue.700'
      textStyle='h2'
      as='h2'
      mb={{ base: '30px', md: '50px' }}
    >
      Tests Available for Purchase
    </Text>
    <Box
      position='relative'
      height={{ base: 400, sm: 300 }}
      borderRadius={10}
      overflow='hidden'
    >
      <Box position='absolute' width='100%' height='100%' top={0} left={0}>
        <Image
          src={bannerSrc}
          alt='Tests Available for Purchase'
          placeholder='blur'
          fill
          style={{ objectFit: 'cover' }}
          quality={100}
        />
      </Box>
      <Box
        p={{ base: '35px 16px', md: '36px 30px' }}
        bg='blue.700'
        position='relative'
        maxWidth={{
          base: '293px',
          sm: '350px',
          md: '539px'
        }}
        borderBottomRightRadius={{ base: 50, md: 60 }}
      >
        <Text textStyle='big1' as='h3' color='white' mb={{ base: 3, md: 4 }}>
          Looking for more practice test options?
        </Text>
        <Text textStyle='h3' color='white' mb={{ base: '30px', md: 9 }}>
          Head to our practice test page for more details.
        </Text>
        <Link
          to='https://www.satprep.com/practice-tests/'
          buttonProps={{ colorScheme: 'white', size: 'lg' }}
          external
        >
          Register now
        </Link>
      </Box>
    </Box>
  </Box>
);

export default PurchaseBanner;
