import { IoBookmarkSharp, IoLocationOutline } from 'react-icons/io5';

import { Flex } from '@chakra-ui/react';

import { useAppSelector } from 'store/hooks';

import { arrayFrom } from 'utils/exam';

import { QuestionOrder } from 'types/models';

import { NavigationItem } from 'components';

type NavigationGridProps = {
  currentStep?: QuestionOrder;
  size?: 'small' | 'big';
  handleNavigate: (value: QuestionOrder) => void;
};

const NavigationGrid = ({
  currentStep,
  size = 'small',
  handleNavigate
}: NavigationGridProps) => {
  const testModule = useAppSelector((state) => state.examTest.module);
  const questions = useAppSelector((state) => state.examTest.questions);
  const markedQuestions = useAppSelector(
    (state) => state.examTest.markedQuestions
  );

  const onClick = (order: number) => () => {
    handleNavigate(order);
  };

  const getHasAnswer = (order: QuestionOrder) => {
    const question = questions.find((q) => q.order_nr_local === order);

    return Boolean(question?.answer);
  };

  return (
    <Flex flexWrap='wrap'>
      {arrayFrom(testModule.total_questions).map((orderNr) => (
        <NavigationItem
          key={orderNr}
          size={size}
          hasAnswer={getHasAnswer(orderNr)}
          isCurrent={currentStep === orderNr}
          onClick={onClick(orderNr)}
        >
          {currentStep === orderNr && (
            <IoLocationOutline className='position' />
          )}
          {markedQuestions.includes(orderNr) && (
            <IoBookmarkSharp size={12} fill='#C13145' className='bookmark' />
          )}
          {orderNr}
        </NavigationItem>
      ))}
    </Flex>
  );
};

export default NavigationGrid;
