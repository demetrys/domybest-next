import Latex from 'react-latex-next';

import { ListItem, Stack, Text, UnorderedList } from '@chakra-ui/react';

import { MathDirectionResponseList } from '../MathDirectionResponseList';
import { MathDirectionTable } from '../MathDirectionTable';

const MathDirection = () => (
  <Stack gap={4} textStyle='exam-content-lg' px={4} color='black'>
    <Text>
      The questions in this section address a number of important math skills.
    </Text>
    <Text>
      Use of a calculator is permitted for all questions. A reference sheet,
      calculator, and these directions can be accessed throughout the test.
    </Text>
    <Text>Unless otherwise indicated:</Text>
    <UnorderedList pl={10}>
      <ListItem>All variables and expressions represent real numbers.</ListItem>
      <ListItem>Figures provided are drawn to scale.</ListItem>
      <ListItem>All figures lie in a plane.</ListItem>
      <ListItem>
        <Latex>
          The domain of a given function $$ f $$ is the set of all real numbers
          $$ x $$ for which $$ f(x) $$ is a real number.
        </Latex>
      </ListItem>
    </UnorderedList>
    <Text>
      For <b>multiple-choice questions</b>, solve each problem and choose the
      correct answer from the choices provided. Each multiple-choice question
      has a single correct answer.
    </Text>
    <Text>
      For <b>student-produced response questions</b>, solve each problem and
      enter your answer as described below.
    </Text>
    <MathDirectionResponseList />
    <MathDirectionTable />
  </Stack>
);

export default MathDirection;
