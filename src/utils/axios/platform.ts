import axios, { AxiosError } from 'axios';

// eslint-disable-next-line import/no-cycle
import { store } from 'store';

import { ResponseError } from 'types/global';

const axiosPlatform = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PLATFORM_API_URL
});

axiosPlatform.interceptors.request.use(
  (config) => {
    const { access } = store.getState().persistAuth.user;
    const { access: masqueradeAccess } =
      store.getState().persistAuth.masqueradeUser;

    const currentAccess = masqueradeAccess || access;

    if (currentAccess) {
      config.headers.Authorization = `JWT ${currentAccess}`;
    }
    // to serialize multiple query param as `id: ['1', '2']` to 'id=1&id=2'
    config.paramsSerializer = {
      indexes: null
    };
    return config;
  },
  (error) => error.statusCode
);

axiosPlatform.interceptors.response.use(
  (res) => res.data,
  (err: AxiosError<ResponseError>) => {
    if (err.response?.status === 429) {
      const error: ResponseError = {
        detail: 'THROTTLE'
      };

      return Promise.reject(error);
    }

    if (err.response?.status === 404) {
      const error: ResponseError = {
        detail: 'Not found'
      };

      return Promise.reject(error);
    }

    if (err.response?.data) {
      return Promise.reject(err.response.data);
    }

    const error: ResponseError = {
      code: 'request_error',
      detail: 'Request failed'
    };

    return Promise.reject(error);
  }
);

export default axiosPlatform;
