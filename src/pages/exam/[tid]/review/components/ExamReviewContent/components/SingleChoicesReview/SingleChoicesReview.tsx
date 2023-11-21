import Latex from 'react-latex-next';
import Image from 'next/image';

import { Box, Flex, Stack, Text } from '@chakra-ui/react';

import { blurDataImage } from 'constants/global';
import { Choice } from 'types/models';

import { TitleBadge } from 'components';

type SingleChoicesReviewProps = {
  hidden: boolean;
  answer: string | null;
  choices?: Choice[];
};

const SingleChoicesReview = ({
  hidden,
  answer,
  choices
}: SingleChoicesReviewProps) => (
  <Stack gap={2.5}>
    {choices?.map(({ title, image, content, value }) => {
      const chosenAnswer = value === answer && !hidden;

      return (
        <Flex alignItems='center' key={title}>
          {/* Cross Out wrapper */}
          <Flex position='relative' flex='0 1 100%'>
            {/* Radio button */}
            <Box as='label' w='100%' mx={2}>
              <Flex
                as='span'
                borderRadius={8}
                p='15px 20px'
                w='100%'
                alignItems='center'
                borderWidth={2}
                borderColor={chosenAnswer ? 'examBlue.500' : 'examGray.400'}
              >
                <TitleBadge title={title} isChecked={chosenAnswer} />
                {image ? (
                  <Box as='span' position='relative'>
                    <Image
                      src={image.url}
                      width={image.width}
                      height={image.height}
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
                    <Latex>{content}</Latex>
                  </Text>
                )}
              </Flex>
            </Box>
          </Flex>
        </Flex>
      );
    })}
  </Stack>
);

export default SingleChoicesReview;
