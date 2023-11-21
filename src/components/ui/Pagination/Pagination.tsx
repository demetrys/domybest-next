import { useMemo } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { Button, Flex, IconButton } from '@chakra-ui/react';

type PaginationProps = {
  page: number;
  count: number;
  onChange: (page: number) => void;
};

const SIBLING_COUNT = 1;

const getRange = (start: number, end: number): number[] => {
  const length = end - start + 1;

  return Array.from({ length }, (_, idx) => idx + start);
};

const Pagination = ({ page, count, onChange }: PaginationProps) => {
  const paginationRange = useMemo<(string | number)[]>(() => {
    const totalPageNumbers = SIBLING_COUNT + 5;

    /*
    	Case 1: Pages less than amount  of pages to be shown with dots.
    */
    if (totalPageNumbers >= count) {
      return getRange(1, count);
    }

    const leftSiblingIndex = Math.max(page - SIBLING_COUNT, 1);
    const rightSiblingIndex = Math.min(page + SIBLING_COUNT, count);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < count - 2;

    const firstPageIndex = 1;
    const lastPageIndex = count;

    /*
    	Case 2: No left dots to show, but right dots to be shown and last one
    */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 2 + 2 * SIBLING_COUNT;
      const leftRange = getRange(1, leftItemCount);

      return [...leftRange, 'DOTS', count];
    }

    /*
    	Case 3: No right dots to show, but left dots to be shown
    */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 2 + 2 * SIBLING_COUNT;
      const rightRange = getRange(count - rightItemCount + 1, count);
      return [firstPageIndex, 'DOTS', ...rightRange];
    }

    /*
    	Case 4: Both left and right dots to be shown
    */
    const middleRange = getRange(leftSiblingIndex, rightSiblingIndex);
    return [firstPageIndex, 'DOTS-1', ...middleRange, 'DOTS-2', lastPageIndex];
  }, [count, page]);

  const handleChange = (clickedPage: number) => () => {
    onChange(clickedPage);
  };

  const handleNextPage = () => {
    onChange(page + 1);
  };

  const handlePrevPage = () => {
    onChange(page - 1);
  };

  const renderPaginationButton = () =>
    paginationRange.map((pageNumber, index) =>
      typeof pageNumber === 'string' ? (
        <Flex
          key={pageNumber}
          width='30px'
          height='30px'
          alignItems='center'
          justifyContent='center'
        >
          ...
        </Flex>
      ) : (
        <Button
          key={pageNumber}
          isActive={page === paginationRange[index]}
          onClick={handleChange(paginationRange[index] as number)}
          sx={{
            p: 0,
            width: '30px',
            height: '30px',
            minHeight: '30px',
            minWidth: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bg: 'transparent',
            color: 'blue.600',
            borderRadius: 4,
            transitionDuration: '0s',
            _hover: {
              bg: 'transparent',
              color: 'blue.700'
            },
            _active: {
              bg: 'blue.700',
              color: 'white'
            }
          }}
        >
          {pageNumber}
        </Button>
      )
    );

  return (
    <Flex gap={1}>
      <IconButton
        aria-label='Previous page'
        icon={<FiChevronLeft />}
        isDisabled={page === 1}
        onClick={handlePrevPage}
        sx={{
          bg: 'transparent',
          color: 'blue.600',
          width: '30px',
          height: '30px',
          minHeight: '30px',
          minWidth: '30px',
          _hover: {
            bg: 'transparent',
            color: 'blue.700'
          }
        }}
      />
      {renderPaginationButton()}
      <IconButton
        aria-label='Next page'
        icon={<FiChevronRight />}
        isDisabled={page === count}
        onClick={handleNextPage}
        sx={{
          bg: 'transparent',
          color: 'blue.600',
          width: '30px',
          height: '30px',
          minHeight: '30px',
          minWidth: '30px',
          _hover: {
            bg: 'transparent',
            color: 'blue.700'
          }
        }}
      />
    </Flex>
  );
};

export default Pagination;
