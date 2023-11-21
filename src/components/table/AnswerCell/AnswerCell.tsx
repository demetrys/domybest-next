import { Text } from '@chakra-ui/react';

type AnswerResultProps = {
  answer?: string;
  isCorrect: boolean;
};

const AnswerCell = ({ answer, isCorrect }: AnswerResultProps) => {
  if (!answer) {
    return (
      <Text
        display='inline-block'
        as='span'
        px='16px'
        py={1.5}
        borderRadius={50}
        bg='yellow.100'
        color='yellow.800'
      >
        Omitted
      </Text>
    );
  }

  if (!isCorrect) {
    return (
      <Text
        display='inline-block'
        as='span'
        px='16px'
        py='5px'
        borderRadius={50}
        bg='red.100'
        color='red.800'
      >
        {answer}
      </Text>
    );
  }

  return (
    <Text
      position='relative'
      display='inline-block'
      as='span'
      width='47px'
      height='30px'
      borderRadius={50}
      bg='green.100'
      sx={{
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -60%) rotate(45deg)',
          width: '6px',
          height: '12px',
          borderRight: '2px solid',
          borderBottom: '2px solid',
          borderColor: 'green.800'
        }
      }}
    />
  );
};

export default AnswerCell;
