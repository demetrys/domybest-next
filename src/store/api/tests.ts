import axiosExam from 'utils/axios/exam';

import {
  CreateTestData,
  GetStructureData,
  GetTestData,
  Structure,
  Test
} from 'types/models';

const testsAPI = {
  getTestList() {
    return axiosExam.get<GetTestData>('api/tests/');
  },
  getTestById(id: string) {
    return axiosExam.get<Test>(`api/tests/${id}/`);
  },
  getStructureList() {
    return axiosExam.get<GetStructureData>('api/tests/structures/');
  },
  getStructureById(id: string) {
    return axiosExam.get<Structure>(`api/tests/structures/${id}/`);
  },
  updateTestById(id: string, data: CreateTestData) {
    return axiosExam.put(`api/tests/${id}/`, data);
  },
  createTest(data: CreateTestData) {
    return axiosExam.post('api/tests/', data);
  }
};

export default testsAPI;
