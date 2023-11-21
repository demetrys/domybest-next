import { ChangeEvent, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Latex from 'react-latex-next';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Box, Flex, Text } from '@chakra-ui/react';

import { getIsAllowedToEnter } from 'utils/exam';
import { getLatexString } from 'utils/latex';

import { QuestionType } from 'constants/exam';
import { QuestionAnswer } from 'types/models';

import { mathModuleValidator } from 'validators';

import { TextField } from 'components';

type FormFields = {
  [QuestionType.gridin]: QuestionAnswer;
};

const schema = yup.object({
  [QuestionType.gridin]: mathModuleValidator
});

type FormProps = {
  answer?: QuestionAnswer;
  setAnswer: (data: QuestionAnswer) => void;
};

const GridInAnswerForm = ({ answer, setAnswer }: FormProps) => {
  const {
    control,
    setValue,
    formState: { errors }
  } = useForm<FormFields>({
    defaultValues: { [QuestionType.gridin]: answer || '' },
    resolver: yupResolver(schema),
    mode: 'onChange'
  });

  const handleAnswerChange = (event: ChangeEvent<HTMLInputElement>) => {
    let { value } = event.target;

    const isAllowed = getIsAllowedToEnter(value);
    if (isAllowed) {
      const currChar = value.slice(value.length - 1);

      if (value.length > 1) {
        // Place the minus on the first position
        if (currChar === '-') {
          value = `-${value.slice(0, value.length - 1)}`;
        }
      }

      setValue(QuestionType.gridin, value, { shouldValidate: true });
      setAnswer(value);
    }
  };

  useEffect(() => {
    setValue(QuestionType.gridin, answer || '');
  }, [answer, setValue]);

  return (
    <form noValidate>
      <Box>
        <Controller
          name={QuestionType.gridin}
          control={control}
          render={({ field: { ref, value, onChange, ...other } }) => (
            <TextField
              {...other}
              value={value}
              variant='gridin'
              onChange={handleAnswerChange}
              error={errors.gridin?.message}
              maxLength={value.includes('-') ? 6 : 5}
            />
          )}
        />
        <Flex
          minW='155px'
          borderRadius={10}
          alignItems='center'
          bgColor='white'
          py={4}
          textStyle='exam-content-xl'
        >
          <Text mr={2} fontWeight={700}>
            Answer preview:
          </Text>
          {answer && (
            <Box>
              <Latex>{getLatexString(answer)}</Latex>
            </Box>
          )}
        </Flex>
      </Box>
    </form>
  );
};

export default GridInAnswerForm;
