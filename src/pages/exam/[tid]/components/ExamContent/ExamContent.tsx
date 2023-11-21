import { memo, useCallback } from 'react';
import { PiBookmarkSimpleLight } from 'react-icons/pi';
import { RxBookmarkFilled } from 'react-icons/rx';
import Latex from 'react-latex-next';
import Image from 'next/image';

import { Box, Button, Flex, Text } from '@chakra-ui/react';

import { usePanelExpand } from 'hooks';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { receiveAnswer, toggleQuestionMark } from 'store/reducers/exam';
import { toggleCrossOutsShow } from 'store/reducers/persistCrossOuts';

import { ExamMode, QuestionType, SectionType } from 'constants/exam';
import { blurDataImage } from 'constants/global';
import { Question, QuestionAnswer } from 'types/models';

import CrossOutActiveIcon from 'assets/icons/icon-cross-out-blue.svg';
import CrossOutIcon from 'assets/icons/icon-cross-out-white.svg';

import {
  AnnotationWrapper,
  BorderDashed,
  ExpandButton,
  GridInPassage
} from 'components';
import { ChoiceAnswerForm, GridInAnswerForm } from './components';

import 'react-latex-next/node_modules/katex/dist/katex.min.css';

type ExamContentProps = {
  currentQuestion: Question;
};

