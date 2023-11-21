import Image, { StaticImageData } from 'next/image';

import { Box, Text } from '@chakra-ui/react';

import { blurDataImage } from 'constants/global';

type HeroBannerProps = {
  title: string;
  imageSrc: StaticImageData;
  imageAlt: string;
};

const HeroBanner = ({ title, imageSrc, imageAlt }: HeroBannerProps) => (
  <Box
    position='relative'
    pt={{ base: '100%', sm: '50%', md: '25%' }}
    borderRadius={20}
    overflow='hidden'
  >
    <Box position='absolute' top={0} right={0} bottom={0} left={0}>
      <Box position='absolute' w='100%' h='100%'>
        <Image
          src={imageSrc}
          alt={imageAlt}
          placeholder='blur'
          blurDataURL={blurDataImage}
          fill
          style={{ objectFit: 'cover' }}
          quality={100}
        />
      </Box>
      <Box
        position='absolute'
        width='100%'
        height='100%'
        bg='linear-gradient(90deg, #1A3E6D 0%, rgba(26, 62, 109, 0.88) 17.95%, rgba(26, 62, 109, 0.00) 100%)'
        transform={{ base: 'rotate(-90deg)', sm: 'rotate(0)' }}
      />
      <Box
        position='relative'
        height='100%'
        display='flex'
        alignItems={{
          base: 'flex-end',
          md: 'center'
        }}
        justifyContent={{
          base: 'center',
          md: 'normal'
        }}
        px={10}
        py='50px'
      >
        <Text as='h1' textStyle='h1' color='white'>
          {title}
        </Text>
      </Box>
    </Box>
  </Box>
);

export default HeroBanner;
