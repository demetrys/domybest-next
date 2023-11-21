import { PropsWithChildren, ReactNode } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

import {
  Box,
  Menu as ChakraMenu,
  MenuButton,
  MenuList
} from '@chakra-ui/react';

type MenuProps = PropsWithChildren & {
  width?: number | string;
  colorScheme?: 'white' | 'blue';
  variant?: 'solid' | 'outline';
  open?: {
    text?: string;
    icon?: ReactNode;
  };
  close?: {
    text?: string;
    icon?: ReactNode;
  };
};

const Menu = ({
  width,
  open,
  close,
  variant = 'solid',
  colorScheme = 'blue',
  children
}: MenuProps) => {
  const renderMenuContent = (isOpen: boolean) => {
    const openText = open?.text || 'Open';
    const closeText = close?.text || 'Close';
    const openIcon = open?.icon || <FiChevronDown />;
    const closeIcon = close?.icon || <FiChevronUp />;

    return (
      <>
        <MenuButton
          borderBottomLeftRadius={isOpen ? 0 : 20}
          borderBottomRightRadius={isOpen ? 0 : 20}
        >
          {isOpen ? closeText : openText}
          {isOpen ? closeIcon : openIcon}
        </MenuButton>
        <MenuList>{children}</MenuList>
      </>
    );
  };

  return (
    <Box width={width || '100%'}>
      <ChakraMenu
        matchWidth
        gutter={0}
        autoSelect={false}
        colorScheme={colorScheme}
        variant={variant}
      >
        {({ isOpen }) => renderMenuContent(isOpen)}
      </ChakraMenu>
    </Box>
  );
};

export default Menu;
