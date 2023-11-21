import { memo } from 'react';
import { IoBookmarkSharp } from 'react-icons/io5';

import { Box, Flex, Text, VStack } from '@chakra-ui/react';

import { QuestionOrder } from 'types/models';

import { NavigationGrid } from '../NavigationGrid';

type ExamReviewProps = {
  title: string | null;
  handleReviewNavigation: (value: QuestionOrder) => void;
};

const ExamReview = memo(
  ({ title, handleReviewNavigation }: ExamReviewProps) => {
    const handleNavigate = (value: QuestionOrder) => {
      handleReviewNavigation(value);
    };

    return (
      <Box position='relative' h='100%' w='100%' overflow='auto'>
        <Box
          position='absolute'
          overflowY='auto'
          overscrollBehaviorY='contain'
          w='100%'
        >
          <VStack
            position='relative'
            flexGrow={1}
            justifyContent='flex-start'
            w='100%'
            py='45px'
          >
            <Text fontSize='32px' color='black' textAlign='center'>
              Check your work
            </Text>
            <Text mt={6} fontSize='16px' textAlign='center'>
              On test day, you won&apos;t be able to move on to the next module
              until time expires.
            </Text>
            <Text mt={3} fontSize='16px' textAlign='center'>
              For these practice questions, you can click Next when you&apos;re
              ready to move on.
            </Text>
            <Box
              borderRadius={8}
              bg='white'
              mt={4}
              p={4}
              w='100%'
              maxW='760px'
              boxShadow='0 0 8px 5px rgba(153, 153, 153, .15)'
            >
              <Box mt='30px' mb={4} px={4}>
                <Flex
                  py={4}
                  justifyContent='space-between'
                  color='examGray.400'
                  borderBottom='1px solid #A3A3A3'
                >
                  <Text fontSize='18px' fontWeight='700'>
                    {title}
                  </Text>
                  <Flex alignItems='center' ml='auto'>
                    <Box
                      w='16px'
                      h='16px'
                      mr={2}
                      border='1px dashed'
                      borderColor='examGray.600'
                    />
                    Unanswered
                  </Flex>
                  <Flex
                    alignItems='center'
                    ml={3}
                    sx={{ '& > svg': { mr: 1 } }}
                  >
                    <IoBookmarkSharp size={22} fill='#C13145' />
                    For review
                  </Flex>
                </Flex>
              </Box>
              <NavigationGrid size='big' handleNavigate={handleNavigate} />
            </Box>
          </VStack>
        </Box>
      </Box>
    );
  }
);

ExamReview.displayName = 'ExamReview';
export default ExamReview;
