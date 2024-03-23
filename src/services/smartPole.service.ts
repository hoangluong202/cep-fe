import { server, invoke } from './common';

export const smartPoleService = {
  getAll: () => invoke<SmartPole[]>(server.get('/api/poles')),
  getById: (id: string) => invoke<SmartPole>(server.get(`/api/poles/${id}`)),
  getBy: (area?: string, road?: string, id?: string) =>
    !area
      ? invoke<SmartPole[]>(server.get('/api/poles'))
      : !road
      ? invoke<SmartPole[]>(server.get(`/api/poles?area=${area}`))
      : !id
      ? invoke<SmartPole[]>(server.get(`/api/poles?area=${area}&road=${road}`))
      : invoke<SmartPole[]>(server.get(`/api/poles?area=${area}&road=${road}&id=${id}`)),
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
  },
  create: (payload: SmartPolePayload) => invoke<SmartPole>(server.post('/api/poles', payload)),
  update: (id: string, payload: SmartPolePayload) =>
    invoke<SmartPole>(server.put(`/api/poles/${id}`, payload)),
  remove: (id: string) => invoke<null>(server.delete(`/api/poles/${id}`))
};
