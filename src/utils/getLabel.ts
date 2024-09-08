import { TAlarmErrorData, TAlarmStatusData, TAreaData, TPriorityData } from '@/types/alarm';

export const getLabel = (
  key: string,
  data: TAlarmErrorData[] | TAreaData[] | TAlarmStatusData[] | TPriorityData[]
) => {
  const item = data.find((item) => item.key === key);
  return item?.label;
};
