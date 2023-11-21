import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserSelf } from 'types/models';

export type SelfStore = {
  self: UserSelf;
};

const initialState: SelfStore = {
  self: {} as UserSelf
};

export const userSlice = createSlice({
  name: 'Self',
  initialState,
  reducers: {
    receiveSelfData: (state, action: PayloadAction<UserSelf>) => {
      state.self = action.payload;
    }
  }
});

export const { receiveSelfData } = userSlice.actions;

export default userSlice.reducer;
