import { Box, Text, VStack } from '@chakra-ui/react';

import { Loader } from 'components';

const ModuleLoader = () => (
  <VStack h='100%' justifyContent='center' bgColor='examGray.200'>
    <Text textStyle='exam-2xl' fontSize='30px' color='examBlue.500' mb={5}>
      This Module Is Over
    </Text>
    <Text textStyle='exam-xl'>All your work has been saved.</Text>
    <Text textStyle='exam-xl'>
      You&apos;ll move on automatically in just a moment.
    </Text>
    <Text textStyle='exam-xl'>Do not refresh this page or exit the app.</Text>
    <Box mt={12}>
      <Loader />
    </Box>
  </VStack>
);

export default ModuleLoader;
