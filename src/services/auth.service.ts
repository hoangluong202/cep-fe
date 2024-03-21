import { server, invoke } from './common';

export const authService = {
  login: (loginData: LoginFormData) => invoke(server.post('/auth/login', { body: loginData })),
  logout: () => invoke(server.delete('/auth/logout'))
};
