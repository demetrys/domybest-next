import { PropsWithChildren } from 'react';
import Latex from 'react-latex-next';

import {
  Box,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';

const CellBox = ({ children }: PropsWithChildren) => (
  <Box p='2px 5px' borderRadius='2px' bg='#f0f0f0'>
    {children}
  </Box>
);

const MathDirectionTable = () => (
  <Stack alignItems='center' textAlign='center' gap={2}>
    <Text>Examples</Text>
    <Table variant='exam'>
      <Thead>
        <Tr>
          <Th>Answer</Th>
          <Th>Acceptable ways to enter answer</Th>
          <Th>Unacceptable: will NOT receive credit</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>3.5</Td>
          <Td>
            <Stack gap={1} display='inline-flex'>
              <CellBox>3.5</CellBox>
              <CellBox>3.50</CellBox>
              <CellBox>7/2</CellBox>
            </Stack>
          </Td>
          <Td>
            <Stack gap={1} display='inline-flex'>
              <CellBox>31/2</CellBox>
              <CellBox>3 1/2</CellBox>
            </Stack>
          </Td>
        </Tr>
        <Tr>
          <Td>
            <Latex>{'$$ \\frac{2}{3} $$'}</Latex>
          </Td>
          <Td>
            <Stack gap={1} display='inline-flex'>
              <CellBox>2/3</CellBox>
              <CellBox>.6666</CellBox>
              <CellBox>.6667</CellBox>
              <CellBox>0.6667</CellBox>
              <CellBox>0.6667</CellBox>
            </Stack>
          </Td>
          <Td>
            <Stack gap={1} display='inline-flex'>
              <CellBox>0.66</CellBox>
              <CellBox>.66</CellBox>
              <CellBox>0.67</CellBox>
              <CellBox>.67</CellBox>
            </Stack>
          </Td>
        </Tr>
        <Tr>
          <Td>
            <Latex>{'$$ -\\frac{1}{3} $$'}</Latex>
          </Td>
          <Td>
            <Stack gap={1} display='inline-flex'>
              <CellBox>-1/3</CellBox>
              <CellBox>-.3333</CellBox>
              <CellBox>-0.333</CellBox>
            </Stack>
          </Td>
          <Td>
            <Stack gap={1} display='inline-flex'>
              <CellBox>-.33</CellBox>
              <CellBox>-0.33</CellBox>
            </Stack>
          </Td>
        </Tr>
      </Tbody>
    </Table>
  </Stack>
);

export default MathDirectionTable;
