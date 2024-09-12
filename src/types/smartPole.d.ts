export type Position = {
  lat: number;
  lng: number;
};

export type PairLocation = {
  start: Position;
  end: Position;
};

export type SmartPole = {
  id: string;
  area: string;
  position: Position;
  status: boolean;
  level: number;
  burningHours: number;
  frequency: number;
  group?: string;
  current?: number;
  voltage?: number;
  power?: number;
  color?: string;
};
