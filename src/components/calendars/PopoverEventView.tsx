import { CalendarCheck, MapPinned } from 'lucide-react';
import { ButtonIcon } from '../common/ButtonIcon';
import { CrossIcon, DeleteIcon, EditIcon } from '../common/icon';
import { DeleteConfirm } from './DeleteConfirm';
import { calculatePosition, formatDate } from '@/utils';
import { useCalendarStore } from '@/states';

export const PopoverEventView = () => {
  const { event, setEvent } = useCalendarStore();
  const { xR, yR } = setUpPosition({ clickX: event.clickX, clickY: event.clickY });
  const handleClose = () => {
    setEvent({ ...event, visibleView: false });
  };
  const handleDeleteEvent = () => {
    //TODO: call api to delete event
  };
  const handleEditEvent = () => {
    //TODO: navigate to edit event page
  };

  return (
    event.visibleView && (
      <div
        className='flex flex-col gap-y-3 pr-2 pl-6 pt-2 pb-6 absolute w-72 rounded-lg border-2 z-10 bg-white shadow-2xl'
        style={{
          top: `${yR}px`,
          left: `${xR}px`
        }}
      >
        <div className='flex flex-row-reverse'>
          <ButtonIcon icon={CrossIcon} onClick={handleClose} />
          <DeleteConfirm name='sự kiện' icon={DeleteIcon} handleDelete={handleDeleteEvent} />
          <ButtonIcon icon={EditIcon} onClick={handleEditEvent} />
        </div>
        <div className='flex flex-row justify-items-start justify-start gap-2'>
          <div
            className='rounded-lg w-5 h-5 mt-2'
            style={{ backgroundColor: event?.data?.backgroundColor }}
          ></div>
          <div className='flex flex-col items-start'>
            <p className='text-[22px] font-normal break-words'>{event?.data?.title}</p>
            <p className='text-[14px] font-normal break-words'>
              {formatDate({ date: event?.data?.start, type: 'start' })} - {''}
              {formatDate({ date: event?.data?.end, type: 'end' })}
            </p>
          </div>
        </div>
        <div className='flex flex-row justify-items-center justify-start gap-2'>
          <MapPinned className='h-5 w-5' />
          <p className='border-2 rounded-lg bg-blue-300 px-1 py-[2px] text-sm'>Hcmut-1</p>
        </div>
        <div className='flex flex-row justify-items-center justify-start gap-2'>
          <CalendarCheck className='h-5 w-5' />
          <p className='border-2 rounded-lg bg-blue-300 px-1 py-[2px] text-sm'>Chiếu sáng lễ hội</p>
        </div>
      </div>
    )
  );
};

const setUpPosition = ({ clickX, clickY }: { clickX: number; clickY: number }) => {
  const top = 100;
  const left = window.outerWidth / 6;
  const wElement = 288;
  const hElement = 222;
  const xCurElement = clickX;
  const yCurElement = clickY;
  const { xR, yR } = calculatePosition({
    top,
    left,
    wElement,
    hElement,
    xCurElement,
    yCurElement
  });
  return { xR, yR };
};
