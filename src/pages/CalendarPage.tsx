import { DateSelectArg, EventApi, EventClickArg, EventContentArg } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { EditIcon, CrossIcon, DeleteIcon } from '@assets/icon';
import { useEffect, useState } from 'react';
import { ButtonIcon } from '@/components/common/ButtonIcon';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  MapPinned,
  CalendarCheck,
  ChevronDown,
  ChevronUp,
  EllipsisVertical,
  X
} from 'lucide-react';

import { formatDate } from '@/utils';
import { CreateEvent } from '@/components/calendars/PopoverCreateEditEvent';
import { calculatePosition } from '@/utils/caculatePositon';

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
  const [showList, setShowList] = useState(false);
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    const top = 100;
    const left = window.outerWidth / 6;
    const wElement = 530;
    const hElement = 415;
    const xCurElement = selectInfo.jsEvent?.clientX ?? 0;
    const yCurElement = selectInfo.jsEvent?.clientY ?? 0;
    const { xR, yR } = calculatePosition({
      top,
      left,
      wElement,
      hElement,
      xCurElement,
      yCurElement
    });
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
      top: yR,
      left: xR
    });
  };
  const handleEvents = (events: EventApi[]) => {
    setEvents(events);
  };
  const handleEventClick = (clickInfo: EventClickArg) => {
    const top = 100;
    const left = window.outerWidth / 6;
    const wElement = 288;
    const hElement = 222;
    const xCurElement = clickInfo.jsEvent.clientX;
    const yCurElement = clickInfo.jsEvent.clientY;
    const { xR, yR } = calculatePosition({
      top,
      left,
      wElement,
      hElement,
      xCurElement,
      yCurElement
    });
    setEventPopover({
      ...eventPopover,
      event: clickInfo.event,
      top: yR,
      left: xR,
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
  const handleDataDrop = (data: HTMLElement) => {
    return {
      title: data.innerText.trim()
    };
  };

  useEffect(() => {
    const draggableEl = document.getElementById('external-events');
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: '.draggable-item',
        eventData: handleDataDrop
      });
    }
  }, [showList]);

  return (
    <div className='flex h-screen w-full'>
      <div className='flex w-1/6 flex-col mx-1 gap-2'>
        <button
          className='flex px-2 py-1 rounded-lg bg-inherit hover:bg-gray-100 active:bg-gray-200'
          onClick={() => setShowList(!showList)}
        >
          <p className='text-[16px] font-bold'>Mẫu chiếu sáng trong ngày</p>
          {showList ? <ChevronDown /> : <ChevronUp />}
        </button>
        {showList && (
          <div id='external-events' className='draggable-container flex flex-col w-full'>
            <div
              draggable
              className='draggable-item group flex flex-row hover:bg-gray-100 items-center h-10'
            >
              <div className='h-7 w-7 rounded-lg bg-green-500'></div>
              <p className='text-[14px] font-normal truncate'>Chiếu sáng lễ hội</p>
              <div className='flex flex-row-reverse self-end ml-auto'>
                <ButtonIcon
                  icon={<X className='h-6 w-6' color='gray' />}
                  className='hover:bg-gray-200 hidden group-hover:flex'
                />
                <ButtonIcon
                  icon={<EllipsisVertical className='h-6 w-6' color='gray' />}
                  className='hover:bg-gray-200 hidden group-hover:flex'
                />
              </div>
            </div>
            <div
              draggable
              className='draggable-item group flex flex-row hover:bg-gray-100 items-center h-10'
            >
              <div className='h-7 w-7 rounded-lg bg-blue-500'></div>
              <p className='text-[14px] font-normal truncate'>Giờ Trái Đất</p>
              <div className='flex flex-row-reverse self-end ml-auto'>
                <ButtonIcon
                  icon={<X className='h-6 w-6' color='gray' />}
                  className='hover:bg-gray-200 hidden group-hover:flex'
                />
                <ButtonIcon
                  icon={<EllipsisVertical className='h-6 w-6' color='gray' />}
                  className='hover:bg-gray-200 hidden group-hover:flex'
                />
              </div>
            </div>
          </div>
        )}
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
          eventsSet={handleEvents} //This callback will be useful for syncing an external data source with all calendar event data.
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          droppable={true}
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
