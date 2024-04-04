import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useIsShow = create<{
  isShowCalendar: boolean;
  isShowSchedulerForm: boolean;
  setIsShowCalendar: (status: boolean) => void;
  setIsShowSchedulerForm: (status: boolean) => void;
}>()(
  devtools((set) => ({
    isShowCalendar: true,
    isShowSchedulerForm: false,
    setIsShowCalendar: (status) => {
      set({ isShowCalendar: status });
    },
    setIsShowSchedulerForm: (status) => {
      set({ isShowSchedulerForm: status });
    }
  }))
);
