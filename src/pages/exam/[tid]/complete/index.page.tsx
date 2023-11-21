import { ReactElement } from 'react';
import { IoHomeOutline } from 'react-icons/io5';

import { Box, Flex, Text, VStack } from '@chakra-ui/react';

import { useAppSelector } from 'store/hooks';

import { ROUTES } from 'constants/routes';

import MonitorImage from 'assets/icons/monitor-shimmer.svg';

import { ExamLayout, Link } from 'components';

const ExamComplete = () => {
  const { id } = useAppSelector((state) => state.examTest);

  return (
    <>
      <Box
        position='relative'
        as='header'
        bgColor='white'
        order={-1}
        zIndex={10}
      >
        <Flex
          justifyContent='flex-end'
          alignItems='center'
          minH='45px'
          py={2}
          px='7vw'
        >
          <Link
            to={ROUTES.dashboard}
            buttonProps={{
              size: 'sm',
              variant: 'ghost',
              rightIcon: <IoHomeOutline size={20} />,
              fontSize: 14,
              fontWeight: 500,
              color: 'examGray.400',
              borderRadius: '2px',
              sx: { svg: { transform: 'translateY(-1px)' } }
            }}
          >
            Return to home
          </Link>
        </Flex>
      </Box>

      <Box position='relative' flex='1 1 0%' overflowY='auto' bgColor='#fafafa'>
        <VStack py={10} minH='100%'>
          <Text fontSize='32px' color='black' textAlign='center' mb={6}>
            You&apos;re All Finished!
          </Text>

          <Box
            borderRadius={10}
            bgColor='white'
            p={5}
            w='100%'
            maxW='450px'
            shadow='md'
            color='black'
            textAlign='center'
          >
            <Flex justifyContent='center' p={4}>
              <MonitorImage style={{ height: '180px', objectFit: 'cover' }} />
            </Flex>
            <Text lineHeight={1.5} color='examGray.400' mb={4} px={4}>
              Congratulations on completing a full-length practice test. Your
              scores will be available shortly on your student dashboard.
            </Text>
          </Box>

          <Link
            to={`${ROUTES.completed}/${id}`}
            buttonProps={{
              mt: 5,
              colorScheme: 'examYellow',
              border: '1px solid',
              borderColor: 'examGray.700'
            }}
          >
            View Your Score
          </Link>
        </VStack>
      </Box>
    </>
  );
};

export default ExamComplete;

ExamComplete.getLayout = (page: ReactElement) => (
  <ExamLayout>{page}</ExamLayout>
);
