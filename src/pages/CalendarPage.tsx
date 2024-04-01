import { ListCalendar, FilterSmartPole, SchedulerCalendar, SchedulerForm } from '@components';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { Typography } from '@material-tailwind/react';
import { PieChart } from '@mui/x-charts';
import { differenceInMinutes, parse } from 'date-fns';

export const CalendarPage = () => {
  const isShowCalendar = false;

  function getColor(value: number, min = 0, max = 100) {
    if (value === 0) return 'rgb(150,150,150)';
    const ratio = (value - min) / (max - min);
    const r = Math.round(255);
    const g = Math.round(255);
    const b = Math.round(255 - 255 * ratio);
    return `rgb(${r},${g},${b})`;
  }

  const configPieChartData = calendarData.configLightLevel.map((item, index) => {
    return {
      id: index,
      value: differenceInMinutes(
        parse(item.end, 'HH:mm', new Date()),
        parse(item.start, 'HH:mm', new Date())
      ),
      label: `${item.start} - ${item.end} (${item.level}%)`,
      color: getColor(parseInt(item.level))
    };
  });

  return (
    <div className='flex flex-row gap-x-2 h-full'>
      <div className='w-1/5'>
        <ListCalendar />
      </div>
      {isShowCalendar && (
        <div className='w-4/5 flex flex-col gap-y-2'>
          <div className='flex flex-row-reverse gap-x-5'>
            <FilterSmartPole />
            <SchedulerForm />
          </div>
          {<SchedulerCalendar />}
        </div>
      )}
      {!isShowCalendar && (
        <div className='w-full'>
          <div className='flex flex-row p-4 gap-x-2'>
            <CalendarIcon className='h-10 w-10 ' fill={calendarData.color} />
            <Typography variant='h4' color='blue-gray' className='align-center pt-1'>
              {calendarData.name}
            </Typography>
          </div>
          <div className=''>
            <PieChart
              series={[
                {
                  data: configPieChartData,
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' }
                }
              ]}
              width={550}
              height={200}
            />
            <Typography variant='h6' color='blue-gray' className='align-center pt-1 pl-24'>
              Cấu hình độ sáng trong ngày(24h)
            </Typography>
          </div>
        </div>
      )}
    </div>
  );
};

const calendarData = {
  id: '1',
  name: 'Lịch giờ Trái Đất',
  color: '#dc0909',
  configLightLevel: [
    {
      start: '00:00',
      end: '06:00',
      level: '14'
    },
    {
      start: '06:00',
      end: '18:00',
      level: '0'
    },
    {
      start: '18:00',
      end: '20:30',
      level: '76'
    },
    {
      start: '20:30',
      end: '21:30',
      level: '0'
    },
    {
      start: '21:30',
      end: '23:59',
      level: '100'
    }
  ],
  areas: ['HCMUT-CS1'],
  roads: [
    {
      name: 'Đường 1',
      area: 'HCMUT-CS2'
    }
  ],
  smartPoles: [
    {
      name: 'Pole-1',
      road: 'Đường 2',
      area: 'HCMUT-CS2'
    }
  ]
};
