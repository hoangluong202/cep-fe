import { CalendarCheck, MapPinned } from 'lucide-react';
import { ButtonIcon } from '../common/ButtonIcon';
import { CrossIcon, DeleteIcon, EditIcon } from '../common/icon';
import { DeleteConfirm } from './DeleteConfirm';
import { calculatePosition, formatDate, getLabel } from '@/utils';
import { useCalendarStore } from '@/states';
import { AREA, TEMPLATES } from '@/constants';

export const PopoverEventView = () => {
  const { eventView, resetEventView } = useCalendarStore();
  const { xR, yR } = setUpPosition({ clickX: eventView.clickX, clickY: eventView.clickY });
  const handleClose = () => {
    resetEventView();
  };
  const handleDeleteEvent = () => {
    //TODO: call api to delete event
  };
  const handleEditEvent = () => {
    //TODO: navigate to edit event page
  };
  const resource = eventView.data?.getResources()[0]._resource;

  return (
    eventView.visible && (
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
            style={{
              backgroundColor: getColorTemplate(eventView?.data?.extendedProps?.templateId)
            }}
          ></div>
          <div className='flex flex-col items-start'>
            <p className='text-[22px] font-normal break-words'>{eventView?.data?.title}</p>
            <p className='text-[14px] font-normal break-words'>
              {formatDate({ date: eventView?.data?.start, type: 'start' })}

              {formatDate({ date: eventView?.data?.start, type: 'start' }) ===
                formatDate({ date: eventView?.data?.end, type: 'end' }) || !eventView?.data?.end
                ? ''
                : ` - ${formatDate({ date: eventView?.data?.end, type: 'end' })}`}
            </p>
          </div>
        </div>
        <div className='flex flex-row items-center justify-start gap-1'>
          <MapPinned className='h-5 w-5' />
          <p className='border-2 rounded-lg bg-blue-300 px-1 py-[2px] text-sm ml-1'>
            {resource.parentId ? getLabel(resource.parentId, AREA) : resource.title}
          </p>
          {resource.parentId && (
            <p className='border-2 rounded-lg bg-blue-300 px-1 py-[2px] text-sm'>
              {resource.title}
            </p>
          )}
        </div>
        <div className='flex flex-row items-center justify-start gap-2'>
          <CalendarCheck className='h-5 w-5' />
          <p className='border-2 rounded-lg bg-blue-300 px-1 py-[2px] text-sm'>
            {getLabelTemplate(eventView?.data?.extendedProps?.templateId) ?? '0'}
          </p>
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

const getColorTemplate = (id: string) => {
  const template = TEMPLATES.find((t) => t.id === id);
  return template?.color;
};

const getLabelTemplate = (id: string) => {
  const template = TEMPLATES.find((t) => t.id === id);
  return template?.name;
};
