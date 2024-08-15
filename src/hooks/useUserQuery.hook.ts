import { userService } from '@services';
import { useQuery } from '@tanstack/react-query';

export function useUserQuery() {
  // const userId = 1;
  const info = useQuery({
    queryKey: ['/api/users/1'],
    queryFn: () => userService.getInfo(1),
    retry(failureCount, error: ResponseError) {
      if (error.statusCode && error.statusCode >= 400 && error.statusCode < 500) return false;
      return failureCount < 0;
    },
    enabled: false
  });
  console.log('info', info.data);

  return {
    info: info
  };
}
