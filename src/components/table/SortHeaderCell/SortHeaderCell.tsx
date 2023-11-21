import { PropsWithChildren } from 'react';
import { BiSolidChevronDown } from 'react-icons/bi';

import { Flex, IconButton, Text } from '@chakra-ui/react';

type SortHeaderCellProps = PropsWithChildren & {
  onSort: () => void;
  isDescending: boolean;
};

const SortHeaderCell = ({
  isDescending,
  onSort,
  children
}: SortHeaderCellProps) => (
  <Flex justifyContent='space-between'>
    <Text>{children}</Text>
    <IconButton
      minWidth={5}
      minHeight={5}
      bg='transparent'
      aria-label='sort by first_name'
      alignItems='flex-start'
      icon={<BiSolidChevronDown size={18} />}
      _active={{ bg: 'transparent' }}
      onClick={onSort}
      sx={{
        '& > svg': {
          transform: `rotate(${isDescending ? '180deg' : 0})`
        }
      }}
    />
  </Flex>
);

export default SortHeaderCell;
