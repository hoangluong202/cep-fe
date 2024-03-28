import { invoke, server } from './common';

export const schedulerService = {
  create: (scheduler: SchedulerForm) => invoke(server.post('api/schedulers', scheduler))
};
