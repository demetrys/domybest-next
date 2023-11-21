import { AiOutlineInfoCircle } from 'react-icons/ai';
import { BiTime } from 'react-icons/bi';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { MdOutlinePlace } from 'react-icons/md';

import { Flex, Grid, GridItem, Stack, Text } from '@chakra-ui/react';

import { ROUTES } from 'constants/routes';
import { InPersonTestType } from 'types/models';

import { TestIcon, TestLabel } from 'components/test';
import { Link } from 'components/ui';

type TestCardProps = {
  test: InPersonTestType;
};

const InPersonTest = ({
  test: { id, title, subtype, location, date, startTime, endTime, isExtended }
}: TestCardProps) => (
  <Stack
    p='24px 16px 20px'
    minHeight='247px'
    width={277}
    justifyContent='space-between'
    bg='white'
    borderRadius={10}
  >
    <Grid gap='14px' gridTemplateColumns='auto 1fr'>
      <GridItem alignSelf='center'>
        <TestIcon type={subtype} />
      </GridItem>
      <GridItem alignSelf='center'>
        <Text textStyle='big3' color='blue.700'>
          {title}
        </Text>
      </GridItem>
    </Grid>
    <Stack gap={3}>
      <TestLabel icon={<MdOutlinePlace />} noBox>
        {location}
      </TestLabel>
      <Flex alignItems='center' justifyContent='space-between'>
        <TestLabel icon={<FaRegCalendarAlt />} noBox>
          {date}
        </TestLabel>
        <TestLabel icon={<BiTime />} noBox>
          {startTime} - {endTime}
        </TestLabel>
      </Flex>
      {isExtended && (
        <TestLabel icon={<AiOutlineInfoCircle />} noBox>
          50% Extended time
        </TestLabel>
      )}
    </Stack>
    <Link
      to={`${ROUTES.inPerson}/${id}`}
      buttonProps={{
        width: '100%',
        colorScheme: 'light'
      }}
    >
      Details
    </Link>
  </Stack>
);

export default InPersonTest;
