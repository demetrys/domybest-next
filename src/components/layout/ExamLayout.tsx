import { ReactNode, useEffect } from 'react';

import { css, Global } from '@emotion/react';
import { Box, Flex } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getSelfData } from 'store/actions/user';
import { clearExamInfo } from 'store/reducers/exam';

import { ExamMobilePopup } from './components';

type LayoutProps = {
  children: ReactNode;
};

const ExamLayout = ({ children }: LayoutProps) => {
  const dispatch = useAppDispatch();
  const { self } = useAppSelector((state) => state.self);

  useEffect(() => {
    if (!self.username) {
      dispatch(getSelfData());
    }
    return () => {
      // clear all exam data on exit
      dispatch(clearExamInfo());
    };
  }, [dispatch, self.username]);

  return (
    <>
      <Box
        w='100%'
        h='100%'
        sx={{
          display: 'none',
          '@media screen and (min-width: 1024px) and (min-height: 700px)': {
            display: 'block'
          }
        }}
      >
        <Global
          styles={css`
            html,
            body {
              width: 100%;
              height: 100%;
              background: #fff;
              font-family: var(--chakra-fonts-exam);
              font-size: 16px;
              line-height: 1.2;
            }
          `}
        />
        <Flex
          position='absolute'
          left={0}
          right={0}
          top={0}
          bottom={0}
          flexDirection='column'
          justifyContent='space-between'
          overflow='hidden'
          zIndex={0}
        >
          {children}
        </Flex>
      </Box>
      <ExamMobilePopup />
    </>
  );
};

export default ExamLayout;
