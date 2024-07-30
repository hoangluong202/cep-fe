import { server, invoke } from './common';

export const smartPoleService = {
  getById: (id: string) => invoke<SmartPole>(server.get(`/api/poles/${id}`)),
  getBy: (area?: string, road?: string, name?: string) => {
    const id = name?.split('-')[1];
    return !area
      ? invoke<SmartPole[]>(server.get('/api/poles'))
      : !road
      ? invoke<SmartPole[]>(server.get(`/api/poles?area=${area}`))
      : !name
      ? invoke<SmartPole[]>(server.get(`/api/poles?area=${area}&road=${road}`))
      : invoke<SmartPole[]>(server.get(`/api/poles?area=${area}&road=${road}&poleId=${id}`));
  },
  getAllAreas: async () => {
    const poles = await invoke<SmartPole[]>(server.get('/api/poles'));
    const areas = poles.map((pole) => pole.area);
    return [...new Set(areas)];
  },
  getRoadsByArea: async (area?: string) => {
    const poles = await invoke<SmartPole[]>(server.get(`/api/poles?area=${area}`));
    const roads = poles.map((pole) => pole.road);
    return [...new Set(roads)];
  },
  getSmartPoleNameByAreaAndRoad: async (area?: string, road?: string) => {
    const poles = await invoke<SmartPole[]>(server.get(`/api/poles?area=${area}&road=${road}`));
    const smartPoleNames = poles.map((pole) => 'Pole-' + pole.id);
    return [...new Set(smartPoleNames)];
  }
};
