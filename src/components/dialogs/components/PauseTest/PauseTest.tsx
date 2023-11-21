import { Button, Flex, Text } from '@chakra-ui/react';

import { InPersonTestActionData } from 'types/global';

type PauseTestProps = InPersonTestActionData & {
  onClose: () => void;
};

const PauseTest = ({ id, isExtended, onClose }: PauseTestProps) => {
  const onPause = () => {
    console.log(`Test with id: ${id} was paused`);
  };

  return (
    <>
      <Text mb='18px' textStyle='big2' color='blue.700'>
        You are about to PAUSE the
        {isExtended ? ' 50% Extended Time ' : ' Standard Time '}test for all
        students. You will be able to resume this test.
      </Text>
      <Text mb='30px'>Are you sure you want to pause for the group?</Text>
      <Flex gap={2.5}>
        <Button flexGrow={1} onClick={onPause}>
          Pause Test
        </Button>
        <Button colorScheme='light' flexGrow={1} onClick={onClose}>
          Back
        </Button>
      </Flex>
    </>
  );
};

export default PauseTest;
