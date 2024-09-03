type Position = {
  lat: number;
  lng: number;
};

type SmartPole = {
  id: string;
  area: string;
  road: string;
  position: Position;
  status: boolean;
  level: number;
  burningHours: number;
  frequency: number;
  color?: string;
};
