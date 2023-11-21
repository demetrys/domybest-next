import { AiOutlineInfoCircle } from 'react-icons/ai';

import { Button, Flex, Grid, GridItem, Stack, Text } from '@chakra-ui/react';

import { ROUTES } from 'constants/routes';
import { OnDemandTestType, ResumeExamProps } from 'types/models';

import { Link, Progress, TestIcon } from 'components';

type TestCardProps = {
  test: OnDemandTestType;
  onRestart: () => void;
  onResume: ({ eid, testId }: ResumeExamProps) => void;
};

const OnDemandTest = ({
  test: { testId, id, title, subtype, progress, isExtended },
  onResume,
  onRestart
}: TestCardProps) => {
  const handleResume = () => {
    if (testId) {
      onResume({ eid: id, testId });
    }
  };

  return (
    <Stack
      p='24px 16px 20px'
      minHeight='247px'
      width={277}
      justifyContent='space-between'
      bg='white'
      borderRadius={10}
      border='1px solid'
      borderColor={progress ? 'blue.500' : 'transparent'}
    >
      <Grid gap='14px' gridTemplateColumns='auto 1fr'>
        <GridItem alignSelf='center'>
          <TestIcon type={subtype} />
        </GridItem>
        <GridItem alignSelf='center'>
          <Stack gap='7px'>
            <Text textStyle='big3' color='blue.700'>
              {title}
            </Text>
            {isExtended ? (
              <Flex
                gap='7px'
                sx={{ '& svg': { width: 4, height: 4, fill: 'blue.700' } }}
              >
                <AiOutlineInfoCircle />
                <Text textStyle='sm1' color='blue.700' mt='1px'>
                  50% Extended Time
                </Text>
              </Flex>
            ) : (
              <Text textStyle='sm1' color='blue.700'>
                Standard Time
              </Text>
            )}
          </Stack>
        </GridItem>
      </Grid>
      {Boolean(progress) && <Progress value={Number(progress)} />}
      <Stack gap='11px'>
        {progress ? (
          <>
            <Flex justifyContent='space-between' gap='14px'>
              <Button width='50%' colorScheme='light' onClick={onRestart}>
                Restart
              </Button>
              <Link
                to={`${ROUTES.onDemand}/${id}`}
                buttonProps={{
                  width: '50%',
                  colorScheme: 'light'
                }}
              >
                Details
              </Link>
            </Flex>
            <Button width='100%' onClick={handleResume}>
              Resume
            </Button>
          </>
        ) : (
          <Link
            to={`${ROUTES.onDemand}/${id}`}
            buttonProps={{
              width: '100%',
              colorScheme: 'light'
            }}
          >
            Details
          </Link>
        )}
      </Stack>
    </Stack>
  );
};

export default OnDemandTest;
