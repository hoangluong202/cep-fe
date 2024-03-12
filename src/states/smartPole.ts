import { create } from 'zustand';
import { smartPoleService } from '@services';

export const useSmartPoleStore = create<SmartPoleStore>()((set, get) => ({
  smartPoleStatus: 'UNINIT',
  smartPoles: [],
  smartPoleSelectedById: {
    id: '',
    area: '',
    road: '',
    position: {
      lat: 0,
      lng: 0
    },
    status: false,
    level: 0,
    burningHours: 0,
    frequency: 0
  },
  getAllSmartPoles: async () => {
    set(() => ({ smartPoleStatus: 'PENDING' }));
    try {
      const smartPoles = await smartPoleService.getAll();
      set(() => ({ smartPoles: smartPoles, smartPoleStatus: 'SUCCESS' }));
    } catch (err) {
      set(() => ({ smartPoleStatus: 'REJECT' }));
    }
  },
  getSmartPoleById: async (id) => {
    set(() => ({ smartPoleStatus: 'PENDING' }));
    try {
      const smartPoleSelectedById = await smartPoleService.getById(id);
      set(() => ({ smartPoleSelectedById: smartPoleSelectedById, smartPoleStatus: 'SUCCESS' }));
    } catch (err) {
      set(() => ({ smartPoleStatus: 'REJECT' }));
    }
  },
  getSmartPoleByAreaAndRoad: async (area, road) => {
    set(() => ({ smartPoleStatus: 'PENDING' }));
    try {
      const smartPoles = await smartPoleService.getByAreaAndRoad(area, road);
      set(() => ({ smartPoles: smartPoles, smartPoleStatus: 'SUCCESS' }));
    } catch (err) {
      set(() => ({ smartPoleStatus: 'REJECT' }));
    }
  },
  createSmartPole: async (payload) => {
    set(() => ({ smartPoleStatus: 'PENDING' }));
    try {
      await smartPoleService.create(payload);
      await get().getAllSmartPoles();
      set(() => ({ smartPoleStatus: 'SUCCESS' }));
    } catch (err) {
      set(() => ({ smartPoleStatus: 'REJECT' }));
    }
  },
  updateSmartPole: async (id, payload) => {
    set(() => ({ smartPoleStatus: 'PENDING' }));
    try {
      await smartPoleService.update(id, payload);
      await get().getAllSmartPoles();
      set(() => ({ smartPoleStatus: 'SUCCESS' }));
    } catch (err) {
      set(() => ({ smartPoleStatus: 'REJECT' }));
    }
  },
  removeSmartPole: async (id) => {
    set(() => ({ smartPoleStatus: 'PENDING' }));
    try {
      await smartPoleService.remove(id);
      await get().getAllSmartPoles();
      set(() => ({ smartPoleStatus: 'SUCCESS' }));
    } catch (err) {
      set(() => ({ smartPoleStatus: 'REJECT' }));
    }
  },
  setArea: (area) => {
    set(() => ({ area: area }));
  },
  setRoad: (road) => {
    set(() => ({ road: road }));
  }
}));
