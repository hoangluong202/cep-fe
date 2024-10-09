import { useMutation, useQuery } from '@tanstack/react-query';
import { authService } from '@services';

export function useAuth() {
  const login = useMutation({
    mutationKey: ['login'],
    mutationFn: (data: LoginFormData) => authService.login(data)
  });

  const me = useQuery({
    queryKey: ['me'],
    queryFn: () => authService.me(),
    enabled: false
  });

  const logout = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => authService.logout()
  });

  return {
    login: login,
    me: me,
    logout: logout
  };
}
