type TimeFragment = {
  startHour: number;
  endHour: number;
  lightLevel: number;
};

type MyCalendar = {
  id: string;
  name: string;
  color: string;
  elements: TimeFragment[];
};

type MyCalendarPayload = Omit<MyCalendar, 'id'>;
