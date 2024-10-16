import { useMutation } from '@tanstack/react-query';
import { locationService } from '@services';

export function useLocation() {
  const createGroup = useMutation({
    mutationKey: ['create-group'],
    mutationFn: ({ areaKey, data }: { areaKey: string; data: CreateGroupData }) =>
      locationService.createGroup(areaKey, data)
  });

  return {
    createGroup: createGroup
  };
}
