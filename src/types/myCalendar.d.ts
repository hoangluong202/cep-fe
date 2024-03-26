type ConfigLightLevel = {
  start: string;
  end: string;
  level: string;
};

type MyCalendar = {
  id: number;
  name: string;
  color: string;
  configLightLevel: ConfigLightLevel[];
};

type CreateCalendarFormData = Omit<MyCalendar, 'id'>;
