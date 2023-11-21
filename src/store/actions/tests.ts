import Router from 'next/router';

import { AppThunk } from 'store';
import testsAPI from 'store/api/tests';
import {
  receiveStructure,
  receiveStructureList,
  toggleLoader as toggleStructuresLoader
} from 'store/reducers/admin/structures';
import {
  receiveTest,
  receiveTestList,
  toggleLoader as toggleTestsLoader
} from 'store/reducers/admin/tests';
import { toggleAppLoader } from 'store/reducers/appLoader';
import { openErrorNotification } from 'store/reducers/notification';

import { ROUTES } from 'constants/routes';
import { CreateTestData } from 'types/models';

export const getTestList = (): AppThunk => async (dispatch) => {
  try {
    dispatch(toggleTestsLoader(true));

    const data = await testsAPI.getTestList();

    dispatch(receiveTestList(data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(toggleTestsLoader(false));
  }
};

export const getTest =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(toggleTestsLoader(true));

      const data = await testsAPI.getTestById(id);

      dispatch(receiveTest(data));
    } catch (error) {
      dispatch(openErrorNotification('Test not found'));
    } finally {
      dispatch(toggleTestsLoader(false));
    }
  };

export const getStructureList = (): AppThunk => async (dispatch) => {
  try {
    dispatch(toggleStructuresLoader(true));

    const data = await testsAPI.getStructureList();

    dispatch(receiveStructureList(data));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(toggleStructuresLoader(false));
  }
};

export const getStructure =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(toggleStructuresLoader(true));

      const data = await testsAPI.getStructureById(id);

      dispatch(receiveStructure(data));
    } catch (error) {
      dispatch(openErrorNotification('Test Structure not found'));
    } finally {
      dispatch(toggleStructuresLoader(false));
    }
  };

export const updateTest =
  (id: string, data: CreateTestData): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(toggleAppLoader(true));

      await testsAPI.updateTestById(id, data);
      await Router.push(ROUTES.tests);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(toggleAppLoader(false));
    }
  };

export const createTest =
  (data: CreateTestData): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(toggleAppLoader(true));

      await testsAPI.createTest(data);
      await Router.push(ROUTES.tests);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(toggleAppLoader(false));
    }
  };
