// eslint-disable-next-line import/no-cycle
import axiosPlatform from 'utils/axios/platform';

import {
  AuthTokens,
  ChangePasswordTypes,
  ConfirmPasswordTypes,
  ForgotUsername,
  LoginTypes,
  UsernameType
} from 'types/models';

const authApi = {
  userLogin(data: LoginTypes) {
    return axiosPlatform.post<AuthTokens>('/auth/jwt/create/', data);
  },
  masqueradeWithUser(id: number) {
    return axiosPlatform.get<AuthTokens>(`/auth/jwt/masquerade/${id}/`);
  },
  refreshTokens(refresh: string) {
    return axiosPlatform.post<AuthTokens>('/auth/jwt/refresh/', { refresh });
  },
  resetPassword(username: UsernameType) {
    return axiosPlatform.post<UsernameType>('/users/password_reset/', username);
  },
  confirmPassword(data: ConfirmPasswordTypes) {
    return axiosPlatform.post<ConfirmPasswordTypes>(
      '/users/password_reset_confirm/',
      data
    );
  },
  changePassword(data: ChangePasswordTypes) {
    return axiosPlatform.post<ChangePasswordTypes>(
      '/users/password_set/',
      data
    );
  },
  forgotUsername(data: ForgotUsername) {
    return axiosPlatform.post('/users/forgot-username/', data);
  }
};

export default authApi;
