import { AiOutlineInfoCircle } from 'react-icons/ai';
import { FaRegCalendarAlt } from 'react-icons/fa';

import { Flex, Grid, GridItem, Text } from '@chakra-ui/react';

import { TestType, TestTypeText } from 'constants/global';
import { DemandTestSubType } from 'types/global';

import { TestIcon, TestLabel } from 'components/test';

type TestHeaderProps = {
  title: string;
  type: TestType;
  subtype: DemandTestSubType;
  date: string | Date;
  isExtended: boolean;
};

const TestHeader = ({
  title,
  subtype,
  type,
  date,
  isExtended
}: TestHeaderProps) => (
  <Grid
    gridTemplateColumns='auto 1fr'
    gridTemplateRows='auto auto'
    gap='12px 16px'
  >
    <GridItem gridColumn='1/2' gridRow={{ base: '1/2', lg: '1/3' }}>
      <TestIcon type={subtype} />
    </GridItem>
    <GridItem gridColumn='2/3' gridRow='1/2'>
      <Text textStyle='big3' color='blue.900'>
        {title}
      </Text>
    </GridItem>
    <GridItem gridColumn={{ base: '1/3', lg: '2/3' }} gridRow='2/3'>
      <Flex gap={1.5} wrap='wrap'>
        <TestLabel icon={<FaRegCalendarAlt />}>{date.toString()}</TestLabel>
        {isExtended && (
          <TestLabel icon={<AiOutlineInfoCircle />}>
            50% Extended time
          </TestLabel>
        )}
        <TestLabel>{TestTypeText[type]}</TestLabel>
      </Flex>
    </GridItem>
  </Grid>
);

export default TestHeader;
