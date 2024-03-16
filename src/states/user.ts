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
      console.log('Call API GET USER DATA', userData);
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
