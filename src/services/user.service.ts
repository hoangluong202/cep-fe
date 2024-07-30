import { server, invoke } from './common';

export const userService = {
  getInfo: (id: number) => invoke<UserReturnValue>(server.get(`/api/users/${id}`))
};
