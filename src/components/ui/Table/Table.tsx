import { BiSolidChevronDown } from 'react-icons/bi';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  OnChangeFn,
  RowSelectionState,
  SortingState,
  useReactTable
} from '@tanstack/react-table';

import {
  Box,
  Flex,
  IconButton,
  SystemStyleObject,
  Table as TableElement,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';

type TableProps<T> = {
  data: T[];
  // The official doc
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[];
  variant?: string;
  sx?: SystemStyleObject;
  loading?: boolean;
  selectedRows?: RowSelectionState;
  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;
  onRowSelection?: OnChangeFn<RowSelectionState>;
  getRowId?: (row: T, index: number) => string;
};

const Table = <T extends object>({
  data,
  columns,
  variant,
  sx,
  loading,
  selectedRows,
  sorting,
  onSortingChange,
  onRowSelection,
  getRowId
}: TableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection: selectedRows,
      sorting
    },
    onRowSelectionChange: onRowSelection,
    onSortingChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowId
  });

  const footerRow = table.getFooterGroups()[0];
  const isFooterExist = footerRow.headers.some(
    ({
      column: {
        columnDef: { footer }
      }
    }) => Boolean(footer)
  );

  return (
    <Box overflowX='auto' pb={2.5} mr={-4} pr={4}>
      <TableElement sx={sx} variant={variant}>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => {
            const isHeaderGroupExist = headerGroup.headers.every(
              ({
                column: {
                  columnDef: { meta }
                }
              }) => meta !== 'hide'
            );

            if (isHeaderGroupExist) {
              return (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const canSort =
                      Boolean(sorting) && header.column.getCanSort();

                    const content = header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        );
                    const desc = header.column.getIsSorted() === 'desc';

                    return (
                      <Th key={header.id}>
                        {canSort ? (
                          <Flex
                            justifyContent='space-between'
                            alignItems='center'
                          >
                            <Text as='span'>{content}</Text>
                            <IconButton
                              minWidth={5}
                              minHeight={5}
                              ml={2}
                              bg='transparent'
                              aria-label='sort by first_name'
                              alignItems='flex-start'
                              icon={<BiSolidChevronDown size={18} />}
                              _active={{ bg: 'transparent' }}
                              onClick={header.column.getToggleSortingHandler()}
                              sx={{
                                '& > svg': {
                                  transform: `rotate(${desc ? '180deg' : 0})`
                                }
                              }}
                            />
                          </Flex>
                        ) : (
                          content
                        )}
                      </Th>
                    );
                  })}
                </Tr>
              );
            }

            return null;
          })}
        </Thead>
        <Tbody className={loading ? 'loading' : ''}>
          {!data.length && (
            <Tr>
              <Td
                height={20}
                textAlign='center'
                fontSize={16}
                fontWeight={500}
                colSpan={columns.length}
              >
                No data found
              </Td>
            </Tr>
          )}
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
        {isFooterExist && (
          <Tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <Tr key={footerGroup.id}>
                {footerGroup.headers.map((header, index) =>
                  index === 1 ? null : (
                    <Th key={header.id} colSpan={index ? 1 : 2}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.footer,
                            header.getContext()
                          )}
                    </Th>
                  )
                )}
              </Tr>
            ))}
          </Tfoot>
        )}
      </TableElement>
    </Box>
  );
};

export default Table;
