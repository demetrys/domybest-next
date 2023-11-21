import { Box, ListItem, Text, UnorderedList } from '@chakra-ui/react';

import { TestsAccordion } from 'components';

const Accordion = () => (
  <Box mt={{ base: '30px', md: '60px' }} mb={{ base: '30px', md: '50px' }}>
    <TestsAccordion title='How to Choose Your Test Mode'>
      <Text color='white' mb={2}>
        When you take an On-Demand practice test, you have two distinct testing
        options:
      </Text>
      <UnorderedList color='white' mb={2}>
        <ListItem>
          PRACTICE MODE: Provides the most flexibility - you can save your work
          and exit the test at any time.
        </ListItem>
        <ListItem>
          TEST MODE: Simulates real test timing. Once the clock starts running
          be prepared to complete the entire test.
        </ListItem>
      </UnorderedList>
      <Text color='white'>
        You will receive a score for each section and/or test that you complete.
        Test results will be available immediately after completing each section
        and/or the full-length test.
      </Text>
    </TestsAccordion>
  </Box>
);

export default Accordion;
