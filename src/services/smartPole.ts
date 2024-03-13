import { server, invoke } from './common';

export const smartPoleService = {
  getAll: () => invoke<SmartPole[]>(server.get('/api/poles')),
  getById: (id: string) => invoke<SmartPole>(server.get(`/api/poles/${id}`)),
  getByAreaAndRoad: (area?: string, road?: string) =>
    !area
      ? invoke<SmartPole[]>(server.get('/api/poles'))
      : road
      ? invoke<SmartPole[]>(server.get(`/api/poles?area=${area}&road=${road}`))
      : invoke<SmartPole[]>(server.get(`/api/poles?area=${area}`)),
  getAllAreas: () => invoke<string[]>(server.get('/api/areas')),
  create: (payload: SmartPolePayload) => invoke<SmartPole>(server.post('/api/poles', payload)),
  update: (id: string, payload: SmartPolePayload) =>
    invoke<SmartPole>(server.put(`/api/poles/${id}`, payload)),
  remove: (id: string) => invoke<null>(server.delete(`/api/poles/${id}`))
};
