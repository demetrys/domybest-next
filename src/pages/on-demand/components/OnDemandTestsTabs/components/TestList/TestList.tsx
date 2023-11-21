import { useState } from 'react';

import { Box, Center, Stack, useMediaQuery } from '@chakra-ui/react';

import { useAppDispatch } from 'store/hooks';
import { resumeExamTest } from 'store/actions/exam';
import { openModalByType, openPerformTestModal } from 'store/reducers/modal';

import { TESTS_PER_PAGE } from 'constants/global';
import { OnDemandTestType, ResumeExamProps } from 'types/models';

import { Pagination } from 'components';
import { OnDemandTest } from '../OnDemandTest';

type TestListProps = {
  tests: OnDemandTestType[];
};

const TestList = ({ tests }: TestListProps) => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState<number>(1);
  const [isDesktop] = useMediaQuery('(min-width: 1024px)');

  const amount = tests.length;

  const handleResume = ({ eid, testId }: ResumeExamProps) => {
    if (isDesktop) {
      if (testId) {
        dispatch(resumeExamTest({ eid, testId }));
      }
    } else {
      dispatch(openModalByType('device'));
    }
  };

  const handleRestart = (id: string) => () => {
    if (isDesktop) {
      dispatch(openPerformTestModal({ type: 'restart', id }));
    } else {
      dispatch(openModalByType('device'));
    }
  };

  const renderPagination = () => {
    if (amount > TESTS_PER_PAGE) {
      const count = Math.ceil(amount / TESTS_PER_PAGE);

      return (
        <Center mt={{ base: '30px', md: '50px' }}>
          <Pagination page={page} count={count} onChange={setPage} />
        </Center>
      );
    }

    return null;
  };

  return (
    Boolean(amount) && (
      <Box>
        <Stack gap={5}>
          {tests
            .slice((page - 1) * TESTS_PER_PAGE, page * TESTS_PER_PAGE)
            .map((test) => (
              <OnDemandTest
                key={test.id}
                test={test}
                onResume={handleResume}
                onRestart={handleRestart(test.id)}
              />
            ))}
        </Stack>
        {renderPagination()}
      </Box>
    )
  );
};

export default TestList;
