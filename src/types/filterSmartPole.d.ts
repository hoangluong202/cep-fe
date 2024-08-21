type FilterSmartPoleStore = {
  area?: string;
  road?: string;
  name?: string;
  status?: string;
  setArea: (area?: string) => void;
  setRoad: (road?: string) => void;
  setName: (name?: string) => void;
  setStatus: (status?: string) => void;
};
