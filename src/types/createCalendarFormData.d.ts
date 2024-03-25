type ConfigLightLevel = {
  start: string;
  end: string;
  level: string;
};

type CreateCalendarFormData = {
  name: string;
  color: string;
  configLightLevel: ConfigLightLevel[];
};
