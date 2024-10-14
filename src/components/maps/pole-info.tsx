import smartPoleImage from '@assets/imgs/pole.png';
import { Repeat1, History } from 'lucide-react';
import { TPoleData } from '@/types/smartPole';
import lightOnIcon from '@assets/svg/light-on.svg';
import lightOffIcon from '@assets/svg/light-off.svg';

export const CardSmartPoleInfo: Component<{ smartPole?: TPoleData }> = ({ smartPole }) => {
  return (
    <div className='flex flex-col w-80 bg-white h-full border-2 text-sm text-[#202124] font-normal'>
      <img src={smartPoleImage} alt='smartPoleImage' />
      <div className='flex flex-col pl-6 gap-1 py-2'>
        <p className='font-medium text-[22px]'>Đèn {smartPole?.id}</p>
        <p className='font-normal text-sm text-[#70757a] pb-4'>
          Lắp đặt tại Khu vực {smartPole?.areaKey}
        </p>

        <div className='flex flex-row items-center gap-4'>
          <img src={smartPole?.status ? lightOnIcon : lightOffIcon} width={24} height={24} />
          <p>{smartPole?.status === true ? 'Đang bật' : 'Đang tắt'}</p>
        </div>
        <div className='flex flex-row items-center gap-4'>
          <Repeat1 color='blue' />
          <p>{smartPole?.frequency} lần bật/tắt</p>
        </div>

        <div className='flex flex-row items-center gap-4'>
          <History color='blue' />
          <p>Đã hoạt động {smartPole?.burningDuration} giờ chiếu sáng</p>
        </div>
      </div>
    </div>
  );
};
