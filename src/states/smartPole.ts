import { create } from 'zustand';
import { smartPoleService } from '@services';

export const useSmartPoleStore = create<SmartPoleStore>()((set, get) => ({
  smartPoleStatus: 'UNINIT',
  areas: [],
  roads: [],
  zoom: 9,
  center: {
    lat: 10.788221571991595,
    lng: 106.7090790252019
  },
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
  setRoads: async (area) => {
    set(() => ({ smartPoleStatus: 'PENDING' }));
    try {
      const roads =
        area === 'HCMUT CS1'
          ? ['Đường 1', 'Đường 2', 'Đường 3', 'Đường 4', 'Đường 5']
          : ['Đường 1', 'Đường 2', 'Đường 3', 'Đường 4', 'Đường 5', 'Đường 6', 'Đường 7'];
      set(() => ({ roads: roads, smartPoleStatus: 'SUCCESS' }));
    } catch (err) {
      set(() => ({ smartPoleStatus: 'REJECT' }));
    }
  },
  setAreas: async () => {
    set(() => ({ smartPoleStatus: 'PENDING' }));
    try {
      const areas = await smartPoleService.getAllAreas();
      console.log('Check api areas', areas);
      set(() => ({ areas: areas, smartPoleStatus: 'SUCCESS' }));
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
  },
  setZoom: (zoom) => {
    set(() => ({ zoom: zoom }));
  },
  setCenter: (center) => {
    set(() => ({ center: center }));
  }
}));
