import { useEffect, useState } from 'react';

import { Box, Flex, Tab, TabList, TabPanels, Tabs } from '@chakra-ui/react';

import { useSelect } from 'hooks';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getOnDemandTestList } from 'store/actions/onDemandTests';

import { SelectOptions } from 'types/global';
import { OnDemandTestType } from 'types/models';

import { Select } from 'components';
import { TestList } from './components';

const sortOptions: SelectOptions[] = [
  {
    value: 'newest',
    label: 'Newest'
  },
  {
    value: 'oldest',
    label: 'Oldest'
  }
];

const OnDemandTestsTabs = () => {
  const dispatch = useAppDispatch();
  const { testList, isLoading } = useAppSelector(
    (state) => state.onDemandTests
  );
  const [tests, setTests] = useState<OnDemandTestType[]>(testList);
  const { selectedOption, onSelect } = useSelect();

  useEffect(() => {
    dispatch(getOnDemandTestList());
  }, [dispatch]);

  useEffect(() => {
    setTests(testList);
  }, [testList]);

  const handleTabsChange = (index: number) => {
    setTests(() => {
      if (!index) {
        return testList;
      }

      if (index === 1) {
        return testList.filter(({ progress }) => !progress);
      }

      return testList.filter(({ progress }) => Boolean(progress));
    });
  };

  if (isLoading) {
    return null;
  }

  return (
    <Tabs my={10} onChange={handleTabsChange} isManual>
      <Flex
        alignItems='center'
        justifyContent='space-between'
        gap='40px 20px'
        wrap='wrap'
      >
        <TabList>
          <Tab>All</Tab>
          <Tab>New</Tab>
          <Tab>In Progress</Tab>
        </TabList>
        <Box width={{ base: '100%', sm: 277 }}>
          <Select
            options={sortOptions}
            defaultValue={selectedOption}
            onChange={onSelect}
            placeholder='Sort by:'
          />
        </Box>
      </Flex>

      <TabPanels mt={10}>
        <TestList tests={tests} />
      </TabPanels>
    </Tabs>
  );
};

export default OnDemandTestsTabs;
