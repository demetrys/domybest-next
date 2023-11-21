import { Flex, Stack, Text } from '@chakra-ui/react';

import { ROUTES } from 'constants/routes';

import { Link } from 'components/ui';

type ResumeErrorProps = {
  onClose: () => void;
};

const ResumeError = ({ onClose }: ResumeErrorProps) => (
  <Stack gap='16px'>
    <Text textStyle='exam-4xl' width='calc(100% - 48px)'>
      Oops!
    </Text>
    <Text textStyle='exam-lg' mt={2}>
      This test is no longer available.
    </Text>

    <Flex justifyContent='flex-end' gap={8}>
      <Link
        to={ROUTES.dashboard}
        buttonProps={{
          colorScheme: 'yellow',
          border: '1px solid black',
          onClick: onClose
        }}
      >
        Back to the Dashboard
      </Link>
    </Flex>
  </Stack>
);

export default ResumeError;
