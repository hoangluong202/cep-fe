import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useFilterSmartPoleStore = create<FilterSmartPoleStore>()(
  devtools((set) => ({
    status: 'all',
    setArea: (area) => {
      set({ area: area });
    },
    setRoad: (road) => {
      set({ road: road });
    },
    setName: (smartPoleName) => {
      set({ name: smartPoleName });
    },
    setStatus: (status) => {
      set({ status: status });
    }
  }))
);
