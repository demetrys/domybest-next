import { Stack, Text } from '@chakra-ui/react';

import {
  MathDirectionResponseList,
  MathDirectionTable
} from 'components/shared';

const GridInPassage = () => (
  <Stack
    gap={4}
    textStyle='exam-content-lg'
    px={4}
    color='black'
    sx={{ '& > ul': { pl: 10 } }}
  >
    <Text fontSize={18} fontWeight={600}>
      Student-produced response directions
    </Text>
    <MathDirectionResponseList />
    <MathDirectionTable />
  </Stack>
);

export default GridInPassage;
