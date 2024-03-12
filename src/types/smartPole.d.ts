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
};

type SmartPolePayload = Omit<SmartPole, 'id'>;

type SmartPoleStore = {
  smartPoleStatus: StoreStatus;
  area?: string;
  road?: string;
  smartPoles: SmartPole[];
  smartPoleSelectedById: SmartPole;
  getAllSmartPoles: () => Promise<void>;
  getSmartPoleById: (id: string) => Promise<void>;
  getSmartPoleByAreaAndRoad: (area?: string, road?: string) => Promise<void>;
  createSmartPole: (payload: SmartPolePayload) => Promise<void>;
  updateSmartPole: (id: string, payload: SmartPolePayload) => Promise<void>;
  removeSmartPole: (id: string) => Promise<void>;
  setArea: (area?: string) => void;
  setRoad: (road?: string) => void;
};
