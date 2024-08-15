import { create } from 'zustand';
import { MENU_BAR } from '@constants';

export const useMenuBarStore = create<MenuBarStore>()((set) => ({
  selectedMenu: MENU_BAR.map,
  setSelectedMenu: (selectedMenu) => set({ selectedMenu: selectedMenu })
}));
