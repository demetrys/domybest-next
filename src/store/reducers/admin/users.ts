import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { GetUserData, User } from 'types/models';

export type UsersStore = {
  isLoading: boolean;
  isMergeLoading: boolean;
  dataLoaded: boolean;
  userList: User[];
  mergeUserList: User[];
  count: number;
  user: User;
};

const initialState: UsersStore = {
  isLoading: false,
  isMergeLoading: false,
  dataLoaded: false,
  userList: [],
  mergeUserList: [],
  count: 0,
  user: {} as User
};

export const usersSlice = createSlice({
  name: 'Admin-Users',
  initialState,
  reducers: {
    toggleLoader: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    toggleMergeLoader: (state, action: PayloadAction<boolean>) => {
      state.isMergeLoading = action.payload;
    },
    loadData: (state) => {
      state.dataLoaded = true;
    },
    receiveUserList: (state, action: PayloadAction<GetUserData>) => {
      state.userList = action.payload.results;
      state.count = action.payload.count;
    },
    receiveUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    receiveMergeUserList: (state, action: PayloadAction<GetUserData>) => {
      state.mergeUserList = action.payload.results;
    }
  }
});

export const {
  toggleLoader,
  loadData,
  receiveUser,
  toggleMergeLoader,
  receiveMergeUserList,
  receiveUserList
} = usersSlice.actions;

export default usersSlice.reducer;
