import { create } from 'zustand';
import { userService } from '@services';

export const useUserStore = create<UserStore>()((set) => ({
  userStatus: 'UNINIT',
  userData: {
    id: '',
    username: ''
  },
  getUserData: async () => {
    set(() => ({ userStatus: 'PENDING' }));
    try {
      const userData = await userService.getInfo();
      console.log('Check api getInfo', userData);
      set(() => ({ userData: userData, userStatus: 'SUCCESS' }));
    } catch (err) {
      set(() => ({ userStatus: 'REJECT' }));
    }
  },
  logout: () => {
    set(() => ({
      userStatus: 'REJECT',
      userData: {
        id: '',
        username: ''
      }
    }));
  }
}));
