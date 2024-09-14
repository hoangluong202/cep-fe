import {
  TAlarmErrorData,
  TAlarmStatusData,
  TAreaData,
  TGroupData,
  TLightStatusData,
  TPriorityData
} from '@/types/alarm';

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

export const GROUP: TGroupData[] = [
  {
    area: 'hcmut1',
    key: 'a3',
    label: 'Sân A3'
  },
  {
    area: 'hcmut1',
    key: 'a5',
    label: 'Sân A5'
  },
  {
    area: 'hcmut2',
    key: 'h1',
    label: 'Sân H1'
  },
  {
    area: 'hcmut2',
    key: 'h6',
    label: 'Sân H6'
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

export const LIGHT_STATUS: TLightStatusData[] = [
  {
    key: 'all',
    label: 'Tất cả'
  },
  {
    key: 'on',
    label: 'Đang bật'
  },
  {
    key: 'off',
    label: 'Đang tắt'
  }
];
