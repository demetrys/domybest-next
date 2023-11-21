import { ReactNode } from 'react';

import { Flex, Grid, GridItem, Stack, Text } from '@chakra-ui/react';

import { TestLabel } from 'components/test';
import { Progress } from 'components/ui';

type TestBannerProps = {
  title: string;
  progress?: number;
  labels?: { title: string; icon?: ReactNode }[];
  renderActions?: () => ReactNode;
};

const TestBanner = ({
  title,
  progress,
  labels,
  renderActions
}: TestBannerProps) => (
  <Grid
    minHeight={{ base: 343, sm: 232 }}
    borderRadius={20}
    bg='blue.700'
    gridTemplateRows='1fr auto'
    mb={10}
  >
    <GridItem px={{ base: 4, md: 10 }} py='60px'>
      <Stack justifyContent='center' h='100%' alignItems='flex-start'>
        <Text as='h1' textStyle='h1' color='white'>
          {title}
        </Text>
        {renderActions && (
          <Flex gap={3} mt='30px'>
            {renderActions()}
          </Flex>
        )}
      </Stack>
    </GridItem>
    <GridItem px={{ base: 4, md: 10 }} py={5} bg='whiteAlpha.100'>
      <Flex
        justifyContent='space-between'
        alignItems='center'
        wrap='wrap'
        gap={3}
      >
        {progress && <Progress variant='alternative' value={progress} />}
        {Boolean(labels?.length) && (
          <Flex gap={3} wrap='wrap'>
            {labels?.map(({ title: labelTitle, icon }) => (
              <TestLabel
                key={labelTitle}
                color='white'
                bg='whiteAlpha.100'
                icon={icon}
              >
                {labelTitle}
              </TestLabel>
            ))}
          </Flex>
        )}
      </Flex>
    </GridItem>
  </Grid>
);

export default TestBanner;
