import { Button, Flex, Text } from '@chakra-ui/react';

import { InPersonTestActionData } from 'types/global';

type StartTestProps = InPersonTestActionData & {
  onClose: () => void;
};

const StartTest = ({ id, isExtended, onClose }: StartTestProps) => {
  const onStart = () => {
    console.log(
      `Test with id: ${id} has started! - ${
        isExtended ? '50% Extended Time' : 'Standard Time'
      }`
    );
  };

  return (
    <>
      <Text mb='30px'>Once you click “Start”, the test will begin.</Text>
      <Flex gap={2.5}>
        <Button flexGrow={1} onClick={onStart}>
          Start
        </Button>
        <Button colorScheme='light' flexGrow={1} onClick={onClose}>
          Back
        </Button>
      </Flex>
    </>
  );
};

export default StartTest;
