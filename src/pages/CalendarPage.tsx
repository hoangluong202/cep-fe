import { DateSelectArg, EventClickArg, EventContentArg } from '@fullcalendar/core';
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
    console.log(clickInfo.event);
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
          // initialEvents={initialEvents}
          events={events}
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
          // eventsSet={handleEvents}
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
const now = new Date();

function renderEventContent(eventContent: EventContentArg) {
  return (
    <>
      <b>{eventContent.timeText}</b>
      <i>{eventContent.event.title}</i>
    </>
  );
}
