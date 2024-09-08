export type TAlarmError = 'disconnected' | 'uncontrolled' | 'power-lower' | 'power-higher';
export type TAlarmStatus = 'pending' | 'in-progress' | 'resolved';
export type TPriority = 'low' | 'medium' | 'high';
export type TArea = 'hcmut1' | 'hcmut2';

export type TAlarmErrorData = {
  key: TAlarmError;
  label: string;
};

export type TAreaData = {
  key: TArea;
  label: string;
};

export type TAlarmStatusData = {
  key: TAlarmStatus;
  label: string;
};

export type TPriorityData = {
  key: TPriority;
  label: string;
};

export type TAlarmData = {
  id: string;
  name: string;
  time: string;
  area: string;
  poleId: string;
  errType: TAlarmError;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'resolved';
};
