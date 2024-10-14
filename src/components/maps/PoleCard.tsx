import { Card, CardBody, Typography } from '@material-tailwind/react';

const StatusIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth='1.5'
      stroke='currentColor'
      className='w-6 h-6'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9'
      />
    </svg>
  );
};

const LightLevelIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth='1.5'
      stroke='currentColor'
      className='w-6 h-6'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z'
      />
    </svg>
  );
};

const TimeIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth='1.5'
      stroke='currentColor'
      className='w-6 h-6'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
      />
    </svg>
  );
};

const MapIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth='1.5'
      stroke='currentColor'
      className='w-6 h-6'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
      />
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z'
      />
    </svg>
  );
};

type TPoint = {
  lat: number;
  lng: number;
};

type SmartPole = {
  id: string;
  area: string;
  road: string;
  position: TPoint;
  status: boolean;
  level: number;
  burningHours: number;
  frequency: number;
};
interface PoleCardProps {
  smartPole: SmartPole;
}

export const PoleCard: Component<PoleCardProps> = (smartPole) => (
  <Card className='w-56 p-0 m-0'>
    <CardBody className='p-0 m-0'>
      <Typography variant='h6' color='blue-gray' className='pl-2 text-center p-0 font-medium mb-2'>
        Pole-{smartPole.smartPole.id}
      </Typography>
      <ul className='flex flex-col gap-1 pl-2 mb-2'>
        <li className='flex flex-row gap-3'>
          <span>
            <MapIcon />
          </span>
          <span className='text-xs text-gray-500 flex items-center justify-center'>
            {smartPole.smartPole.road}, {smartPole.smartPole.area}
          </span>
        </li>
        <li className='flex flex-row gap-3'>
          <span>
            <StatusIcon />
          </span>
          <span className='text-xs text-gray-500 flex items-center justify-center'>
            Trạng thái: {smartPole.smartPole.status ? 'Bật' : 'Tắt'}
          </span>
        </li>
        <li className='flex flex-row gap-3'>
          <span>
            <LightLevelIcon />
          </span>
          <span className='text-xs text-gray-500 flex items-center justify-center'>
            Độ sáng: {smartPole.smartPole.level}(%)
          </span>
        </li>
        <li className='flex flex-row gap-3'>
          <span>
            <TimeIcon />
          </span>
          <span className='text-xs text-gray-500 flex items-center justify-center'>
            Thời gian hoạt động: {smartPole.smartPole.burningHours}(giờ)
          </span>
        </li>
      </ul>
    </CardBody>
  </Card>
);
