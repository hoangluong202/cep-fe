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

export const TEMPLATES: TTemplateData[] = [
  {
    id: '1',
    name: 'Giờ Trái Đất',
    color: '#f34523',
    lightSettings: [
      {
        startTime: '18:00',
        endTime: '22:00',
        dimming: 0
      }
    ]
  },
  {
    id: '2',
    name: 'Giải bóng đá toàn trường',
    color: '#163728',
    lightSettings: [
      {
        startTime: '17:00',
        endTime: '19:00',
        dimming: 80
      }
    ]
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
    key: 'b9',
    label: 'Sân B9'
  },
  {
    area: 'hcmut2',
    key: 'h1',
    label: 'Sân H1'
  },
  {
    area: 'hcmut2',
    key: 'h2',
    label: 'Sân H2'
  },
  {
    area: 'hcmut2',
    key: 'h3',
    label: 'Sân H3'
  },
  {
    area: 'hcmut2',
    key: 'h6',
    label: 'Sân H6'
  },
  {
    area: 'hcmut2',
    key: 'td',
    label: 'Sân thể dục'
  }
];

export const RESOURCES: Resource[] = [
  { id: 'hcmut1', title: 'BK Cơ sở 1', parentId: '' },
  { id: 'hcmut2', title: 'BK Cơ sở 2', parentId: '' },
  { id: 'a3', title: 'Sân A3', parentId: 'hcmut1' },
  { id: 'b9', title: 'Sân B9', parentId: 'hcmut1' },
  { id: 'h6', title: 'Sân H6', parentId: 'hcmut2' },
  { id: 'h1', title: 'Sân H1', parentId: 'hcmut2' },
  { id: 'h2', title: 'Sân H2', parentId: 'hcmut2' },
  { id: 'h3', title: 'Sân H3', parentId: 'hcmut2' },
  { id: 'td', title: 'Sân thể dục', parentId: 'hcmut2' }
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
