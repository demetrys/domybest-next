import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

import { Box, Flex } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import {
  resumeExamTest,
  submitModule,
  submitQuestion
} from 'store/actions/exam';
import { clearQuestionMarks } from 'store/reducers/exam';
import { closeModals } from 'store/reducers/modal';
import { clearAnnotations } from 'store/reducers/persistAnnotation';
import { clearCrossOut } from 'store/reducers/persistCrossOuts';

import { ExamPage, SectionType } from 'constants/exam';
import { ROUTES } from 'constants/routes';
import { Question, QuestionOrder, TargetStep } from 'types/models';

import { ExamLayout } from 'components';
import {
  ExamContent,
  ExamFooter,
  ExamHeader,
  ExamReview,
  ModuleLoader
} from './components';

type NavigateToModuleProps = {
  forceQuit?: boolean;
};

const ExamMainPage = () => {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { replace: routerReplace } = useRouter();
  const {
    id: testId,
    isLoading,
    isPaused,
    pos,
    section,
    module,
    questions,
    markedQuestions,
    endTest,
    time
  } = useAppSelector((state) => state.examTest);
  const [step, setStep] = useState<QuestionOrder>(1);
  const [currentQuestion, setCurrentQuestion] = useState<Question>(
    {} as Question
  );

  const isReview = searchParams.get(ExamPage.review);

  const getCurrentTitle = () => {
    if (module.title && section.title) {
      const sectionOrderTitle =
        section.id === SectionType.rw ? 'Section 1' : 'Section 2';
      return `${sectionOrderTitle}, ${module.title}: ${section.title}`;
    }

    return null;
  };

  const currentAnswerData = useMemo(
    () => ({
      testId,
      current: {
        answer: currentQuestion.answer,
        bookmark: markedQuestions.includes(currentQuestion.order_nr_local)
      }
    }),
    [
      currentQuestion.answer,
      currentQuestion.order_nr_local,
      markedQuestions,
      testId
    ]
  );

  // For Demo 25.10 //
  const { query } = useRouter();
  // const eid = searchParams.get('eid');
  const tid = query?.tid?.toString() || '';
  useEffect(() => {
    // If tesId is not assigned from '/start' page - take it from URL
    if (testId === '0' && tid) {
      dispatch(resumeExamTest({ eid: '0', testId: tid }));
    }
  }, [dispatch, testId, tid]);
  // ----------- //

  useEffect(() => {
    // Set saved step on Exam Resume
    if (pos) {
      const position = pos.split(':');
      const savedStep = Number(position[position.length - 1]);
      setStep(savedStep);
    }
  }, [pos]);

  useEffect(() => {
    // Display current question
    if (questions.length) {
      const storedQuestion =
        questions.find((q) => q.order_nr_local === step) || null;

      if (storedQuestion) {
        setCurrentQuestion(storedQuestion);
      }
    }
  }, [questions, step]);

  // Submit current question, get next in module
  const submitCurrentQuestion = useCallback(
    async (targetStep: TargetStep) => {
      const path = `${section?.id}:${module?.id}:${targetStep}`;
      const returnQuestion =
        !!pos ||
        (targetStep !== ExamPage.review &&
          !questions.some((q) => q.order_nr_local === targetStep));
      const conditionalData =
        step === module.total_questions && step === targetStep
          ? { to: { path, next_question: false } }
          : { to: { path }, returnQuestion };
      const data = {
        ...currentAnswerData,
        ...conditionalData
      };
      await dispatch(submitQuestion(data));
    },
    [
      currentAnswerData,
      dispatch,
      module?.id,
      module.total_questions,
      pos,
      questions,
      section?.id,
      step
    ]
  );

  // Submit current question and get next module data
  const submitCurrentModule = useCallback(async () => {
    const data = {
      ...currentAnswerData,
      to: { next_module: true }
    };
    await dispatch(submitModule(data));
  }, [currentAnswerData, dispatch]);

  // Navigate to brake/next module
  const navigateToNextModule = useCallback(
    async ({ forceQuit }: NavigateToModuleProps) => {
      // Close Save/Finish modals before navigate to next module
      dispatch(closeModals());

      // Check your work before next module/break/finish. No data submit
      if (!isReview && !forceQuit) {
        await submitCurrentQuestion(ExamPage.review);
        await routerReplace(
          `${ROUTES.exam}/${testId}/?${ExamPage.review}=true`
        );
        return;
      }

      // Submit current data and get next module/break data
      await submitCurrentModule();
      dispatch(clearQuestionMarks());
      dispatch(clearAnnotations());
      dispatch(clearCrossOut());

      // Back to test if it was first module
      const openFirstStep = (forceQuit || isReview) && module.id === '1';
      if (openFirstStep) {
        await routerReplace(`${ROUTES.exam}/${testId}`, undefined, {
          shallow: true
        });
        setStep(1);
      }
    },
    [
      isReview,
      submitCurrentModule,
      dispatch,
      module.id,
      submitCurrentQuestion,
      routerReplace,
      testId
    ]
  );

  useEffect(() => {
    if (time === 0) {
      navigateToNextModule({ forceQuit: true });
    }
  }, [time, navigateToNextModule]);

  // TODO: make possible back to prev question (save prev step in localStorage?)
  const setPrevQuestion = useCallback(async () => {
    const targetStep = step - 1;
    await submitCurrentQuestion(targetStep);
    setStep(targetStep);
  }, [step, submitCurrentQuestion]);

  const setNextQuestion = useCallback(async () => {
    if (step < module.total_questions) {
      // submit answer and navigate to next question
      const targetStep = step + 1;
      await submitCurrentQuestion(targetStep);
      setStep(targetStep);
    } else {
      await submitCurrentQuestion(ExamPage.review);
      await routerReplace(`${ROUTES.exam}/${testId}/?${ExamPage.review}=true`);
    }
  }, [
    testId,
    module.total_questions,
    routerReplace,
    step,
    submitCurrentQuestion
  ]);

  const navigateToQuestion = useCallback(
    async (targetStep: TargetStep) => {
      // set step and get new question
      await submitCurrentQuestion(targetStep);
      if (targetStep !== ExamPage.review) {
        setStep(targetStep);
      }
    },
    [submitCurrentQuestion]
  );

  const handleReviewNavigation = useCallback(
    async (order: TargetStep) => {
      await routerReplace(`${ROUTES.exam}/${testId}`, undefined, {
        shallow: true
      });
      await navigateToQuestion(order);
    },
    [navigateToQuestion, routerReplace, testId]
  );

  if (!section || section.type === SectionType.break) {
    return null;
  }

  if (isLoading || endTest) {
    return <ModuleLoader />;
  }

  return (
    <>
      {/* Header for test flow only */}
      <ExamHeader title={getCurrentTitle()} isReview={isReview} step={step} />

      <Box as='main' position='relative' bgColor='white' flex='1 1 0%' h='100%'>
        <Flex alignItems='center' h='100%'>
          {isReview && (
            <ExamReview
              title={getCurrentTitle()}
              handleReviewNavigation={handleReviewNavigation}
            />
          )}

          {!isReview && currentQuestion.id && (
            <ExamContent currentQuestion={currentQuestion} />
          )}
        </Flex>
      </Box>

      {/* Footer for test flow only */}
      <ExamFooter
        testId={testId}
        isReview={isReview}
        step={step}
        title={getCurrentTitle()}
        navigateToQuestion={navigateToQuestion}
        setPrevQuestion={setPrevQuestion}
        setNextQuestion={setNextQuestion}
        navigateToNextModule={navigateToNextModule}
      />

      {/* Pause overlay */}
      {isPaused && (
        <Box
          position='fixed'
          top={0}
          left={0}
          w='100%'
          h='100%'
          bgColor='blue.800'
          zIndex={9}
        />
      )}
    </>
  );
};

export default ExamMainPage;

ExamMainPage.getLayout = (page: ReactElement) => (
  <ExamLayout>{page}</ExamLayout>
);
