import { HiOutlineMail } from 'react-icons/hi';
import { LiaPhoneSolid } from 'react-icons/lia';

import { Flex, Text } from '@chakra-ui/react';

import { FullWidthBg } from 'components/shared';
import { Link } from 'components/ui';

const Footer = () => (
  <Flex
    as='footer'
    position='relative'
    alignItems='center'
    justifyContent='space-between'
    wrap='wrap'
    gap={5}
    py={{
      base: 4,
      md: '18px'
    }}
    pb={4}
    bg='blue.700'
  >
    <FullWidthBg bg='blue.700' />
    <Flex
      gap={{
        base: '14px 40px',
        md: '14px 30px'
      }}
      wrap='wrap'
    >
      <Link color='white' to='tel:1-203-352-3500'>
        <LiaPhoneSolid />
        <span>(203) 352-3500</span>
      </Link>
      <Link
        color='white'
        to='mailto:info@satprep.com'
        sx={{ order: { base: 1, md: 'initial' } }}
      >
        <HiOutlineMail />
        <span>info@satprep.com</span>
      </Link>
      <Link color='white' to='https://www.satprep.com' external>
        www.satprep.com
      </Link>
    </Flex>
    <Text textStyle='sm1' color='white'>
      © Copyright | All rights reserved
    </Text>
  </Flex>
);

export default Footer;
