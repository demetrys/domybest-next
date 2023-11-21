import { AiOutlineInfoCircle } from 'react-icons/ai';

import {
  Button,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Grid,
  GridItem,
  Stack,
  Text
} from '@chakra-ui/react';

import { ROUTES } from 'constants/routes';
import { OnDemandTestType, ResumeExamProps } from 'types/models';

import { Link, TestIcon } from 'components';

type OnDemandTestProps = {
  test: OnDemandTestType;
  onRestart: () => void;
  onResume: ({ eid, testId }: ResumeExamProps) => void;
};

const OnDemandTest = ({
  test: { testId, id, title, subtype, isExtended, progress },
  onRestart,
  onResume
}: OnDemandTestProps) => {
  const handleResume = () => {
    if (testId && id) {
      onResume({ eid: id, testId });
    }
  };

  return (
    <Grid
      py='23px'
      px={4}
      borderRadius={10}
      bg='white'
      border='1px solid'
      borderColor={progress ? 'blue.700' : 'transparent'}
      gridTemplateColumns={{ base: '1fr auto', md: '1fr auto auto' }}
      gap='40px 0'
    >
      <GridItem gridColumn={{ base: '1/2' }}>
        <Flex alignItems='center' gap={4}>
          <TestIcon type={subtype} />
          <Stack gap='10px'>
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
        </Flex>
      </GridItem>
      {progress ? (
        <>
          <GridItem alignSelf={{ md: 'center' }}>
            <CircularProgress
              value={progress}
              color='blue.200'
              mr={{ md: 5 }}
              thickness='6px'
            >
              <CircularProgressLabel top='calc(50% + 1px)' color='blue.700'>
                {progress}%
              </CircularProgressLabel>
            </CircularProgress>
          </GridItem>
          <GridItem
            alignSelf={{ md: 'center' }}
            gridColumn={{ base: '1/3', md: '3/4' }}
          >
            <Flex alignItems='center' gap='10px' wrap='wrap'>
              <Button
                colorScheme='lightBlue'
                width={{ base: '100%', sm: 'auto' }}
                order={{ base: 1, sm: 'initial' }}
                onClick={handleResume}
              >
                Resume
              </Button>
              <Button
                colorScheme='light'
                width={{ base: 'calc(50% - 5px)', sm: 'auto' }}
                onClick={onRestart}
              >
                Restart
              </Button>
              <Link
                to={`${ROUTES.onDemand}/${id}`}
                buttonProps={{
                  colorScheme: 'light',
                  width: { base: 'calc(50% - 5px)', sm: 'auto' }
                }}
              >
                Details
              </Link>
            </Flex>
          </GridItem>
        </>
      ) : (
        <GridItem
          gridRow={{ base: '2/3', md: '1/2' }}
          gridColumn={{ md: '2/3' }}
          alignSelf='center'
        >
          <Link
            to={`${ROUTES.onDemand}/${id}`}
            buttonProps={{
              colorScheme: 'light',
              width: { base: '100%', sm: 'auto' }
            }}
          >
            Details
          </Link>
        </GridItem>
      )}
    </Grid>
  );
};

export default OnDemandTest;
