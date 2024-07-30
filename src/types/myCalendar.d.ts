type ConfigLightLevel = {
  startHour: string;
  endHour: string;
  lightLevel: string;
};

type MyCalendar = {
  id: string;
  name: string;
  color: string;
  configLightLevel: ConfigLightLevel[];
};

type CreateCalendarFormData = Omit<MyCalendar, 'id'>;
