import Latex from 'react-latex-next';
import Image from 'next/image';

import { Box, Button, Flex, Text, useRadio } from '@chakra-ui/react';

import { blurDataImage } from 'constants/global';
import { Choice, QuestionAnswer } from 'types/models';

import { TitleBadge } from 'components';

type ChoiceProps = {
  choice: Choice;
  crossOut: boolean;
  isCrossedOut: (value: QuestionAnswer) => boolean;
  handleCrossToggle: (value: QuestionAnswer) => void;
};

const SingleChoiceItem = ({
  choice,
  crossOut,
  isCrossedOut,
  handleCrossToggle,
  ...other
}: ChoiceProps) => {
  const { state, getInputProps, getRadioProps } = useRadio(other);

  const toggleCrossedOut = () => {
    handleCrossToggle(choice.value);
  };

  return (
    <Flex alignItems='center' mb='10px'>
      {/* Cross Out wrapper */}
      <Flex position='relative' flex='0 1 100%'>
        {/* Radio button */}
        <Box as='label' w='100%' mx={2}>
          <input {...getInputProps()} />

          <Flex
            {...getRadioProps()}
            as='span'
            cursor='pointer'
            borderRadius={8}
            p='15px 20px'
            w='100%'
            alignItems='center'
            border='1px solid'
            borderColor={state.isChecked ? 'examBlue.500' : 'examGray.400'}
            boxShadow={state.isChecked ? '0 0 0 .125rem #3077C2' : 'none'}
            _focusVisible={{
              boxShadow: '0 0 0 .125rem #3077C2',
              outline: 'none'
            }}
            opacity={crossOut && isCrossedOut(choice.value) ? 0.5 : 1}
            userSelect='none'
          >
            <TitleBadge title={choice.title} isChecked={state.isChecked} />
            {choice.image ? (
              <Box as='span' position='relative'>
                <Image
                  src={choice.image.url}
                  width={choice.image.width}
                  height={choice.image.height}
                  placeholder='blur'
                  blurDataURL={blurDataImage}
                  alt='choice image'
                />
              </Box>
            ) : (
              <Text
                as='span'
                color='examGray.400'
                fontFamily='var(--chakra-fonts-examSecondary)'
              >
                <Latex>{choice.content}</Latex>
              </Text>
            )}
          </Flex>
        </Box>
        {/* Cross Out line */}
        {crossOut && isCrossedOut(choice.value) && (
          <Box
            w='100%'
            h='3px'
            left={0}
            bgColor='#010101'
            position='absolute'
            top='50%'
            transform='translateY(-50%)'
            pointerEvents='none'
            userSelect='none'
            cursor='pointer'
          />
        )}
      </Flex>

      {/* Cross Out button */}
      {crossOut && (
        <Button
          variant='link'
          onClick={toggleCrossedOut}
          minH={6}
          minW={8}
          ml='10px'
          borderRadius={4}
          color='examGray.700'
          fontSize='13px'
          fontWeight={700}
          textDecoration={
            isCrossedOut(choice.value) ? 'underline !important' : 'none'
          }
          _hover={{
            textDecoration: 'none'
          }}
        >
          {isCrossedOut(choice.value) ? (
            'Undo'
          ) : (
            <TitleBadge title={choice.title} isCrossed />
          )}
        </Button>
      )}
    </Flex>
  );
};

export default SingleChoiceItem;
