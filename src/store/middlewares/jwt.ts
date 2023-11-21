import { Middleware } from '@reduxjs/toolkit';

import checkTokensExpiration from 'utils/checkTokensExpiration';

// eslint-disable-next-line import/no-cycle
import authAPI from '../api/auth';
import { logout, receiveTokens } from '../reducers/persistAuth';

const jwtMiddleware: Middleware =
  ({ getState }) =>
  (dispatch) =>
  async (action) => {
    const isFunction = typeof action === 'function';

    // Only for async actions
    if (isFunction) {
      const {
        isAuthorized,
        user: { refresh, accessExpireAt, refreshExpireAt },
        masqueradeUser
      } = getState().persistAuth;
      // Check the user session expiration and call the new refresh token
      if (isAuthorized) {
        // Check the masquerade session
        if (masqueradeUser.access) {
          const { isAccessExpired, isRefreshExpired } = checkTokensExpiration(
            masqueradeUser.accessExpireAt,
            masqueradeUser.refreshExpireAt
          );
          // Finish any session if any masqueraded token is expired
          if (isAccessExpired || isRefreshExpired) {
            dispatch(logout());
          }
        }

        const { isAccessExpired, isRefreshExpired } = checkTokensExpiration(
          accessExpireAt,
          refreshExpireAt
        );

        if (isRefreshExpired) {
          dispatch(logout());
        }

        if (isAccessExpired) {
          try {
            const response = await authAPI.refreshTokens(refresh);
            dispatch(receiveTokens(response));
          } catch (error) {
            return dispatch(logout());
          }
        }
      }
    }

    return dispatch(action);
  };
export default jwtMiddleware;
