import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { GetStructureData, Structure } from 'types/models';

export type StructuresStore = {
  isLoading: boolean;
  structureList: Structure[];
  count: number;
  structure: Structure;
};

const initialState: StructuresStore = {
  isLoading: false,
  structureList: [],
  count: 0,
  structure: {} as Structure
};

export const structuresSlice = createSlice({
  name: 'Admin-Structures',
  initialState,
  reducers: {
    toggleLoader: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    receiveStructureList: (state, action: PayloadAction<GetStructureData>) => {
      state.structureList = action.payload.results;
      state.count = action.payload.count;
    },
    receiveStructure: (state, action: PayloadAction<Structure>) => {
      state.structure = action.payload;
    }
  }
});

export const { receiveStructure, receiveStructureList, toggleLoader } =
  structuresSlice.actions;

export default structuresSlice.reducer;
