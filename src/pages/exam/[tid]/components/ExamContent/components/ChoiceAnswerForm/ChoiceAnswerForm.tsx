import { useCallback, useEffect } from 'react';

import { Stack, useRadioGroup } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import {
  deleteCrossOut,
  toggleCrossOuts
} from 'store/reducers/persistCrossOuts';

import { QuestionType } from 'constants/exam';
import { Choice, QuestionAnswer, QuestionOrder } from 'types/models';

import { SingleChoiceItem } from './components';

type FormProps = {
  choices?: Choice[];
  answer?: QuestionAnswer;
  order: QuestionOrder;
  setAnswer: (data?: QuestionAnswer) => void;
};

const ChoiceAnswerForm = ({ choices, answer, order, setAnswer }: FormProps) => {
  const dispatch = useAppDispatch();
  const testId = useAppSelector((state) => state.examTest.id);
  const {
    id: crossOutId,
    crossOuts,
    showCrossOuts
  } = useAppSelector((state) => state.persistCrossOuts);

  const getIsCrossedOut = (crossValue: QuestionAnswer) =>
    crossOutId === testId && crossOuts.includes(`${order}_${crossValue}`);

  const handleAnswerChange = (value: QuestionAnswer) => {
    setAnswer(value);
    // Reset crossed-out choice for current answer
    dispatch(deleteCrossOut(`${order}_${value}`));
  };

  const { getRootProps, getRadioProps, setValue, value } = useRadioGroup({
    name: QuestionType.choice,
    onChange: handleAnswerChange
  });

  const handleCrossToggle = useCallback(
    (crossValue: QuestionAnswer) => {
      dispatch(
        toggleCrossOuts({
          id: testId,
          item: `${order}_${crossValue}`
        })
      );

      if (value === crossValue) {
        // Reset answer field on cross-out toggle
        setAnswer(undefined);
      }
    },
    [dispatch, order, setAnswer, testId, value]
  );

  useEffect(() => {
    setValue(answer || '');
  }, [answer, setValue]);

  return (
    <form noValidate>
      <Stack {...getRootProps()}>
        {choices?.map((choice) => (
          <SingleChoiceItem
            key={choice.title}
            choice={choice}
            crossOut={showCrossOuts}
            isCrossedOut={getIsCrossedOut}
            handleCrossToggle={handleCrossToggle}
            {...getRadioProps({ value: choice.value })}
          />
        ))}
      </Stack>
    </form>
  );
};

export default ChoiceAnswerForm;
