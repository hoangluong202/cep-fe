import { create } from 'zustand';
import { MENU_ITEMS } from '@constants';

export const useMenuBarStore = create<MenuBarStore>()((set) => ({
  selectedMenu: MENU_ITEMS.find((item) => item.key === 'dashboard')?.label ?? '',
  setSelectedMenu: (selectedMenu) => set({ selectedMenu: selectedMenu })
}));
