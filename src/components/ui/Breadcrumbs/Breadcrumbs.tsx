import { GoChevronRight } from 'react-icons/go';

import { Link } from '@chakra-ui/next-js';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink
} from '@chakra-ui/react';

type BreadcrumbsProps = {
  nav: { title: string; path?: string }[];
};
const Breadcrumbs = ({ nav }: BreadcrumbsProps) => (
  <Box my={{ base: 5, md: '30px' }}>
    <Breadcrumb separator={<GoChevronRight />}>
      {nav.map(({ title, path }) => {
        const props = path
          ? {
              as: Link,
              href: path
            }
          : {};

        return (
          <BreadcrumbItem key={title} isCurrentPage={!path}>
            <BreadcrumbLink {...props}>{title}</BreadcrumbLink>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  </Box>
);

export default Breadcrumbs;
