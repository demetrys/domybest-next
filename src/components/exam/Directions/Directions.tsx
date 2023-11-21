import { FiChevronDown } from 'react-icons/fi';

import {
  Box,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  useDisclosure
} from '@chakra-ui/react';

import { SectionType } from 'constants/exam';
import { SectionId } from 'types/global';

import { MathDirection, RWDirection } from 'components/shared';

type DirectionsProps = {
  sectionId: SectionId;
  defaultIsOpen?: boolean;
  gutter?: number;
};

const Directions = ({
  sectionId,
  gutter = 21,
  defaultIsOpen = true
}: DirectionsProps) => {
  const { isOpen, onToggle, onClose } = useDisclosure({ defaultIsOpen });

  return (
    <>
      <Popover
        isOpen={isOpen}
        closeOnBlur={false}
        onClose={onClose}
        returnFocusOnClose={false}
        arrowSize={12}
        gutter={gutter}
      >
        <PopoverTrigger>
          <Button
            variant='link'
            rightIcon={<FiChevronDown size={20} />}
            minH={5}
            mt={1}
            fontWeight={500}
            color='examGray.700'
            letterSpacing='0.8px'
            _hover={{
              textDecoration: 'none'
            }}
            onClick={onToggle}
          >
            Directions
          </Button>
        </PopoverTrigger>
        <PopoverContent
          display='flex'
          flexDirection='column'
          width={900}
          height='70vh'
          borderRadius={0}
          minHeight={500}
          _focusVisible={{
            boxShadow: 'none',
            outline: 'none'
          }}
        >
          <PopoverArrow />
          <PopoverBody
            p={4}
            flexGrow={1}
            height='calc(100% - 76px)'
            overflowY='auto'
          >
            {sectionId === SectionType.rw ? <RWDirection /> : <MathDirection />}
          </PopoverBody>
          <PopoverFooter
            p={4}
            height='76px'
            borderTop='none'
            display='flex'
            justifyContent='flex-end'
          >
            <Button
              bg='examYellow.400'
              color='black'
              minHeight='44px'
              fontSize={16}
              fontWeight={500}
              border='1px solid black'
              _hover={{
                bg: 'examYellow.400'
              }}
              onClick={onClose}
            >
              Close
            </Button>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
      {isOpen && (
        <Box
          position='fixed'
          top={0}
          left={0}
          w='100%'
          h='100vh'
          bgColor='blue.800'
          zIndex={-1}
        />
      )}
    </>
  );
};

export default Directions;
