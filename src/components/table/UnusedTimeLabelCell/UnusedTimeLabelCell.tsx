import { AiOutlineInfoCircle } from 'react-icons/ai';

import {
  Flex,
  IconButton,
  Tooltip,
  useDisclosure,
  useMediaQuery
} from '@chakra-ui/react';

const UnusedTimeLabelCell = () => {
  const [isDesktop] = useMediaQuery('(min-width: 768px)');
  const { isOpen, onOpen, onToggle, onClose } = useDisclosure();

  return (
    <Flex alignItems='center' gap={3}>
      <span>Unused Time</span>
      <Tooltip
        isOpen={isOpen}
        hasArrow
        label='Unused time calculates the minutes/seconds when you are not on a question.'
        placement={isDesktop ? 'right' : 'bottom'}
        bgColor='white'
        maxWidth={isDesktop ? 492 : 315}
        offset={[isDesktop ? 0 : 20, 10]}
      >
        <Flex>
          <IconButton
            aria-label='Unused time tooltip'
            minHeight='auto'
            minWidth='auto'
            bgColor='transparent'
            color='blue.900'
            _hover={{
              bgColor: 'transparent',
              color: 'blue.900'
            }}
            onMouseEnter={onOpen}
            onMouseLeave={onClose}
            onClick={onToggle}
            icon={<AiOutlineInfoCircle size={20} />}
          />
        </Flex>
      </Tooltip>
    </Flex>
  );
};

export default UnusedTimeLabelCell;
