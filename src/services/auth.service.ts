import { server, invoke } from './common';

export const authService = {
  login: (loginData: LoginFormData) => {
    return invoke<{ access_token: string }>(server.post('api/auth/login', { ...loginData }));
  },
  logout: () => invoke(server.delete('api/auth/logout'))
};
