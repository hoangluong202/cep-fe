type MyEvent = {
  id: string;
  title: string;
  color: string;
  start: Date;
  end: Date;
};

type EventPayload = Omit<MyEvent, 'id'>;
