import { useMutation } from '@tanstack/react-query';
import { authService } from '@services';

export function useAuthMutation() {
  const logout = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => authService.logout()
  });
  return {
    logout: logout
  };
}
