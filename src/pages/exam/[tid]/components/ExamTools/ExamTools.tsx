import { useEffect } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import {
  IoCalculator,
  IoCheckboxOutline,
  IoSaveOutline
} from 'react-icons/io5';
import { MdReplay } from 'react-icons/md';
import { TbMath } from 'react-icons/tb';

import {
  Box,
  Button,
  ButtonProps,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  useDisclosure
} from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import {
  openFinishExamModal,
  openModalByType,
  openSaveExamModal
} from 'store/reducers/modal';
import { closeEditor, openEditor } from 'store/reducers/persistAnnotation';

import { ExamMode } from 'constants/exam';
import { QuestionOrder } from 'types/models';

import { DesmosCalculator, DraggableDialog, ReferenceSheet } from 'components';

type ExamToolsProps = {
  step: QuestionOrder;
};

const ExamTools = ({ step }: ExamToolsProps) => {
  const dispatch = useAppDispatch();
  const {
    isPaused,
    mode,
    section: { tools }
  } = useAppSelector((state) => state.examTest);

  const calculatorModal = useDisclosure();
  const referenceModal = useDisclosure();

  useEffect(() => {
    // Close tools modals on exam pause action (only)
    if (isPaused) {
      dispatch(closeEditor());
      calculatorModal.onClose();
      referenceModal.onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused, dispatch]);

  const handleAnnotationEditorOpen = () => {
    dispatch(openEditor());
  };

  const buttonProps: ButtonProps = {
    variant: 'link',
    flexDirection: 'column',
    fontSize: 12,
    fontWeight: 500,
    color: 'examGray.700',
    ml: 4,
    sx: { '& > svg': { mb: 1 } }
  };

  const handleSave = () => {
    dispatch(openSaveExamModal(step));
  };

  const handleFinish = () => {
    dispatch(openFinishExamModal(step));
  };

  const handleRestart = () => {
    dispatch(openModalByType('restartExam'));
  };

  return (
    <>
      {tools?.map((tool) => {
        if (tool === 'calculator') {
          return (
            <Button
              key={tool}
              isDisabled={isPaused}
              {...buttonProps}
              onClick={calculatorModal.onToggle}
            >
              <IoCalculator size={18} />
              Calculator
            </Button>
          );
        }

        if (tool === 'references') {
          return (
            <Button
              key={tool}
              isDisabled={isPaused}
              {...buttonProps}
              onClick={referenceModal.onToggle}
            >
              <TbMath size={18} />
              Reference
            </Button>
          );
        }

        return (
          <Tooltip
            key='selection'
            variant='exam'
            isDisabled={isPaused}
            hasArrow
            label={
              <Box>
                <Text fontWeight={600} textTransform='uppercase'>
                  Make a selection first
                </Text>
                <Text>Select some text, then press annotate</Text>
              </Box>
            }
          >
            <Button
              key={tool}
              {...buttonProps}
              isDisabled={isPaused}
              onClick={handleAnnotationEditorOpen}
            >
              <HiOutlinePencilSquare size={18} />
              Annotate
            </Button>
          </Tooltip>
        );
      })}
      {mode !== ExamMode.test && (
        <Menu variant='exam'>
          <MenuButton
            as={Button}
            {...buttonProps}
            isDisabled={isPaused}
            sx={{
              '& > span': {
                display: 'inherit',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                '& > svg': { mb: 1 }
              }
            }}
          >
            <FiMoreVertical size={18} />
            More
          </MenuButton>
          <MenuList>
            <MenuItem
              icon={<IoCheckboxOutline size={18} />}
              onClick={handleFinish}
            >
              Finish and Score
            </MenuItem>
            <MenuItem icon={<IoSaveOutline size={18} />} onClick={handleSave}>
              Save and Exit
            </MenuItem>
            <MenuItem icon={<MdReplay size={18} />} onClick={handleRestart}>
              Restart Test
            </MenuItem>
          </MenuList>
        </Menu>
      )}

      <DraggableDialog
        isOpen={calculatorModal.isOpen}
        onClose={calculatorModal.onClose}
        title='Calculator'
        spawnPosition='left'
        sizes={{
          collapsed: 'sm',
          expanded: '2xl'
        }}
        calculator
        defaultCollapsed
      >
        <DesmosCalculator />
      </DraggableDialog>

      <DraggableDialog
        isOpen={referenceModal.isOpen}
        onClose={referenceModal.onClose}
        title='Reference Sheet'
        defaultCollapsed
      >
        <ReferenceSheet />
      </DraggableDialog>
    </>
  );
};

export default ExamTools;
