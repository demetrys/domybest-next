import axios, { AxiosError } from 'axios';

import { store } from 'store';

import { ResponseError } from 'types/global';

const axiosExam = axios.create({
  baseURL: process.env.NEXT_PUBLIC_EXAM_API_URL
});

axiosExam.interceptors.request.use(
  (config) => {
    const { access } = store.getState().persistAuth.user;
    const { access: masqueradeAccess } =
      store.getState().persistAuth.masqueradeUser;

    const currentAccess = masqueradeAccess || access;

    if (currentAccess) {
      config.headers.Authorization = `JWT ${currentAccess}`;
    }
    return config;
  },
  (error) => error.statusCode
);

axiosExam.interceptors.response.use(
  (res) => res.data,
  (err: AxiosError<ResponseError>) => {
    const error: ResponseError = err.response?.data || {
      code: 'request_error',
      detail: 'Request failed'
    };

    return Promise.reject(error);
  }
);

export default axiosExam;
