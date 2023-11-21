import { GetAdminAPIData } from 'types/global';

export type TestFilterOptions = Record<'name' | 'type', string>;
export type StructureFilterOptions = Record<'title' | 'type', string>;
export type EnrollmentsFilterOptions = Record<
  'className' | 'sfId' | 'test',
  string
>;

// API Data
export type GetTestData = GetAdminAPIData<Test>;
export type GetStructureData = GetAdminAPIData<Structure>;

export type Test = {
  created_at: string;
  id: number;
  name: string;
  structure: string;
  config: object;
};

export type Structure = {
  created_at: string;
  file: string;
  id: number;
  status: number;
  structure: string;
  test_type: number;
  title: string;
  user: number;
};

export type CreateTestData = {
  name: string;
  config: string;
  structure: number;
};

export type CreateStructureData = {
  title: string;
  type: number;
  file: File | null;
};
