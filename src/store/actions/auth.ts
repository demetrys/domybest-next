import Router from 'next/router';

import { AppThunk } from 'store';
import authApi from 'store/api/auth';
import { toggleAppLoader } from 'store/reducers/appLoader';
import {
  receiveLoginError,
  receiveMasqueradeRole,
  receiveMasqueradeTokens,
  receiveTokens
} from 'store/reducers/persistAuth';

import { Roles } from 'constants/roles';
import { ROUTES } from 'constants/routes';
import { ResponseError } from 'types/global';
import {
  ChangePasswordTypes,
  ConfirmPasswordTypes,
  ForgotUsername,
  ForgotUsernameError,
  LoginTypes,
  PasswordErrorType
} from 'types/models';

export const userLogin =
  (userData: LoginTypes): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(toggleAppLoader(true));

      const data = await authApi.userLogin(userData);

      dispatch(receiveTokens(data));

      await Router.push(ROUTES.dashboard);
    } catch (error) {
      const message = {
        type: 'auth',
        message: (error as ResponseError).detail || ''
      };
      dispatch(receiveLoginError(message));
    } finally {
      dispatch(toggleAppLoader(false));
    }
  };

export const masqueradeWithUser =
  (id: number, role: Roles): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(toggleAppLoader(true));

      const data = await authApi.masqueradeWithUser(id);

      dispatch(receiveMasqueradeRole(role));
      dispatch(receiveMasqueradeTokens(data));
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(toggleAppLoader(false));
    }
  };

export const confirmPassword =
  (data: ConfirmPasswordTypes): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(toggleAppLoader(true));

      await authApi.confirmPassword(data);
    } catch (error) {
      const e = error as PasswordErrorType;

      if (e.token) {
        throw Error('expired');
      } else {
        const err = Object.keys(e).map((key) => ({
          type: key,
          message: e[key].join(' ') || ''
        }))[0];
        dispatch(receiveLoginError(err));
        throw Error(err.message);
      }
    } finally {
      dispatch(toggleAppLoader(false));
    }
  };

export const changePassword =
  (passwords: ChangePasswordTypes): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(toggleAppLoader(true));

      await authApi.changePassword(passwords);
    } catch (error) {
      const e = error as PasswordErrorType;
      const err = Object.keys(e).map((key) => ({
        type: key,
        message: e[key].join(' ') || ''
      }))[0];
      dispatch(receiveLoginError(err));
      throw Error(err.message);
    } finally {
      dispatch(toggleAppLoader(false));
    }
  };

export const forgotUsername =
  (data: ForgotUsername): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(toggleAppLoader(true));

      await authApi.forgotUsername(data);
    } catch (error) {
      const e = error as ForgotUsernameError;
      throw Error(
        (e.email ? e.email.join(' ') : e.detail) ||
          'Unexpected error. Please try again later!'
      );
    } finally {
      dispatch(toggleAppLoader(false));
    }
  };
