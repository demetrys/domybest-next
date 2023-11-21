import { ReactNode } from 'react';

import { Center, Flex, Stack, Text } from '@chakra-ui/react';

import Circle from 'assets/icons/reference/circle.svg';
import Cone from 'assets/icons/reference/cone.svg';
import Cylinder from 'assets/icons/reference/cylinder.svg';
import Parallelepiped from 'assets/icons/reference/parallelepiped.svg';
import Pyramid from 'assets/icons/reference/pyramid.svg';
import Rectangle from 'assets/icons/reference/rectangle.svg';
import RightTriangle from 'assets/icons/reference/right-triangle.svg';
import SpecialRightTriangle1 from 'assets/icons/reference/special-right-triangle1.svg';
import SpecialRightTriangle2 from 'assets/icons/reference/special-right-triangle2.svg';
import Sphere from 'assets/icons/reference/sphere.svg';
import Triangle from 'assets/icons/reference/triangle.svg';

type ShapeData = {
  title: string;
  Icon: ReactNode;
  visibleTitle?: boolean;
};

type ReferenceData = {
  shapes: ShapeData[];
  rules: string[];
};

const data: ReferenceData = {
  shapes: [
    {
      title: 'Circle',
      Icon: <Circle />
    },
    {
      title: 'Rectangle',
      Icon: <Rectangle />
    },
    {
      title: 'Triangle',
      Icon: <Triangle />
    },
    {
      title: 'Right Triangle',
      Icon: <RightTriangle />
    },
    {
      title: 'Special Right Triangles',
      Icon: (
        <Flex width='100%' height='100%'>
          <Center width='50%' height='100%' sx={{ '& > svg': { width: 100 } }}>
            <SpecialRightTriangle1 />
          </Center>
          <Center width='50%' height='100%' sx={{ '& > svg': { width: 100 } }}>
            <SpecialRightTriangle2 />
          </Center>
        </Flex>
      ),
      visibleTitle: true
    },
    {
      title: 'Parallelepiped',
      Icon: <Parallelepiped />
    },
    {
      title: 'Cylinder',
      Icon: <Cylinder />
    },
    {
      title: 'Sphere',
      Icon: <Sphere />
    },
    {
      title: 'Cone',
      Icon: <Cone />
    },
    {
      title: 'Pyramid',
      Icon: <Pyramid />
    }
  ],
  rules: [
    'The number of degrees of arc in a circle is 360.',
    'The number of radians of arc in a circle is 2π.',
    'The sum of the measures in degrees of the angles of a triangle is 180.'
  ]
};

const ReferenceSheet = () => (
  <Stack>
    <Flex wrap='wrap' rowGap={8} mb={5} pr={170}>
      {data.shapes.map(({ title, Icon, visibleTitle }) => (
        <Stack key={title} width={visibleTitle ? 320 : 160}>
          <Center width='100%' height='100%' sx={{ '& > svg': { width: 100 } }}>
            {Icon}
          </Center>
          {visibleTitle && (
            <Text textAlign='center' color='black' fontWeight={600}>
              {title}
            </Text>
          )}
        </Stack>
      ))}
    </Flex>
    <Stack spacing={4} pl={2} textStyle='exam-content-lg'>
      {data.rules.map((rule) => (
        <Text key={rule} color='black'>
          {rule}
        </Text>
      ))}
    </Stack>
  </Stack>
);

export default ReferenceSheet;
