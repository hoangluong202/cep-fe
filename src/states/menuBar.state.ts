import { create } from 'zustand';
import { MENU_BAR_NAME } from '@constants';

export const useMenuBarStore = create<MenuBarStore>()((set) => ({
  selectedMenu: MENU_BAR_NAME.map,
  setSelectedMenu: (selectedMenu) => set({ selectedMenu: selectedMenu })
}));
