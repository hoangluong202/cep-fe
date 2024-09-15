type TEventPopoverState = {
  top: number;
  left: number;
  visibleView: boolean;
  visibleCreate: boolean;
  event: EventApi | null;
};

type EventStore = {
  visibleCreate: boolean;
  visibleView: boolean;
  clickX: number;
  clickY: number;
  data: EventApi | null;
};

type CalendarStore = {
  events: EventApi[];
  event: EventStore;
  setEvents: (events: EventApi[]) => void;
  setEvent: ({ visibleCreate, visibleView, data }: EventStore) => void;
};
