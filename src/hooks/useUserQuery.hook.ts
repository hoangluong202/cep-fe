import { userService } from '@services';
import { useQuery } from '@tanstack/react-query';

export function useUserQuery() {
  const info = useQuery({
    queryKey: ['/api/user'],
    queryFn: () => userService.getInfo(),
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
