import { server, invoke } from './common';

export const userService = {
  getInfo: (id: number) => {
    console.log('api/users/:id');
    return invoke<UserReturnValue>(
      server.get(`/api/users/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
      })
    );
  }
};
