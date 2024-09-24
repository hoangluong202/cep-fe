import { Settings } from 'lucide-react';

const TemplateDescription = () => (
  <div className='flex flex-row items-center gap-4'>
    <Settings />
    <div className='flex flex-col'>
      <p className='text-[18px] font-[600] text-black'>Mẫu chiếu sáng trong ngày</p>
      <p className='text-[14px] font-[400] text-gray-500'>
        Thiết lập cường độ chiếu sáng theo từng khung giờ
      </p>
    </div>
  </div>
);

const TemplateLightSettingLabel = () => (
  <div className='grid grid-cols-[200px_180px_100px] pl-3'>
    <p className='font-bold text-[14px]'>Bắt đầu từ</p>
    <p className='font-bold text-[14px]'> Kết thúc vào</p>
    <p className='font-bold text-[14px]'>Độ sáng</p>
    <p className='text-[14px] font-[400] text-gray-500'>(giờ:phút)</p>
    <p className='text-[14px] font-[400] text-gray-500'>(giờ:phút)</p>
    <p className='text-[14px] font-[400] text-gray-500'>%</p>
  </div>
);

export { TemplateDescription, TemplateLightSettingLabel };
