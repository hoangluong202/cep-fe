import { DateSelectArg, EventApi, EventClickArg, EventContentArg } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import interactionPlugin from '@fullcalendar/interaction';
import { EditIcon, CrossIcon, DeleteIcon } from '@assets/icon';
import { useState } from 'react';
import { ButtonIcon } from '@/components/common/ButtonIcon';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { MapPinned, CalendarCheck } from 'lucide-react';

import { formatDate } from '@/utils';
import { CreateEvent } from '@/components/calendars/PopoverCreateEditEvent';

type TEventPopoverState = {
  top: number;
  left: number;
  visibleView: boolean;
  visibleCreate: boolean;
  event: EventApi | null;
};

export function CalendarPage() {
  const [events, setEvents] = useState<EventApi[]>([]);
  const [eventPopover, setEventPopover] = useState<TEventPopoverState>({
    top: 0,
    left: 0,
    visibleView: false,
    visibleCreate: false,
    event: null
  });
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    const midPositionOfScreen = window.innerWidth / 2;
    // const clientY = selectInfo.jsEvent?.clientY ?? 0;
    const clientX = selectInfo.jsEvent?.clientX ?? 0;
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    calendarApi.addEvent({
      id: 'x' + Math.random(),
      resourceId: selectInfo.resource?.id,
      title: 'Tên lịch chiếu',
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: true,
      backgroundColor: 'orange'
    });

    setEventPopover({
      ...eventPopover,
      visibleCreate: true,
      top: 40,
      left: midPositionOfScreen < clientX ? clientX - 400 : clientX
    });
  };
  const handleEvents = (events: EventApi[]) => {
    setEvents(events);
  };
  const handleEventClick = (clickInfo: EventClickArg) => {
    const midPositionOfScreen = window.innerWidth / 2;
    setEventPopover({
      ...eventPopover,
      event: clickInfo.event,
      top: clickInfo.jsEvent.clientY - 80,
      left:
        midPositionOfScreen < clickInfo.jsEvent.clientX
          ? clickInfo.jsEvent.clientX - 400
          : clickInfo.jsEvent.clientX,
      visibleView: true
    });
  };
  const handleCloseViewPopover = () => {
    setEventPopover({
      ...eventPopover,
      visibleView: false,
      event: null
    });
  };
  const handleCloseCreatePopover = () => {
    setEventPopover({
      ...eventPopover,
      visibleCreate: false
    });
  };
  const handleDeleteEvent = () => {
    const event = events.find((event) => event.id === eventPopover.event?.id);
    if (event) {
      event.remove();
    }
    setEventPopover({
      ...eventPopover,
      visibleView: false,
      event: null
    });
  };
  const handleEditEvent = () => {
    setEventPopover({
      ...eventPopover,
      top: 40,
      visibleCreate: true
    });
  };

  return (
    <div className='relative h-screen w-full px-4'>
      <FullCalendar
        schedulerLicenseKey='CC-Attribution-NonCommercial-NoDerivatives'
        plugins={[resourceTimelinePlugin, interactionPlugin]}
        initialView='resourceTimelineMonth'
        resources={resources}
        initialEvents={initialEvents}
        nowIndicator={true}
        resourcesInitiallyExpanded={true}
        initialDate={now}
        resourceAreaWidth='15%'
        buttonText={{
          today: 'Tháng này'
        }}
        editable={true}
        selectable={true}
        select={handleDateSelect}
        eventsSet={handleEvents} //This callback will be useful for syncing an external data source with all calendar event data.
        eventContent={renderEventContent}
        eventClick={handleEventClick}
      />
      {eventPopover.visibleView && (
        <div
          className='flex flex-col gap-y-3 pr-2 pl-6 pt-2 pb-6 absolute w-72 rounded-lg border-2 z-10 bg-white shadow-2xl'
          style={{
            top: `${eventPopover.top}px`,
            left: `${eventPopover.left}px`
          }}
        >
          <div className='flex flex-row-reverse'>
            <ButtonIcon icon={<CrossIcon />} onClick={handleCloseViewPopover} />
            <Dialog>
              <DialogTrigger>
                <ButtonIcon icon={<DeleteIcon />} />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Bạn có chắc chắn muốn xóa sự kiện này?</DialogTitle>
                  <DialogDescription>
                    Hành động này sẽ không thể thu hồi. Sự kiện sẽ được xóa vĩnh viễn.
                  </DialogDescription>
                </DialogHeader>
                <div className='flex justify-end gap-x-2'>
                  <button className='text-red-500' onClick={handleDeleteEvent}>
                    Xóa
                  </button>
                </div>
              </DialogContent>
            </Dialog>
            <ButtonIcon icon={<EditIcon />} onClick={handleEditEvent} />
          </div>
          <div className='flex flex-row justify-items-start justify-start gap-2'>
            <div
              className='rounded-lg w-5 h-5 mt-2'
              style={{ backgroundColor: eventPopover.event?.backgroundColor }}
            ></div>
            <div className='flex flex-col items-start'>
              <p className='text-[22px] font-normal break-words'>{eventPopover.event?.title}</p>
              <p className='text-[14px] font-normal break-words'>
                {formatDate({ date: eventPopover?.event?.start, type: 'start' })} - {''}
                {formatDate({ date: eventPopover?.event?.end, type: 'end' })}
              </p>
            </div>
          </div>
          <div className='flex flex-row justify-items-center justify-start gap-2'>
            <MapPinned className='h-5 w-5' />
            <p className='border-2 rounded-lg bg-blue-300 px-1 py-[2px] text-sm'>Hcmut-1</p>
          </div>
          <div className='flex flex-row justify-items-center justify-start gap-2'>
            <CalendarCheck className='h-5 w-5' />
            <p className='border-2 rounded-lg bg-blue-300 px-1 py-[2px] text-sm'>
              Chiếu sáng lễ hội
            </p>
          </div>
        </div>
      )}
      {eventPopover.visibleCreate && (
        <div
          className='flex flex-row gap-y-3 pr-2 pl-6 pt-2 pb-6 absolute w-[530px] rounded-lg border-2 z-10 bg-white shadow-2xl'
          style={{
            top: `${eventPopover.top}px`,
            left: `${eventPopover.left}px`
          }}
        >
          <CreateEvent />
          <ButtonIcon icon={<CrossIcon />} onClick={handleCloseCreatePopover} />
        </div>
      )}
    </div>
  );
}

