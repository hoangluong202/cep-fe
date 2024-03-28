type SchedulerForm = {
  calendarId?: string;
  area?: string;
  road?: string;
  smartPole?: string;
  startDate: Date;
  endDate?: Date;
  isRepeat: boolean;
  repeatType?: string;
  repeatInterval?: number;
  repeatValue?: number;
  repeatWeekdays?: string[];
};

type Scheduler = SchedulerForm & {
  id: number;
};
