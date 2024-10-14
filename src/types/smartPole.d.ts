export type Position = {
  lat: number;
  lng: number;
};

export type PairLocation = {
  start: Position;
  end: Position;
};

export type TPoleData = {
  id: string;
  areaKey: string;
  position: Position;
  status: boolean;
  dimming: number;
  burningDuration: number;
  frequency: number;
  groupKey?: string;
  current?: number;
  voltage?: number;
  power?: number;
  color?: string;
};
