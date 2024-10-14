import { TPoleData } from '@/types/smartPole';
import { server, invoke } from './common';

type TSmartPoleResponse = {
  data: TPoleData[];
  hasNextPage: boolean;
};

export const smartPoleService = {
  getById: (id: string) => invoke<TPoleData>(server.get(`/api/smartpoles/${id}`)),
  getMany: async (
    filters?: { areaKey?: string; groupKey?: string; status?: boolean },
    paginate?: {
      page?: number;
      limit?: number;
    },
    sorts?: {
      orderBy?: string;
      order?: 'asc' | 'desc';
    }[]
  ) => {
    const res = await invoke<TSmartPoleResponse>(
      server.get(`/api/smartpoles`, {
        params: {
          filters: JSON.stringify(filters),
          paginate: JSON.stringify(paginate),
          sorts: JSON.stringify(sorts)
        }
      })
    );
    res.data.forEach((pole) => {
      pole.position = {
        lat: parseFloat(pole.position.lat.toString()),
        lng: parseFloat(pole.position.lng.toString())
      };
    });
    return res;
  }
};
