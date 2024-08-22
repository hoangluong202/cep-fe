import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useFilterSmartPoleStore = create<FilterSmartPoleStore>()(
  devtools((set) => ({
    status: 'all',
    area: 'all',
    setArea: (area) => {
      set({ area: area });
    },
    setStatus: (status) => {
      set({ status: status });
    }
  }))
);
