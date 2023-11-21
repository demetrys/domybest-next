import { MouseEvent } from 'react';

import { Button, Flex, Grid, GridItem, Text } from '@chakra-ui/react';

import { ROUTES } from 'constants/routes';
import { CompletedTestType } from 'types/models';

import { Link } from 'components/ui';
import { TestHeader, TestScore } from './components';

type CompletedTestProps = {
  test: CompletedTestType;
  onRestart: () => void;
  onResume: (event: MouseEvent<HTMLButtonElement>) => void;
};

const CompletedTest = ({
  test: { id, title, date, type, isExtended, pending, subtype },
  onRestart,
  onResume
}: CompletedTestProps) => (
  <Grid
    gridTemplateRows={{ base: '1fr 340px auto', lg: '1fr 170px auto' }}
    borderRadius={10}
    py={{ base: 5, md: 6 }}
    px={{ base: 4, md: 6 }}
    bg='white'
    overflow='hidden'
    height='100%'
  >
    <GridItem
      py={{ base: 5, md: 6 }}
      px={{ base: 4, md: 6 }}
      mt={{ base: -5, md: -6 }}
      mx={{ base: -4, md: -6 }}
      bg='yellow.300'
    >
      <TestHeader
        title={title}
        type={type}
        subtype={subtype}
        date={date}
        isExtended={isExtended}
      />
    </GridItem>
    {pending ? (
      <GridItem my={{ base: 5, md: 6 }}>
        <Text color='blue.700'>
          Please wait while we process your practice test results...
        </Text>
      </GridItem>
    ) : (
      <GridItem my={{ base: 5, md: 4 }}>
        <TestScore />
      </GridItem>
    )}
    <GridItem>
      <Flex pt={5} gap={2.5} wrap='wrap'>
        <Link
          to={`${ROUTES.exam}/${id}`}
          buttonProps={{
            colorScheme: 'light',
            isDisabled: pending,
            sx: { width: { base: '100%', md: 'auto' } },
            onClick: onResume
          }}
        >
          Resume
        </Link>
        <Button
          colorScheme='light'
          isDisabled={pending}
          width={{ base: '100%', md: 'auto' }}
          onClick={onRestart}
        >
          Restart
        </Button>
        <Link
          to={`${ROUTES.completed}/${id}`}
          buttonProps={{
            colorScheme: 'light',
            isDisabled: pending,
            width: { base: '100%', md: 'auto' }
          }}
        >
          Review results
        </Link>
      </Flex>
    </GridItem>
  </Grid>
);

export default CompletedTest;
