import { Roles } from 'constants/roles';
import { DefaultDataParams, GetAdminAPIData } from 'types/global';

export type UserSelf = {
  first_name?: string;
  last_name?: string;
  username: string;
  email?: string;
  role: Roles;
};

export type User = Required<UserSelf> & {
  id: number;
  is_active: boolean;
};

export type UsersFilterOptions = Record<
  Extract<keyof User, 'last_name' | 'email' | 'is_active' | 'role'>,
  string
>;

export type UsersSortFields = Extract<
  keyof User,
  'last_name' | 'first_name' | 'email' | 'username'
>;

export type UsersSortOptions = UsersSortFields | `-${UsersSortFields}`;

export type GetUserData = GetAdminAPIData<User>;
export type GetUserDataParams = DefaultDataParams & Partial<UsersFilterOptions>;

export type UpdateUserData = Pick<User, 'role' | 'is_active'>;

export enum UserStatus {
  Blocked = '0',
  Active = '1'
}
