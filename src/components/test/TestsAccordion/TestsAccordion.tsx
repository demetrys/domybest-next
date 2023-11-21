import { PropsWithChildren, useState } from 'react';
import { BiMinus, BiPlus } from 'react-icons/bi';

import {
  Accordion as ChakraAccordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Center,
  Text
} from '@chakra-ui/react';

type TestsAccordionProps = PropsWithChildren & {
  title: string;
};

const TestsAccordion = ({ title, children }: TestsAccordionProps) => {
  const [index, setIndex] = useState<number[]>([0]);

  const onChange = (idx: number[]) => {
    setIndex(idx);
  };

  return (
    <ChakraAccordion
      allowToggle
      bg='blue.700'
      borderRadius={20}
      px={6}
      py='30px'
      index={index}
      onChange={onChange}
    >
      <AccordionItem border='none'>
        {({ isExpanded }) => (
          <>
            <Text as='h2' textStyle='big1' color='white'>
              <AccordionButton
                p={0}
                _hover={{ bg: 'transparent' }}
                sx={{ font: 'inherit' }}
              >
                <Box
                  as='span'
                  flex='1'
                  textAlign='start'
                  sx={{ font: 'inherit' }}
                >
                  {title}
                </Box>
                <Center
                  as='span'
                  width={30}
                  height={30}
                  borderRadius='50%'
                  bg='blue.50'
                  color='blue.700'
                >
                  {isExpanded ? <BiMinus size={26} /> : <BiPlus size={26} />}
                </Center>
              </AccordionButton>
            </Text>
            <AccordionPanel p={0} mt={5}>
              {children}
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </ChakraAccordion>
  );
};

export default TestsAccordion;
