import { Annotation } from '@recogito/recogito-js';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TooltipOffset = {
  left: number;
  top: number;
};

export type AnnotationType = 'passage' | 'question';

export type AnnotationStore = {
  annotations: {
    [key in AnnotationType]: Annotation[];
  };
  tooltip: {
    open: boolean;
    id: string | null;
    offset: TooltipOffset;
  };
  editorOpen: boolean;
};

const initialState: AnnotationStore = {
  annotations: {
    passage: [],
    question: []
  },
  tooltip: {
    open: false,
    id: null,
    offset: {
      left: 0,
      top: 0
    }
  },
  editorOpen: false
};

export const annotationSlice = createSlice({
  name: 'persistAnnotation',
  initialState,
  reducers: {
    receiveAnnotation: (
      state,
      {
        payload: { annotation, type }
      }: PayloadAction<{ annotation: Annotation; type: AnnotationType }>
    ) => {
      const filtered = state.annotations[type].filter(
        ({ id }) => id !== annotation.id
      );
      state.annotations[type] = [...filtered, annotation];
    },
    clearAnnotations: (state) => {
      state.annotations.passage = [];
      state.annotations.question = [];
    },
    removeAnnotationById: (
      state,
      {
        payload: { id, type }
      }: PayloadAction<{ id: string; type: AnnotationType }>
    ) => {
      state.annotations[type] = state.annotations[type].filter(
        (item) => item.id !== id
      );
    },
    openTooltipById: (
      state,
      { payload }: PayloadAction<{ id: string; offset: TooltipOffset }>
    ) => {
      state.tooltip.open = true;
      state.tooltip.id = payload.id;
      state.tooltip.offset = payload.offset;
    },
    closeTooltip: (state) => {
      state.tooltip.open = false;
      state.tooltip.id = null;
      state.tooltip.offset = { top: 0, left: 0 };
    },
    openEditor: (state) => {
      state.editorOpen = true;
    },
    closeEditor: (state) => {
      state.editorOpen = false;
    }
  }
});

export const {
  receiveAnnotation,
  clearAnnotations,
  openTooltipById,
  closeTooltip,
  removeAnnotationById,
  openEditor,
  closeEditor
} = annotationSlice.actions;

export default annotationSlice.reducer;
