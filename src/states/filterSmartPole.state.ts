import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useFilterSmartPoleStore = create<FilterSmartPoleStore>()(
  devtools((set) => ({
    center: { lat: 10.880852145509786, lng: 106.80538147754153 },
    zoom: 17,
    areaSelected: 'hcmut2',
    statusSelected: 'all',
    setCenter: (center) => {
      set({ center });
    },
    setZoom: (zoom) => {
      set({ zoom });
    },
    resetZoom: () => {
      set({ zoom: 17 });
    },
    setAreaSelected: (area) => {
      set({ areaSelected: area });
    },
    setGroupSelected: (group) => {
      set({ groupSelected: group });
    },
    setStatusSelected: (status) => {
      set({ statusSelected: status });
    }
  }))
);
