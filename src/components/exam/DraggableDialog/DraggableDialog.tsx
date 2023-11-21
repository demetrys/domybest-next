import { PropsWithChildren, useState } from 'react';
import Draggable from 'react-draggable';

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalProps,
  Stack,
  Text
} from '@chakra-ui/react';

import { CollapseButton, DragDots } from './components';

type ChakraResponsiveWidth =
  | 'xl'
  | 'sm'
  | 'md'
  | 'lg'
  | '2xl'
  | 'xs'
  | '3xl'
  | '4xl'
  | '5xl';

type DraggableDialogProps = PropsWithChildren &
  ModalProps & {
    title: string;
    sizes?: {
      collapsed: ChakraResponsiveWidth;
      expanded: ChakraResponsiveWidth;
    };
    calculator?: boolean;
    spawnPosition?: 'right' | 'left';
    defaultCollapsed?: boolean;
  };

const DraggableDialog = ({
  title,
  sizes,
  calculator,
  children,
  spawnPosition = 'right',
  defaultCollapsed = false,
  ...modalProps
}: DraggableDialogProps) => {
  const [collapsed, setCollapsed] = useState<boolean>(defaultCollapsed);

  const handleCollapseToggle = () => {
    setCollapsed((prevState) => !prevState);
  };

  return (
    <Modal
      variant='drag'
      blockScrollOnMount={false}
      scrollBehavior='inside'
      {...modalProps}
    >
      <Draggable handle='header'>
        <Stack
          width={
            collapsed ? sizes?.collapsed || 'xl' : sizes?.expanded || '5xl'
          }
          gap={0}
          border='1px solid black'
          height='80vh'
          minHeight={calculator ? 500 : 'initial'}
          bg='white'
          boxShadow='0 5px 50px 5px rgba(0, 0, 0, 0.5)'
          sx={{
            position: 'absolute',
            m: 0,
            top: '90px',
            ...(spawnPosition === 'left' ? { left: 2 } : { right: 2 })
          }}
        >
          <ModalHeader position='relative'>
            <Text color='white' as='span' textStyle='exam-lg'>
              {title}
            </Text>
            <CollapseButton
              collapsed={collapsed}
              onClick={handleCollapseToggle}
            />
            <ModalCloseButton />
            <DragDots />
          </ModalHeader>
          <ModalBody
            p={calculator ? 0 : 4}
            maxHeight={calculator ? 'initial' : 'calc(80vh - 45px)'}
            mt={calculator && !collapsed ? '-46px' : 0}
          >
            {children}
          </ModalBody>
        </Stack>
      </Draggable>
    </Modal>
  );
};

export default DraggableDialog;
