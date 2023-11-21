import { memo, useCallback } from 'react';
import { FiChevronUp } from 'react-icons/fi';
import { IoBookmarkSharp, IoLocationOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';

import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Text,
  useDisclosure
} from '@chakra-ui/react';

import { useAppSelector } from 'store/hooks';

import { ExamMode, ExamPage } from 'constants/exam';
import { ROUTES } from 'constants/routes';
import { QuestionOrder, TargetStep, TestId } from 'types/models';

import { BorderDashed } from 'components';
import { NavigationGrid } from '../NavigationGrid';

type NavigateToModuleProps = {
  forceQuit?: boolean;
};

type ExamFooterProps = {
  testId: TestId;
  isReview: string | null;
  step: QuestionOrder;
  title: string | null;
  navigateToQuestion: (id: TargetStep) => void;
  setPrevQuestion: () => void;
  setNextQuestion: () => void;
  navigateToNextModule: ({ forceQuit }: NavigateToModuleProps) => void;
};

const ExamFooter = memo(
  ({
    testId,
    isReview,
    step,
    title,
    navigateToQuestion,
    setPrevQuestion,
    setNextQuestion,
    navigateToNextModule
  }: ExamFooterProps) => {
    const { replace: routerReplace } = useRouter();
    const { isOpen, onToggle, onClose } = useDisclosure();
    const { self } = useAppSelector((state) => state.self);
    const mode = useAppSelector((state) => state.examTest.mode);
    const testModule = useAppSelector((state) => state.examTest.module);
    const time = useAppSelector((state) => state.examTest.time);

    const username = `${self.first_name} ${self.last_name}`;
    const hideNextButton = mode === ExamMode.test && isReview;
    const isNavDisabled = time ? time <= 1 : false;

    const handleNavigate = useCallback(
      (value: TargetStep) => {
        onClose();
        navigateToQuestion(value);
      },
      [navigateToQuestion, onClose]
    );

    const navigateToReview = async () => {
      handleNavigate(ExamPage.review);
      await routerReplace(`${ROUTES.exam}/${testId}/?${ExamPage.review}=true`);
    };

    const handleClickBack = async () => {
      if (isReview) {
        handleNavigate(step);
        await routerReplace(`${ROUTES.exam}/${testId}`, undefined, {
          shallow: true
        });
      } else {
        onClose();
        setPrevQuestion();
      }
    };

    const handleClickNext = () => {
      if (isReview) {
        navigateToNextModule({});
      } else {
        onClose();
        setNextQuestion();
      }
    };

    return (
      <Box
        as='footer'
        position='relative'
        bgColor='white'
        order={1}
        zIndex={isOpen ? 11 : 8}
      >
        <BorderDashed isColor={mode === ExamMode.test} />
        <Grid
          w='100%'
          p={4}
          gridTemplateColumns='repeat(3, 1fr)'
          alignItems='center'
          bgColor='white'
        >
          <GridItem>
            <Text textStyle='exam-2xl' fontWeight={700} color='examGray.400'>
              {username}
            </Text>
          </GridItem>
          <GridItem display='flex' justifyContent='center'>
            <Popover
              returnFocusOnClose={false}
              isOpen={isOpen}
              onClose={onClose}
              placement='top'
              flip={false}
              gutter={16}
              arrowSize={16}
              closeOnBlur={false}
            >
              {!isReview && (
                <PopoverTrigger>
                  <Button
                    colorScheme='examGray'
                    onClick={onToggle}
                    px={5}
                    sx={{
                      '& > svg': { ml: '10px' },
                      borderRadius: 4
                    }}
                  >
                    Question {step} of {testModule.total_questions}
                    <FiChevronUp />
                  </Button>
                </PopoverTrigger>
              )}
              <Portal>
                <PopoverContent w='492px' borderRadius={12}>
                  <PopoverArrow />
                  <PopoverCloseButton
                    sx={{
                      borderRadius: '50%',
                      w: '30px',
                      h: '30px',
                      '& > svg': {
                        w: '12px',
                        h: '12px'
                      }
                    }}
                  />
                  <PopoverBody p='15px 25px'>
                    <Box px={4}>
                      <Text
                        mt={4}
                        fontSize='18px'
                        color='examGray.400'
                        fontWeight='700'
                        textAlign='center'
                      >
                        {title}
                      </Text>
                      <HStack
                        mt={5}
                        h={10}
                        gap={0}
                        justifyContent='space-around'
                        borderTop='1px solid #383838'
                        borderBottom='1px solid #383838'
                      >
                        <Flex sx={{ '& > svg': { mr: 1 } }}>
                          <IoLocationOutline size={16} />
                          Current
                        </Flex>
                        <Flex>
                          <Box
                            w='16px'
                            h='16px'
                            mr={2}
                            border='1px dashed'
                            borderColor='examGray.600'
                          />
                          Unanswered
                        </Flex>
                        <Flex sx={{ '& > svg': { mr: 1 } }}>
                          <IoBookmarkSharp size={20} fill='#C13145' />
                          For review
                        </Flex>
                      </HStack>
                    </Box>
                    <Box mt='11px' textAlign='center'>
                      <NavigationGrid
                        currentStep={step}
                        handleNavigate={handleNavigate}
                      />
                      <Button
                        colorScheme='examWhite'
                        h={6}
                        minH={6}
                        mt={5}
                        mb={3}
                        mx='auto'
                        border='2px solid'
                        borderColor='examBlue.500'
                        size='sm'
                        onClick={navigateToReview}
                      >
                        Go to Review page
                      </Button>
                    </Box>
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </Popover>
          </GridItem>
          <GridItem>
            <Flex gap={3} alignItems='center' justifyContent='flex-end'>
              {(isReview || step > 1) && (
                <Button
                  isDisabled={isNavDisabled}
                  colorScheme='examBlue'
                  onClick={handleClickBack}
                >
                  Back
                </Button>
              )}
              {!hideNextButton && (
                <Button
                  isDisabled={isNavDisabled}
                  colorScheme='examBlue'
                  onClick={handleClickNext}
                >
                  Next
                </Button>
              )}
            </Flex>
          </GridItem>
        </Grid>

        {/* Copyright */}
        <Flex
          alignItems='center'
          justifyContent='center'
          bgColor='#f4f5f8'
          color='#808180'
          fontSize='10px'
          minH={6}
        >
          SAT® and PSAT/NMSQT® are trademarks registered by the College Board,
          which is not affiliated with, and does not endorse, SAT Prep.
        </Flex>

        {/* Pager overlay */}
        {isOpen && (
          <Box
            position='fixed'
            top={0}
            left={0}
            w='100%'
            h='100%'
            bgColor='blue.800'
            zIndex={-1}
          />
        )}
      </Box>
    );
  }
);

ExamFooter.displayName = 'ExamFooter';
export default ExamFooter;
