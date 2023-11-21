import { MouseEvent, useEffect, useRef } from 'react';
import { Recogito } from '@recogito/recogito-js';

import { Box } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import {
  AnnotationType,
  closeEditor,
  closeTooltip,
  openEditor,
  openTooltipById,
  receiveAnnotation,
  removeAnnotationById
} from 'store/reducers/persistAnnotation';

import { AnnotationTooltip } from './components';
import styles from './styles';

type AnnotationWrapperProps = {
  children: string;
  type: AnnotationType;
  questionId: string;
};

const ALLOW_EMPTY = true;

const AnnotationWrapper = ({
  type,
  questionId,
  children
}: AnnotationWrapperProps) => {
  const dispatch = useAppDispatch();
  const { annotations, editorOpen } = useAppSelector(
    (state) => state.persistAnnotation
  );

  const contentRef = useRef<HTMLDivElement>(null);

  const passageRecogito = useRef<Recogito | null>(null);
  const questionRecogito = useRef<Recogito | null>(null);

  useEffect(() => {
    if (type === 'question') {
      if (contentRef.current && !questionRecogito.current) {
        questionRecogito.current = new Recogito({
          content: contentRef.current,
          allowEmpty: ALLOW_EMPTY
        });
      }

      if (questionRecogito.current) {
        const passageAnnotations = annotations[type];
        const filteredAnnotations = passageAnnotations.filter(
          (anno) => anno.questionId === questionId
        );
        questionRecogito.current.setAnnotations(filteredAnnotations);

        questionRecogito.current.on('createAnnotation', (anno) => {
          dispatch(
            receiveAnnotation({ annotation: { ...anno, questionId }, type })
          );
          dispatch(closeEditor());
        });
        questionRecogito.current.on('updateAnnotation', (anno) => {
          dispatch(
            receiveAnnotation({ annotation: { ...anno, questionId }, type })
          );
          dispatch(closeEditor());
        });
        questionRecogito.current.on('deleteAnnotation', (anno) => {
          dispatch(removeAnnotationById({ id: anno.id, type }));
          dispatch(closeEditor());
        });
        questionRecogito.current.on('selectAnnotation', () => {
          dispatch(openEditor());
        });
      }
    } else {
      if (contentRef.current && !passageRecogito.current) {
        passageRecogito.current = new Recogito({
          content: contentRef.current,
          allowEmpty: ALLOW_EMPTY
        });
      }

      if (passageRecogito.current) {
        const passageAnnotations = annotations[type];
        const filteredAnnotations = passageAnnotations.filter(
          (anno) => anno.questionId === questionId
        );
        passageRecogito.current.setAnnotations(filteredAnnotations);

        passageRecogito.current.on('createAnnotation', (anno) => {
          dispatch(
            receiveAnnotation({ annotation: { ...anno, questionId }, type })
          );
          dispatch(closeEditor());
        });
        passageRecogito.current.on('updateAnnotation', (anno) => {
          dispatch(
            receiveAnnotation({ annotation: { ...anno, questionId }, type })
          );
          dispatch(closeEditor());
        });
        passageRecogito.current.on('deleteAnnotation', (anno) => {
          dispatch(removeAnnotationById({ id: anno.id, type }));
          dispatch(closeEditor());
        });
        passageRecogito.current.on('selectAnnotation', () => {
          dispatch(openEditor());
        });
      }
    }
  }, [annotations, dispatch, type, questionId]);

  const handleMouseOver = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    if (target.classList.contains('r6o-annotation')) {
      const parent = target.offsetParent as HTMLDivElement;
      const parentRect = parent.getBoundingClientRect();
      const parentOffsetLeft = parentRect.left;
      const parentOffsetTop = parentRect.top;

      const targetOffsetLeft = target.offsetLeft;
      const targetOffsetTop = target.offsetTop;

      const offset = {
        left: parentOffsetLeft + targetOffsetLeft,
        top: parentOffsetTop + targetOffsetTop
      };
      const id = target.dataset.id || '';

      const data = {
        id,
        offset
      };
      dispatch(openTooltipById(data));
    }
  };

  const handleMouseOut = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    if (target.classList.contains('r6o-annotation')) {
      dispatch(closeTooltip());
    }
  };

  const handleMouseUp = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const selection = window.getSelection();
    if (
      selection?.isCollapsed &&
      editorOpen &&
      !target.classList.contains('r6o-annotation')
    ) {
      dispatch(closeEditor());
    }
  };

  return (
    <Box
      className={editorOpen ? 'open-editor' : ''}
      sx={styles}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <div
        role='none'
        className='content'
        ref={contentRef}
        dangerouslySetInnerHTML={{ __html: children }}
        onMouseUp={handleMouseUp}
      />
      <AnnotationTooltip type={type} />
    </Box>
  );
};

export default AnnotationWrapper;