const ExamContent = memo(({ currentQuestion }: ExamContentProps) => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.examTest.mode);
  const section = useAppSelector((state) => state.examTest.section);
  const markedQuestions = useAppSelector(
    (state) => state.examTest.markedQuestions
  );
  const showCrossOuts = useAppSelector(
    (state) => state.persistCrossOuts.showCrossOuts
  );

  const {
    expandedPanel,
    handleQuestionExpandToggle,
    handlePassageExpandToggle
  } = usePanelExpand();

  const showPassage =
    !!currentQuestion.passage || currentQuestion.type === QuestionType.gridin;
  const showExpandButtons =
    section.id === SectionType.rw ||
    currentQuestion.type === QuestionType.gridin;
  const isMarked = markedQuestions.includes(currentQuestion.order_nr_local);

  const setAnswer = useCallback(
    (answer?: QuestionAnswer) => {
      dispatch(receiveAnswer({ ...currentQuestion, answer }));
    },
    [currentQuestion, dispatch]
  );

  const handleBookmarkToggle = () => {
    dispatch(toggleQuestionMark(currentQuestion.order_nr_local));
  };

  const handleCrossOutToggle = () => {
    dispatch(toggleCrossOutsShow(!showCrossOuts));
  };

  return (
    <>
      {/* Left panel (passage) */}
      {showPassage && (
        <Box
          position='relative'
          borderRight='4px solid #d1d1d1'
          h='calc(100% - 20px)'
          overflow='auto'
          sx={{
            ...(expandedPanel === 'none' ? { width: '50%' } : {}),
            ...(expandedPanel === 'passage' ? { width: '70%' } : {}),
            ...(expandedPanel === 'question' ? { width: '30%' } : {})
          }}
        >
          {showExpandButtons && (
            <ExpandButton
              panel='passage'
              expandedPanel={expandedPanel}
              onClick={handlePassageExpandToggle}
            />
          )}
          <Box
            position='absolute'
            overflowY='auto'
            overscrollBehaviorY='contain'
            w='100%'
            h='100%'
          >
            <Box
              borderRadius={10}
              bgColor='white'
              p='30px 40px'
              margin='auto'
              textStyle='exam-content-lg'
              h='100%'
              sx={{
                'ol, ul': {
                  pl: 4
                }
              }}
            >
              {section.id === SectionType.rw && currentQuestion.image && (
                <Flex w='100%' justifyContent='center' mb={4}>
                  <Image
                    src={currentQuestion.image.url}
                    width={currentQuestion.image.width}
                    height={currentQuestion.image.height}
                    placeholder='blur'
                    blurDataURL={blurDataImage}
                    alt='question image'
                  />
                </Flex>
              )}
              {section.id === SectionType.rw && currentQuestion.passage ? (
                <AnnotationWrapper
                  type='passage'
                  questionId={currentQuestion.id}
                >
                  {currentQuestion.passage}
                </AnnotationWrapper>
              ) : (
                <GridInPassage />
              )}
            </Box>
          </Box>
        </Box>
      )}

      {/* Right panel */}
      <Box
        position='relative'
        h='calc(100% - 20px)'
        overflow='auto'
        sx={{
          ...(!showPassage ? { width: '50%', mx: 'auto' } : {}),
          ...(expandedPanel === 'none' && showPassage
            ? { width: '50%', ml: 'auto' }
            : {}),
          ...(expandedPanel === 'passage' && showPassage
            ? { width: '30%', ml: 'auto' }
            : {}),
          ...(expandedPanel === 'question' && showPassage
            ? { width: '70%', ml: 'auto' }
            : {})
        }}
      >
        {showExpandButtons && (
          <ExpandButton
            panel='question'
            expandedPanel={expandedPanel}
            onClick={handleQuestionExpandToggle}
          />
        )}
        <Box
          position='absolute'
          overflowY='auto'
          overscrollBehaviorY='contain'
          w='100%'
          h='100%'
        >
          <Box py='40px' margin='auto'>
            {/* Read the question text */}
            <Box px='40px' mb='20px' w='100%'>
              <Flex bgColor='#f0f0f0'>
                <Flex
                  h={8}
                  px='10px'
                  mr={4}
                  bgColor='#222'
                  color='white'
                  alignItems='center'
                  flexShrink={0}
                  textStyle='exam-lg'
                  fontWeight={600}
                >
                  {currentQuestion.order_nr_local}
                </Flex>

                {/* Question text action panel */}
                <Button
                  variant='link'
                  minH={8}
                  leftIcon={
                    isMarked ? (
                      <RxBookmarkFilled size={22} color='#C13145' />
                    ) : (
                      <PiBookmarkSimpleLight size={22} />
                    )
                  }
                  fontWeight={isMarked ? 500 : 400}
                  color='examGray.700'
                  _hover={{
                    textDecor: 'none'
                  }}
                  onClick={handleBookmarkToggle}
                >
                  <Text as='span'>Mark for Review</Text>
                </Button>

                {currentQuestion.type !== QuestionType.gridin && (
                  <Button
                    variant='link'
                    minH={8}
                    ml='auto'
                    title='Cross out answer choices you think are wrong'
                    color='examGray.700'
                    _hover={{
                      textDecor: 'none'
                    }}
                    onClick={handleCrossOutToggle}
                  >
                    {showCrossOuts ? (
                      <CrossOutActiveIcon
                        style={{ height: '28px', objectFit: 'cover' }}
                      />
                    ) : (
                      <CrossOutIcon
                        style={{ height: '28px', objectFit: 'cover' }}
                      />
                    )}
                  </Button>
                )}
              </Flex>
              <BorderDashed isColor={mode === ExamMode.test} />

              {/* Question text */}
              {currentQuestion.question && (
                <Box my={4} textStyle='exam-content-lg'>
                  {section.id === SectionType.rw ? (
                    <AnnotationWrapper
                      type='question'
                      questionId={currentQuestion.id}
                    >
                      {currentQuestion.question}
                    </AnnotationWrapper>
                  ) : (
                    <>
                      {currentQuestion.image && (
                        <Flex w='100%' justifyContent='center' mb={4}>
                          <Image
                            src={currentQuestion.image.url}
                            width={currentQuestion.image.width}
                            height={currentQuestion.image.height}
                            placeholder='blur'
                            blurDataURL={blurDataImage}
                            alt='question image'
                          />
                        </Flex>
                      )}
                      {currentQuestion.equation && (
                        <Flex
                          w='100%'
                          justifyContent='center'
                          mb={4}
                          sx={{ '.katex-display': { display: 'block', mt: 2 } }}
                        >
                          <Latex>{currentQuestion.equation}</Latex>
                        </Flex>
                      )}
                      <Latex>{currentQuestion.question}</Latex>
                    </>
                  )}
                </Box>
              )}
            </Box>

            {/* Make a choice or enter an answer */}
            <Box px='40px'>
              {currentQuestion.type === QuestionType.choice ? (
                <ChoiceAnswerForm
                  choices={currentQuestion.choices}
                  answer={currentQuestion.answer}
                  order={currentQuestion.order_nr_local}
                  setAnswer={setAnswer}
                />
              ) : (
                <GridInAnswerForm
                  answer={currentQuestion.answer}
                  setAnswer={setAnswer}
                />
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
});

ExamContent.displayName = 'ExamContent';
export default ExamContent;
