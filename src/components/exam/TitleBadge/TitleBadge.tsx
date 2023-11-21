import { Box } from '@chakra-ui/react';

type TitleBadgeProps = {
  title: string;
  isChecked?: boolean;
  isCrossed?: boolean;
};

const TitleBadge = ({ title, isChecked, isCrossed }: TitleBadgeProps) => (
  <Box
    as='span'
    display='inline-flex'
    w={isCrossed ? '18px' : 6}
    h={isCrossed ? '18px' : 6}
    mr={isCrossed ? 0 : '14px'}
    lineHeight={isCrossed ? '18px' : '21px'}
    position='relative'
    alignSelf={isCrossed ? 'center' : 'flex-start'}
    flexShrink={0}
    borderWidth={isCrossed ? 1 : 2}
    borderStyle='solid'
    borderColor={isCrossed ? 'examGray.700' : 'examGray.400'}
    borderRadius='50%'
    bgColor={isChecked ? 'examBlue.500' : 'white'}
    color={isChecked ? 'white' : 'examGray.400'}
    fontWeight={600}
    textAlign='center'
    justifyContent='center'
  >
    {title}
    {isCrossed && (
      <Box
        as='span'
        w='calc(100% + 8px)'
        h='1px'
        left='-4px'
        bgColor='#010101'
        position='absolute'
        top='50%'
        transform='translateY(-50%)'
      />
    )}
  </Box>
);

export default TitleBadge;
