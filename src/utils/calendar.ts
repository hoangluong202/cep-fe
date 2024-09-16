import { RESOURCES } from '@/constants';

export const getByResourceId = (
  resourceId: string
): {
  areaKey: string;
  areaLabel: string;
  groupKey?: string;
  groupLabel?: string;
} => {
  const resources = RESOURCES;
  const item = resources.find((item) => item.id === resourceId);
  if (item?.parentId === '')
    return {
      areaKey: item.id,
      areaLabel: item.title,
      groupKey: '',
      groupLabel: ''
    };
  else {
    const parentItem = resources.find((i) => i.id === item?.parentId);
    return {
      areaKey: parentItem?.id ?? '',
      areaLabel: parentItem?.title ?? '',
      groupKey: item?.id,
      groupLabel: item?.title
    };
  }
};
