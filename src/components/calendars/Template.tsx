import { Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ButtonIcon, Separator } from '@/components';
import { DeleteConfirm } from '@/components/calendars/DeleteConfirm';
import { useCalendarStore } from '@/states';
import { TEMPLATES } from '@/constants';

const templates = TEMPLATES;

export const Template = () => {
  const { eventView, setEventView } = useCalendarStore();

  const navigate = useNavigate();
  const handleViewTemplate = (templateId?: string) => {
    navigate('templates/' + templateId);
  };
  const handleCreateTemplate = () => {
    navigate('templates/create');
  };
  const handleDeleteTemplate = () => {
    setEventView({ ...eventView, visible: false });
  };

  return (
    <div className='flex flex-col gap-1'>
      <p className='text-[22px] text-center font-medium'>Mẫu chiếu sáng</p>
      <div id='external-events' className='draggable-container flex flex-col px-1 w-full'>
        {templates.map((item) => {
          return (
            <div
              draggable
              id={item.id}
              key={item.id}
              data-event={JSON.stringify(item)}
              className='draggable-item group w-full flex justify-between hover:bg-gray-100 items-center h-10 rounded-lg px-1'
            >
              <button
                className='flex items-center gap-1'
                onClick={() => {
                  handleViewTemplate(item.id);
                }}
              >
                <div
                  className='h-7 w-7 rounded-lg'
                  style={{
                    backgroundColor: item.color
                  }}
                ></div>
                <p className='max-w-[100px] text-[14px] font-normal truncate '>{item.name}</p>
              </button>
              <div className='flex gap-2'>
                <DeleteConfirm
                  name='mẫu chiếu sáng'
                  icon={<X className='text-gray-500 group-hover/button:text-red-500' />}
                  handleDelete={handleDeleteTemplate}
                />
              </div>
            </div>
          );
        })}
      </div>
      <Separator orientation='horizontal'></Separator>
      <ButtonIcon
        icon={<Plus className='text-gray-500 group-hover/button:text-black' />}
        className='bg-slate-200 w-full rounded-sm h-9'
        onClick={handleCreateTemplate}
      ></ButtonIcon>
    </div>
  );
};
