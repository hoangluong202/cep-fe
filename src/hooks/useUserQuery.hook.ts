import { userService } from '@services';
import { useQuery } from '@tanstack/react-query';

export function useUserQuery() {
  const userId = 1;
  const info = useQuery({
    queryKey: [`/api/users/${userId}'`],
    queryFn: () => userService.getInfo(userId),
    retry(failureCount, error: ResponseError) {
      if (error.statusCode && error.statusCode >= 400 && error.statusCode < 500) return false;
      return failureCount < 0;
    },
    enabled: false
  });

  return {
    info: info
  };
}
