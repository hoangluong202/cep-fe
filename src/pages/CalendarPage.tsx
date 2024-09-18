import {
  DateSelectArg,
  EventClickArg,
  EventContentArg
  // NowIndicatorContentArg
} from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { useEffect, useRef } from 'react';
import { PopoverEventCreate } from '@/components';
import { PopoverEventView } from '@/components/calendars/PopoverEventView';
import { useCalendarStore } from '@/states';
import { Template } from '@/components/calendars/Template';
import { useTemplateStore } from '@/states/template.state';
import { RESOURCES } from '@/constants';

export function CalendarPage() {
  const { events, setEventView, resetEventView, setEventCreate } = useCalendarStore();
  const { visibleView } = useTemplateStore();
  const draggableInitialized = useRef(false);
  const calendarRef = useRef(null);
  const resources = RESOURCES;

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    resetEventView();
    setEventCreate({
      visible: true,
      clickX: selectInfo?.jsEvent?.clientX ?? 0,
      clickY: selectInfo?.jsEvent?.clientY ?? 0,
      data: {
        resourceId: selectInfo.resource?.id,
        start: selectInfo.start,
        end: selectInfo.end,
        allDay: true
      }
    });
  };

  const handleClickEvent = (clickInfo: EventClickArg) => {
    setEventView({
      visible: true,
      clickX: clickInfo.jsEvent.clientX,
      clickY: clickInfo.jsEvent.clientY,
      data: clickInfo.event
    });
  };
  const handleDataDrop = (data: HTMLElement) => {
    const template = JSON.parse(data.getAttribute('data-event') ?? '') as TTemplateData;
    return {
      title: template.name,
      color: template.color,
      templateId: template.id
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

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = (calendarRef.current as FullCalendar).getApi();
      calendarApi.changeView('resourceTimelineMonth');
    }
  }, []);

  return (
    <div className='flex h-screen w-full'>
      <div className='flex w-1/6 flex-col mx-1 gap-2'>
        <Template />
      </div>
      <div className='relative w-5/6 h-screen px-4'>
        <FullCalendar
          ref={calendarRef}
          height='auto'
          schedulerLicenseKey='CC-Attribution-NonCommercial-NoDerivatives'
          plugins={[resourceTimelinePlugin, interactionPlugin]}
          initialView='resourceTimelineDay'
          resources={resources}
          events={events}
          nowIndicator={true}
          now={now}
          resourcesInitiallyExpanded={true}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'resourceTimelineWeek,resourceTimelineMonth'
          }}
          views={{
            resourceTimelineMonth: {
              type: 'resourceTimeline',
              duration: { months: 1 },
              slotDuration: { days: 1 },
              slotLabelFormat: { weekday: 'short', day: 'numeric' }
            },
            resourceTimelineWeek: {
              type: 'resourceTimeline',
              duration: { weeks: 1 },
              slotDuration: { days: 1 },
              slotLabelFormat: { weekday: 'short', day: 'numeric' }
            }
          }}
          buttonText={{
            today: 'Hôm nay',
            month: 'Tháng',
            week: 'Tuần'
          }}
          resourceAreaWidth='15%'
          editable={true}
          selectable={true}
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleClickEvent}
          droppable={true}
          scrollTime={{ days: now.getDate() > 15 ? 10 : 0 }}
        />
        <PopoverEventView />
        <PopoverEventCreate />
      </div>
    </div>
  );
}
const now = new Date();

function renderEventContent(eventContent: EventContentArg) {
  return (
    <>
      <i>{eventContent.event.title}</i>
    </>
  );
}
