import { UserSelf } from 'types/models';

type GetUsernameArgs = Pick<UserSelf, 'first_name' | 'last_name' | 'username'>;

export const getUsername = ({
  first_name,
  last_name,
  username
}: GetUsernameArgs): string => {
  if (first_name && last_name) {
    return `${first_name} ${last_name}`;
  }

  if (first_name && !last_name) {
    return first_name;
  }

  if (last_name && !first_name) {
    return last_name;
  }

  return username;
};
