import { PropsWithChildren, ReactNode } from 'react';

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Text
} from '@chakra-ui/react';

type DialogProps = PropsWithChildren &
  ModalProps & {
    title?: string;
    renderFooter?: () => ReactNode;
  };

const Dialog = ({
  title,
  renderFooter,
  children,
  ...modalProps
}: DialogProps) => (
  <Modal isCentered size='lg' {...modalProps}>
    <ModalOverlay />
    <ModalContent>
      {title && (
        <ModalHeader mb={5}>
          <Text textStyle='big1' color='blue.700'>
            {title}
          </Text>
        </ModalHeader>
      )}
      <ModalCloseButton />
      <ModalBody>{children}</ModalBody>

      {renderFooter && <ModalFooter>{renderFooter()}</ModalFooter>}
    </ModalContent>
  </Modal>
);

export default Dialog;
