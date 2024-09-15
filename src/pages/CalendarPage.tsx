import { DateSelectArg, EventApi, EventClickArg, EventContentArg } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { useEffect, useRef } from 'react';
import { PopoverEventCreate } from '@/components';
import { PopoverEventView } from '@/components/calendars/PopoverEventView';
import { useCalendarStore } from '@/states';
import { Template } from '@/components/calendars/Template';
import { useTemplateStore } from '@/states/template.state';

export function CalendarPage() {
  const { setEvents, setEvent } = useCalendarStore();
  const { visibleView } = useTemplateStore();
  const draggableInitialized = useRef(false);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
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

    setEvent({
      visibleCreate: true,
      visibleView: false,
      clickX: selectInfo?.jsEvent?.clientX ?? 0,
      clickY: selectInfo?.jsEvent?.clientY ?? 0,
      data: null
    });
  };
  const handleEvents = (events: EventApi[]) => {
    setEvents(events);
  };
  const handleClickEvent = (clickInfo: EventClickArg) => {
    setEvent({
      visibleCreate: false,
      visibleView: true,
      clickX: clickInfo.jsEvent.clientX,
      clickY: clickInfo.jsEvent.clientY,
      data: clickInfo.event
    });
  };
  const handleDataDrop = (data: HTMLElement) => {
    const template = JSON.parse(data.getAttribute('data-event') ?? '') as TTemplateData;
    return {
      title: template.name,
      color: template.color
    };
  };

  useEffect(() => {
    if (draggableInitialized.current) return;
    const draggableEl = document.getElementById('external-events');
    if (draggableEl && visibleView) {
      new Draggable(draggableEl, {
        itemSelector: '.draggable-item',
        eventData: handleDataDrop
      });
      draggableInitialized.current = true;
    }
  }, [visibleView]);

  return (
    <div className='flex h-screen w-full'>
      <div className='flex w-1/6 flex-col mx-1 gap-2'>
        <Template />
      </div>
      <div className='relative w-5/6 h-screen px-4'>
        <FullCalendar
          height='auto'
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
          eventsSet={handleEvents}
          eventContent={renderEventContent}
          eventClick={handleClickEvent}
          droppable={true}
        />
        <PopoverEventView />
        <PopoverEventCreate />
      </div>
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
  { id: 'hcmut-1', title: 'BK Cơ sở 1' },
  { id: 'hcmut-2', title: 'BK Cơ sở 2' },
  { id: '1', title: 'Sân A3', parentId: 'hcmut-1' },
  { id: '2', title: 'Sân B9', parentId: 'hcmut-1' },
  { id: '3', title: 'Sân H6', parentId: 'hcmut-2' },
  { id: '4', title: 'Sân H1', parentId: 'hcmut-2' },
  { id: '5', title: 'Sân H2', parentId: 'hcmut-2' },
  { id: '6', title: 'Sân H3', parentId: 'hcmut-2' },
  { id: '7', title: 'Sân thể dục', parentId: 'hcmut-2' }
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
