import Latex from 'react-latex-next';
import Image from 'next/image';

import { Box, Flex } from '@chakra-ui/react';

import { usePanelExpand } from 'hooks';
import { useAppSelector } from 'store/hooks';

import { QuestionType, SectionType } from 'constants/exam';
import { blurDataImage } from 'constants/global';

import { BorderDashed, ExpandButton, GridInPassage } from 'components';
import {
  GridInReview,
  ReviewExplanation,
  SingleChoicesReview
} from './components';

type ExamReviewContentProps = {
  hidden: boolean;
};

const ExamReviewContent = ({ hidden }: ExamReviewContentProps) => {
  const {
    pos,
    type,
    passage,
    image,
    order_nr_local,
    question,
    equation,
    answer,
    choices,
    is_correct,
    correct_answer,
    explanation
  } = useAppSelector((state) => state.reviewExam.question);
  const {
    expandedPanel,
    handleQuestionExpandToggle,
    handlePassageExpandToggle
  } = usePanelExpand();

  const isRWSection = pos.includes(SectionType.rw);
  const isGridInQuestion = type === QuestionType.gridin;

  const showPassage = !!passage || isGridInQuestion;
  const showExpandButtons = isRWSection || isGridInQuestion;

  return (
    <Box as='main' position='relative' bgColor='white' flex='1 1 0%' h='100%'>
      <Flex alignItems='center' h='100%'>
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
                {isRWSection && image && (
                  <Flex w='100%' justifyContent='center' mb={4}>
                    <Image
                      src={image.url}
                      width={image.width}
                      height={image.height}
                      placeholder='blur'
                      blurDataURL={blurDataImage}
                      alt='question image'
                    />
                  </Flex>
                )}
                {isRWSection && passage ? (
                  <Box dangerouslySetInnerHTML={{ __html: passage }} />
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
                    {order_nr_local}
                  </Flex>
                </Flex>
                <BorderDashed />

                {/* Question text */}
                {question && (
                  <Box my={4} textStyle='exam-content-lg'>
                    {isRWSection ? (
                      <Box>{question}</Box>
                    ) : (
                      <>
                        {image && (
                          <Flex w='100%' justifyContent='center' mb={4}>
                            <Image
                              src={image.url}
                              width={image.width}
                              height={image.height}
                              placeholder='blur'
                              blurDataURL={blurDataImage}
                              alt='question image'
                            />
                          </Flex>
                        )}
                        {equation && (
                          <Flex
                            w='100%'
                            justifyContent='center'
                            mb={4}
                            sx={{
                              '.katex-display': { display: 'block', mt: 2 }
                            }}
                          >
                            <Latex>{equation}</Latex>
                          </Flex>
                        )}
                        <Latex>{question}</Latex>
                      </>
                    )}
                  </Box>
                )}
              </Box>

              <Box px='40px'>
                {isGridInQuestion ? (
                  <GridInReview answer={answer} hidden={hidden} />
                ) : (
                  <SingleChoicesReview
                    hidden={hidden}
                    answer={answer}
                    choices={choices}
                  />
                )}
              </Box>
              {!hidden && (
                <Box px='40px' mt='20px' textStyle='exam-content-lg'>
                  <ReviewExplanation
                    answer={answer}
                    is_correct={is_correct}
                    correctAnswer={correct_answer}
                    explanation={explanation}
                  />
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default ExamReviewContent;
