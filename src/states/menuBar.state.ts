import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { MAIN_MENU } from '@constants';

export const useMenuBarStore = create<MenuBarStore>()(
  devtools((set) => ({
    selectedMenu: MAIN_MENU.map,
    setSelectedMenu: (selectedMenu) => {
      set({ selectedMenu: selectedMenu });
    }
  }))
);
