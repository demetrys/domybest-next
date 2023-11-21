import Latex from 'react-latex-next';

import { Stack, Text } from '@chakra-ui/react';

type ReviewExplanationProps = {
  answer: null | string;
  is_correct: boolean;
  correctAnswer: string[];
  explanation: string;
};

const ReviewExplanation = ({
  answer,
  is_correct,
  correctAnswer,
  explanation
}: ReviewExplanationProps) => {
  const renderReaction = () => {
    const correctAnswerText = `The correct answer${
      correctAnswer.length > 1 ? 's are' : ' is'
    } ${correctAnswer.join(', ')}.`;

    if (answer) {
      if (is_correct) {
        return (
          <Text
            fontWeight={600}
            bgColor='green.100'
            color='green.800'
          >{`Your answer ${answer} is correct.`}</Text>
        );
      }

      return (
        <Text fontWeight={600} bgColor='red.100' color='red.800'>
          {correctAnswerText}
        </Text>
      );
    }

    return (
      <Text
        fontWeight={600}
        bgColor='yellow.100'
        color='yellow.800'
      >{`You omitted this question. ${correctAnswerText}`}</Text>
    );
  };

  return (
    <Stack gap={2.5} alignItems='flex-start'>
      {renderReaction()}
      <Text fontWeight={600}>Explanation:</Text>
      <Latex>{explanation}</Latex>
    </Stack>
  );
};

export default ReviewExplanation;
