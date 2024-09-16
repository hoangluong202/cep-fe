type Resource = {
  id: string;
  title: string;
  parentId: string;
};

type ExternalEventApi = {
  resourceId: string;
  templateId: string;
};

type EventStore = {
  visible: boolean;
  clickX: number;
  clickY: number;
  data: (EventApi & ExternalEventApi) | null;
};

type CalendarStore = {
  events: EventApi[];
  eventView: EventStore;
  eventCreate: EventStore;
  setEvents: (events: EventApi[]) => void;
  setEventView: ({ visible, data }: EventStore) => void;
  resetEventView: () => void;
  setEventCreate: ({ visible, data }: EventStore) => void;
  resetEventCreate: () => void;
};
