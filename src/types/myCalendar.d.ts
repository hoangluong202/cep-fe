type ConfigLightLevel = {
  start: string;
  end: string;
  level: string;
};

type MyCalendar = {
  id: string;
  name: string;
  color: string;
  configLightLevel: ConfigLightLevel[];
};

type CreateCalendarFormData = Omit<MyCalendar, 'id'>;
