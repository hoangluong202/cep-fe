import { useNavigate, useParams } from 'react-router-dom';
import { Edit, Settings } from 'lucide-react';
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ButtonIcon } from '@/components';
import { useTemplateStore } from '@/states';

export function TemplateDetailPage() {
  const { id } = useParams();
  const { templates } = useTemplateStore();
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/templates/${template?.id}/edit`);
  };

  //mock fetch template by id
  const template = templates.find((template) => template.id === id);
  return (
    <div className='space-y-8 p-8 flex flex-col gap-4'>
      <div className='flex flex-col gap-3 max-w-[600px]'>
        <div className='flex flex-row items-center w-full gap-2'>
          <div className='h-8 w-8 rounded' style={{ backgroundColor: template?.color }}></div>
          <p className='text-[28px] font-normal tracking-[.00625em]'>{template?.name}</p>
          <ButtonIcon className=' ml-auto' icon={<Edit />} onClick={handleEdit} />
        </div>

        <div className='flex flex-col gap-1'>
          <div className='flex flex-row items-center gap-4'>
            <Settings />
            <div className='flex flex-col'>
              <p className='text-[18px] font-[600] text-black'> Mẫu chiếu sáng trong ngày</p>
              <p className='text-[14px] font-[400] text-gray-500'>
                Thiết lập cường độ chiếu sáng theo từng khung giờ
              </p>
            </div>
          </div>
          <div className='flex flex-row gap-24'>
            <p className='pl-2 font-bold text-[14px]'>Bắt đầu từ</p>
            <p className='pl-6 font-bold text-[14px]'> Kết thúc vào</p>
            <p className='font-bold text-[14px]'>Độ sáng</p>
          </div>
          <div className='flex flex-row gap-24'>
            <p className='pl-2 text-[14px] font-[400] text-gray-500'>(hh:mm)</p>
            <p className='pl-10 text-[14px] font-[400] text-gray-500'>(hh:mm)</p>
            <p className='pl-10 text-[14px] font-[400] text-gray-500'>%</p>
          </div>

          <TemplateLightSettingView template={template} />
        </div>
      </div>
    </div>
  );
}

export const TemplateLightSettingView = ({ template }: { template: TTemplateData | undefined }) => (
  <div className='flex flex-col gap-1 h-auto overflow-y-auto bg-gray-100 p-2 rounded-lg'>
    {template?.lightSettings.map((setting, index) => (
      <div key={index} className='flex flex-row items-center'>
        <Select>
          <SelectTrigger className='w-[80px]'>
            <SelectValue placeholder={setting.startTime.toString().split(':')[0]} />
          </SelectTrigger>
        </Select>
        <p> : </p>
        <Select>
          <SelectTrigger className='w-[80px]'>
            <SelectValue placeholder={setting.startTime.toString().split(':')[1]} />
          </SelectTrigger>
        </Select>
        <p className='mx-3'> - </p>
        <Select>
          <SelectTrigger className='w-[80px] '>
            <SelectValue placeholder={setting.endTime.toString().split(':')[0]} />
          </SelectTrigger>
        </Select>
        <p> : </p>
        <Select>
          <SelectTrigger className='w-[80px] '>
            <SelectValue placeholder={setting.endTime.toString().split(':')[1]} />
          </SelectTrigger>
        </Select>
        <Select>
          <SelectTrigger className='w-[150px] mx-4'>
            <SelectValue placeholder={setting.dimming.toString()} />
          </SelectTrigger>
        </Select>
      </div>
    ))}
  </div>
);
