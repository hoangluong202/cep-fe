import { server, invoke } from './common';

export const authService = {
  login: (loginData: LoginFormData) => {
    console.log('api/auth/login');
    return invoke<TResponseLogin>(server.post('api/auth/login', { ...loginData }));
  },
  me: () => {
    console.log('api/auth/me');
    return invoke(
      server.get('api/auth/me', {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
      })
    );
  },
  logout: () => invoke(server.delete('api/auth/logout'))
};
