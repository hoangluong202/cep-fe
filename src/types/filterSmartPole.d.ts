type FilterSmartPoleStore = {
  center: TPoint;
  zoom: number;
  areaSelected?: string;
  groupSelected?: string;
  statusSelected?: string;
  setCenter: (center: TPoint) => void;
  setZoom: (zoom: number) => void;
  resetZoom: () => void;
  setAreaSelected: (area?: string) => void;
  setGroupSelected: (group?: string) => void;
  setStatusSelected: (status?: string) => void;
};

type TPoint = {
  lat: number;
  lng: number;
};
