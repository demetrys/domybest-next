import { Box, ListItem, Text, UnorderedList } from '@chakra-ui/react';

import { Link } from 'components';

const ScoreReportAndResults = () => (
  <Box bg='white' py='30px' px={{ base: 4, md: 6 }} borderRadius={10}>
    <Text textStyle='big2' color='blue.700' mb={4}>
      Score Reports & Results:
    </Text>
    <UnorderedList mb={4}>
      <ListItem>
        <Text>
          You will have access to a comprehensive score report immediately
          following the practice test.
        </Text>
      </ListItem>
    </UnorderedList>
    <Text>
      We look forward to having you take a practice test with us! Please do not
      hesitate to email us at{' '}
      <Link
        sx={{ color: 'blue.900', fontWeight: 500, textDecoration: 'underline' }}
        to='mailto:info@satprep.com'
      >
        info@satprep.com
      </Link>{' '}
      or call us at{' '}
      <Link
        to='tel:1-203-352-3500'
        sx={{ color: 'blue.900', fontWeight: 500, textDecoration: 'underline' }}
      >
        (203) 352-3500
      </Link>{' '}
      if you have any questions or we can be of any assistance.
    </Text>
  </Box>
);

export default ScoreReportAndResults;
