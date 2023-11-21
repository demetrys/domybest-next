import axiosPlatform from 'utils/axios/platform';
import { removeEmptyParams } from 'utils/params';

import { DATA_LIMIT } from 'constants/global';
import {
  GetUserData,
  GetUserDataParams,
  UpdateUserData,
  User,
  UserSelf
} from 'types/models';

const usersAPI = {
  getSelfData() {
    return axiosPlatform.get<UserSelf>('/users/me/');
  },
  getUserList(params: GetUserDataParams) {
    const nonEmptyParams = removeEmptyParams(params);

    return axiosPlatform.get<GetUserData>('/api/users/', {
      params: {
        limit: params.limit || DATA_LIMIT,
        ...nonEmptyParams
      }
    });
  },
  getUserById(id: string) {
    return axiosPlatform.get<User>(`/api/users/${id}/`);
  },
  changeUserPassword(id: string, password: string) {
    return axiosPlatform.post(`/api/users/${id}/set_password/`, {
      new_password: password
    });
  },
  updateUser(id: string, data: UpdateUserData) {
    return axiosPlatform.patch<User>(`/api/users/${id}/`, data);
  }
};

export default usersAPI;
