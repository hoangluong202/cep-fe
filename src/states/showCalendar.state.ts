import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useIsShowCalendar = create<{
  isShowCalendar: boolean;
  setIsShowCalendar: (status: boolean) => void;
}>()(
  devtools((set) => ({
    isShowCalendar: true,
    setIsShowCalendar: (status) => {
      set({ isShowCalendar: status });
    }
  }))
);
