import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftFromLine, Edit } from 'lucide-react';
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button, ButtonIcon } from '@/components';
import { useTemplateStore } from '@/states';
import {
  TemplateDescription,
  TemplateLightSettingLabel
} from '@/components/calendars/TemplateDetail';

export function TemplateDetailPage() {
  const { id } = useParams();

  //TODO: API-fetch template by id
  const { templates } = useTemplateStore();
  const template = templates.find((template) => template.id === id);

  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`edit`);
  };
  const handleGoBack = () => {
    navigate('/calendar');
  };

  return (
    <div className='flex flex-col gap-4 w-[650px] pl-8 pt-2'>
      <Button variant='ghost' className='gap-2 w-fit border-2' onClick={handleGoBack}>
        <ArrowLeftFromLine />
        <span>Trở lại</span>
      </Button>
      <TemplateDescription />
      <div className='flex flex-col gap-3 max-w-[600px]'>
        <div className='flex flex-row items-center w-full gap-2'>
          <div className='h-8 w-8 rounded' style={{ backgroundColor: template?.color }}></div>
          <p className='text-[28px] font-normal tracking-[.00625em]'>{template?.name}</p>
          <ButtonIcon className=' ml-auto' icon={<Edit />} onClick={handleEdit} />
        </div>

        <div className='flex flex-col gap-1'>
          <TemplateLightSettingLabel />
          <TemplateLightSettingView template={template} />
        </div>
      </div>
    </div>
  );
}

const TemplateLightSettingView = ({ template }: { template: TTemplateData | undefined }) => (
  <div className='flex flex-col gap-1 h-auto w-fit overflow-y-auto bg-gray-100 p-2 rounded-lg'>
    {template?.lightSettings.map((setting, index) => (
      <div key={index} className='flex flex-row items-center'>
        <Select>
          <SelectTrigger className='w-[80px]'>
            <SelectValue placeholder={setting.startHour.toString()} />
          </SelectTrigger>
        </Select>
        <p> : </p>
        <Select>
          <SelectTrigger className='w-[80px]'>
            <SelectValue placeholder={setting.startMinute.toString()} />
          </SelectTrigger>
        </Select>
        <p className='mx-3'> - </p>
        <Select>
          <SelectTrigger className='w-[80px] '>
            <SelectValue placeholder={setting.endHour.toString()} />
          </SelectTrigger>
        </Select>
        <p> : </p>
        <Select>
          <SelectTrigger className='w-[80px] '>
            <SelectValue placeholder={setting.endMinute.toString()} />
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
