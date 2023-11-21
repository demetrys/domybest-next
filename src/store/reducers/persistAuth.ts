import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Roles } from 'constants/roles';
import { AuthErrorTypes, AuthTokens } from 'types/models';

type UserAuthInfo = {
  access: string;
  refresh: string;
  accessExpireAt: number | null;
  refreshExpireAt: number | null;
  role: Roles | null;
};

const initialUserAuthInfo: UserAuthInfo = {
  access: '',
  refresh: '',
  accessExpireAt: null,
  refreshExpireAt: null,
  role: null
};

export type AuthStore = {
  isLoading: boolean;
  error: AuthErrorTypes;
  isAuthorized: boolean;
  user: UserAuthInfo;
  masqueradeUser: UserAuthInfo;
};

const initialState: AuthStore = {
  isLoading: false,
  error: {} as AuthErrorTypes,
  isAuthorized: false,
  user: initialUserAuthInfo,
  masqueradeUser: initialUserAuthInfo
};

export const authSlice = createSlice({
  name: 'persistAuth',
  initialState,
  reducers: {
    toggleLoader: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    receiveLoginError: (state, action: PayloadAction<AuthErrorTypes>) => {
      state.error = action.payload;
    },
    receiveTokens: (state, { payload }: PayloadAction<AuthTokens>) => {
      state.user.access = payload.access;
      state.user.refresh = payload.refresh;
      state.user.accessExpireAt = Number(payload.access_expire_at);
      state.user.refreshExpireAt = Number(payload.refresh_expire_at);
      state.isAuthorized = true;
    },
    receiveMasqueradeTokens: (
      state,
      { payload }: PayloadAction<AuthTokens>
    ) => {
      state.masqueradeUser.access = payload.access;
      state.masqueradeUser.refresh = payload.refresh;
      state.masqueradeUser.accessExpireAt = Number(payload.access_expire_at);
      state.masqueradeUser.refreshExpireAt = Number(payload.refresh_expire_at);
    },
    receiveRole: (state, action: PayloadAction<Roles>) => {
      state.user.role = action.payload;
    },
    receiveMasqueradeRole: (state, action: PayloadAction<Roles>) => {
      state.masqueradeUser.role = action.payload;
    },
    unmasquerade: (state) => {
      state.masqueradeUser = initialUserAuthInfo;
    },
    logout: (state) => {
      state.user = initialUserAuthInfo;
      state.isAuthorized = false;
    }
  }
});

export const {
  toggleLoader,
  receiveLoginError,
  receiveTokens,
  receiveMasqueradeTokens,
  receiveRole,
  receiveMasqueradeRole,
  logout,
  unmasquerade
} = authSlice.actions;

export default authSlice.reducer;
