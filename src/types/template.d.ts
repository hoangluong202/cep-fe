type TLightSetting = {
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  dimming: number;
};

type TTemplateData = {
  id?: string;
  name: string;
  color: string;
  lightSettings: TLightSetting[];
};

type TemplateStore = {
  visibleView: boolean;
  template: TTemplateData | null;
  templates: TTemplateData[];
  setVisibleView: (visibleView: boolean) => void;
  setTemplate: (template: TTemplateData) => void;
  setTemplates: (templates: TTemplateData[]) => void;
};
