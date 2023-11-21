import { ResponseError } from 'types/global';

export type UsernameType = {
  username: string;
};

export type LoginTypes = UsernameType & {
  password: string;
};

export type NewPassword = {
  new_password: string;
};

export type ResetPasswordTypes = NewPassword & {
  confirmation: string;
};

export type ConfirmPasswordTypes = NewPassword & {
  uid: string;
  token: string;
};

export type ChangePasswordTypes = NewPassword & {
  current_password: string;
};

export type AuthTokens = {
  access: string;
  refresh: string;
  access_expire_at: string;
  refresh_expire_at: string;
};

export type AuthErrorTypes = {
  message: string;
  type: string;
};

export type PasswordErrorType = {
  [key: string]: string[];
};

export type ForgotUsername = {
  email: string;
};

export type ForgotUsernameError = ResponseError & {
  email?: string[];
};
