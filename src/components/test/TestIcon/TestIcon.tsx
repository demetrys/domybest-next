import { Center, Text } from '@chakra-ui/react';

import { DemandTestSubType } from 'types/global';

import ICON_TYPE_PROPERTIES from './data';

type TestIconProps = {
  type: DemandTestSubType;
};

const TestIcon = ({ type }: TestIconProps) => {
  const { title, color } = ICON_TYPE_PROPERTIES[type];

  return (
    <Center width={50} height={50} rounded={50} bg={color} flexShrink={0}>
      <Text textStyle='sm1' color='white' pt='1px'>
        {title}
      </Text>
    </Center>
  );
};

export default TestIcon;
