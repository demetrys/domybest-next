import { AppThunk } from 'store';
import usersAPI from 'store/api/user';
import {
  loadData,
  receiveMergeUserList,
  receiveUser,
  receiveUserList,
  toggleLoader,
  toggleMergeLoader
} from 'store/reducers/admin/users';
import { toggleAppLoader } from 'store/reducers/appLoader';
import {
  openErrorNotification,
  openSuccessNotification
} from 'store/reducers/notification';
import { logout, receiveRole } from 'store/reducers/persistAuth';
import { receiveSelfData } from 'store/reducers/self';

import { GetUserDataParams, UpdateUserData } from 'types/models';

export const getSelfData = (): AppThunk => async (dispatch) => {
  try {
    dispatch(toggleAppLoader(true));
    const data = await usersAPI.getSelfData();
    dispatch(receiveRole(data.role));
    dispatch(receiveSelfData(data));
  } catch (error) {
    dispatch(logout());
    dispatch(openErrorNotification('User not found.'));
  } finally {
    dispatch(toggleAppLoader(false));
  }
};

export const getUserList =
  (params: GetUserDataParams): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(toggleLoader(true));

      const data = await usersAPI.getUserList(params);

      dispatch(receiveUserList(data));
    } catch (error) {
      console.error(error);
    } finally {
      const { dataLoaded } = getState().users;
      dispatch(toggleLoader(false));
      if (!dataLoaded) {
        dispatch(loadData());
      }
    }
  };

export const getMergeUserList =
  (users: string[]): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(toggleMergeLoader(true));

      const data = await usersAPI.getUserList({ id: users });

      dispatch(receiveMergeUserList(data));
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(toggleMergeLoader(false));
    }
  };

export const getUser =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(toggleLoader(true));

      const data = await usersAPI.getUserById(id);

      dispatch(receiveUser(data));
    } catch (error) {
      dispatch(openErrorNotification('User not found'));
    } finally {
      dispatch(toggleLoader(false));
    }
  };

export const changeUserPassword =
  (id: string, password: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(toggleAppLoader(true));

      await usersAPI.changeUserPassword(id, password);

      dispatch(
        openSuccessNotification('The password was successfully updated')
      );
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(toggleAppLoader(false));
    }
  };

export const updateUser =
  (id: string, data: UpdateUserData): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(toggleAppLoader(true));

      const updatedData = await usersAPI.updateUser(id, data);

      dispatch(receiveUser(updatedData));
      dispatch(openSuccessNotification('The user was successfully updated'));
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(toggleAppLoader(false));
    }
  };
