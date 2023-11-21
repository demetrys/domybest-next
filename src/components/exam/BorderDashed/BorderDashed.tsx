import { Box } from '@chakra-ui/react';

import BorderColored from 'assets/images/border_dashed_color.svg';
import BorderGray from 'assets/images/border_dashed_gray.svg';

const BorderDashed = ({ isColor = true }) => (
  <Box h='2px' w='100%' overflow='hidden'>
    {isColor ? (
      <BorderColored style={{ objectFit: 'cover' }} />
    ) : (
      <BorderGray style={{ objectFit: 'cover' }} />
    )}
  </Box>
);

export default BorderDashed;
