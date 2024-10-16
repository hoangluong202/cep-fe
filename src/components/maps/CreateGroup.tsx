import { Button } from '@components';
import { ArrowLeft, FolderPen, Save } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useState } from 'react';
import { useLocation } from '@/hooks/useLocation.hook';
import { useFilterSmartPoleStore } from '@/states';
import { useNavigate } from 'react-router-dom';
export const CreateGroup = ({
  sendDataToParent,
  smartPoleIds
}: {
  sendDataToParent: (isDrawing: boolean) => void;
  smartPoleIds: number[];
}) => {
  const closeDrawing = () => {
    sendDataToParent(false);
  };
  const [groupName, setGroupName] = useState<string>('Thêm tên nhóm');
  const handleGroupNameChange = (newName: string) => {
    setGroupName(newName);
  };

  const { createGroup } = useLocation();
  const { center, areaSelected } = useFilterSmartPoleStore();
  const navigate = useNavigate();

  return (
    <>
      <Button
        className='absolute left-6 top-4'
        onClick={() => {
          closeDrawing();
        }}
      >
        <ArrowLeft className='mr-2 h-4 w-4' />
      </Button>
      <Popover>
        <PopoverTrigger className='flex items-center absolute top-4 right-6 bg-slate-900 hover:bg-slate-900/90 text-white rounded px-4 py-2 text-[14px]'>
          <FolderPen className='mr-2 h-4 w-4' /> <p className='font-medium'>{groupName}</p>
        </PopoverTrigger>
        <PopoverContent align='start' side='left' className='w-[180px]'>
          <div className='flex flex-col bg-gray-100 rounded gap-2'>
            <p className='font-bold text-[14px]'>Tên nhóm</p>
            <textarea
              className='text-[14px] font-normal tracking-[.00625em] resize-none overflow-hidden font-sans py-1 border-b-[1px] border-slate-500 focus:border-b-2 focus:border-blue-700 outline-none caret-blue-700'
              rows={1}
              cols={10}
              placeholder='Thêm tên nhóm'
              wrap='off'
              onChange={(e) => handleGroupNameChange(e.target.value)}
            />
          </div>
        </PopoverContent>
      </Popover>
      <Button
        className='absolute bottom-6 right-6'
        onClick={async () => {
          closeDrawing();
          await createGroup.mutateAsync({
            areaKey: areaSelected ?? '',
            data: {
              groupName: groupName,
              latitude: center.lat,
              longitude: center.lng,
              smartPoleIds: smartPoleIds
            }
          });
          navigate('/map');
        }}
      >
        <Save className='mr-2 h-4 w-4' /> Lưu
      </Button>
    </>
  );
};

//TODO: CALL API TO SAVE GROUP
//TODO: LEARN ABOUT callback function
