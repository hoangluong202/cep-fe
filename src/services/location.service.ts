import { invoke, server } from './common';

export const locationService = {
  getAllAreas: () => {
    console.log('/api/locations/areas');
    return invoke<AreaResponse[]>(server.get('/api/locations/areas'));
  },
  getGroupsByArea: (areaKey?: string) => {
    console.log('/api/locations/areas/' + areaKey + '/groups');
    return invoke<GroupResponse[]>(server.get(`/api/locations/areas/${areaKey}/groups`));
  },
  getAreaByKey: (areaKey?: string) => {
    console.log('/api/locations/areas/' + areaKey);
    return invoke<AreaResponse>(server.get(`/api/locations/areas/${areaKey}`));
  }
};
