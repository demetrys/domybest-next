import Latex from 'react-latex-next';

import { ListItem, UnorderedList } from '@chakra-ui/react';

const MathDirectionResponseList = () => (
  <UnorderedList pl={10}>
    <ListItem>
      If you find <b>more than one correct answer</b>, enter only one answer.
    </ListItem>
    <ListItem>
      You can enter up to 5 characters for a <b>positive</b> answer and up to 6
      characters (including the negative sign) for a <b>negative</b> answer.
    </ListItem>
    <ListItem>
      If your answer is a <b>fraction</b> that doesn’t fit in the provided
      space, enter the decimal equivalent.
    </ListItem>
    <ListItem>
      If your answer is a <b>decimal</b> that doesn’t fit in the provided space,
      enter it by truncating or rounding the fourth digit.
    </ListItem>
    <ListItem>
      <Latex>
        {
          'If your answer is a <b>mixed number</b> (subject as $$ 3\\frac{1}{2} $$), enter it as an improper fraction (7/2) or its decimal equivalent (3.5).'
        }
      </Latex>
    </ListItem>
    <ListItem>
      Don’t enter <b>symbols</b> such as a percent sign, comma, or dollar sign.
    </ListItem>
  </UnorderedList>
);

export default MathDirectionResponseList;
