import { TAlarmErrorData, TAlarmStatusData, TAreaData, TPriorityData } from '@/types/alarm';

export const AREA: TAreaData[] = [
  {
    key: 'hcmut1',
    label: 'BK Cơ sở 1'
  },
  {
    key: 'hcmut2',
    label: 'BK Cơ sở 2'
  }
];

export const ALARM_ERROR: TAlarmErrorData[] = [
  {
    key: 'disconnected',
    label: 'Mất kết nối'
  },
  {
    key: 'uncontrolled',
    label: 'Chiếu sáng sai lệch'
  },
  {
    key: 'power-lower',
    label: 'Điện áp thấp'
  },
  {
    key: 'power-higher',
    label: 'Điện áp vượt mức'
  }
];

export const PRIORITY: TPriorityData[] = [
  {
    key: 'low',
    label: 'Thấp'
  },
  {
    key: 'medium',
    label: 'Trung bình'
  },
  {
    key: 'high',
    label: 'Cao'
  }
];

export const ALARM_STATUS: TAlarmStatusData[] = [
  {
    key: 'pending',
    label: 'Chờ xử lý'
  },
  {
    key: 'in-progress',
    label: 'Đang xử lý'
  },
  {
    key: 'resolved',
    label: 'Đã xử lý'
  }
];
