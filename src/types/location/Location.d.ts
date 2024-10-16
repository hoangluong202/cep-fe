type AreaResponse = {
  id: number;
  areaKey: string;
  areaName: string;
  latitude: number;
  longitude: number;
  groups?: GroupResponse[];
};

type GroupResponse = {
  id: number;
  areaKey: string;
  areaName: string;
  groupKey: string;
  groupName: string;
  latitude: number;
  longitude: number;
};

type CreateGroupData = {
  groupName: string;
  latitude: number;
  longitude: number;
  smartPoleIds: number[];
};
