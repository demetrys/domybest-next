import { Button, Stack, Text } from '@chakra-ui/react';

type DetectDeviceProps = {
  onClose: () => void;
};
const DetectDevice = ({ onClose }: DetectDeviceProps) => (
  <Stack gap='30px'>
    <Text color='blue.900'>Please review the Technology Requirements.</Text>
    <Button width='100%' onClick={onClose}>
      Go back
    </Button>
  </Stack>
);

export default DetectDevice;
