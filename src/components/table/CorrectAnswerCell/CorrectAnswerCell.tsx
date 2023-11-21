import { Stack } from '@chakra-ui/react';

type CorrectAnswerCellProps = {
  answer: string[];
};

const CorrectAnswerCell = ({ answer }: CorrectAnswerCellProps) => (
  <Stack gap={0}>
    {answer.map((item, index) => {
      const last = answer.length - 1 === index;

      return (
        <span key={item}>
          {item}
          {last ? '' : ','}
        </span>
      );
    })}
  </Stack>
);

export default CorrectAnswerCell;