const initialEvents = [
  {
    id: '1',
    resourceId: '1',
    title: 'Lễ khai giảng',
    start: '2024-08-24T00:00:00',
    allDay: true,
    end: '2024-08-25T00:00:00',
    backgroundColor: 'blue'
  },
  {
    id: '2',
    resourceId: 'hcmut-1',
    title: 'Quốc Khánh',
    start: '2024-08-30T00:00:00',
    allDay: true,
    end: '2024-09-03T00:00:00',
    backgroundColor: 'green'
  },
  {
    id: '3',
    resourceId: 'hcmut-2',
    title: 'Quốc Khánh',
    start: '2024-08-30T00:00:00',
    allDay: true,
    end: '2024-09-03T00:00:00',
    backgroundColor: 'green'
  },
  {
    id: '4',
    resourceId: '3',
    title: 'Job Fair',
    start: '2024-09-05T00:00:00',
    allDay: true,
    end: '2024-09-06T00:00:00',
    backgroundColor: 'red'
  }
];

const resources = [
  { id: 'hcmut-1', title: 'HCMUT CS1' },
  { id: 'hcmut-2', title: 'HCMUT CS2' },
  { id: '1', title: 'Sảnh trước toà A5', parentId: 'hcmut-1' },
  { id: '2', title: 'Sân đánh tenis', parentId: 'hcmut-1' },
  { id: '3', title: 'Sảnh trước toà H6', parentId: 'hcmut-2' }
];

const now = new Date();

function renderEventContent(eventContent: EventContentArg) {
  return (
    <>
      <b>{eventContent.timeText}</b>
      <i>{eventContent.event.title}</i>
    </>
  );
}
