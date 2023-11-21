import { Box, Flex, Stack, Text } from '@chakra-ui/react';

import { ROUTES } from 'constants/routes';

import { BorderDashed, Directions, Link } from 'components';

type ExamReviewHeaderProps = {
  title: string;
  sectionNr: number;
  id: string;
};

const ExamReviewHeader = ({ title, id, sectionNr }: ExamReviewHeaderProps) => (
  <Box position='relative' as='header' bgColor='white' order={-1} zIndex={10}>
    <Flex
      alignItems='center'
      justifyContent='space-between'
      minH='60px'
      py={2}
      px={8}
      bgColor='white'
    >
      <Stack alignItems='flex-start' gap={0}>
        <Text textStyle='exam-2xl' color='examGray.400' fontWeight={500}>
          {title}
        </Text>
        <Directions
          sectionId={sectionNr === 1 ? 'reading_and_writing' : 'math'}
          gutter={8}
          defaultIsOpen={false}
        />
      </Stack>
      <Link
        to={`${ROUTES.completed}/${id}`}
        buttonProps={{ colorScheme: 'examBlue' }}
      >
        Back to the test results
      </Link>
    </Flex>
    <BorderDashed />
  </Box>
);

export default ExamReviewHeader;
