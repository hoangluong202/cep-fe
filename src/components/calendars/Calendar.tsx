import { useState } from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  addDays,
  differenceInMinutes,
  startOfDay,
  subDays,
  parse,
  format,
  startOfWeek,
  getDay
} from 'date-fns';
import { Event } from 'react-big-calendar';
import { Dialog, Typography } from '@material-tailwind/react';
import {
  ArrowPathIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { PieChart } from '@mui/x-charts';
import { useIsShow } from '@states';

export const SchedulerCalendar: Component = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleSelectEvent = () => {
    setIsChecked(!isChecked);
  };

  const { setIsShowSchedulerForm } = useIsShow();
  const handleSelectSlot = () => {
    setIsShowSchedulerForm(true);
  };

  function getColor(value: number, min = 0, max = 100) {
    if (value === 0) return 'rgb(150,150,150)';
    const ratio = (value - min) / (max - min);
    const r = Math.round(150 + (255 - 150) * ratio);
    const g = Math.round(150 + (255 - 150) * ratio);
    const b = Math.round(0);
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
    <>
      <Calendar
        dayLayoutAlgorithm={'no-overlap'}
        defaultView={Views.MONTH}
        events={myEvents}
        localizer={localizer}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable={true}
        popup={true}
        eventPropGetter={(e) => {
          return {
            style: {
              backgroundColor: e.resource?.color,
              color: 'black'
            }
          };
        }}
      />

      <Dialog open={isChecked} handler={handleSelectEvent}>
        <div className='w-full h-full gap-x-2 p-2 bg-white shadow-md rounded-xl'>
          <div className='w-full h-1/6 flex p-4 mb-2 pl-10 gap-x-2 bg-white shadow-md rounded-xl justify-between'>
            <div className='flex flex-row h-full gap-x-2'>
              <CalendarIcon className='h-10 w-10 ' fill={calendarData.color} />
              <Typography variant='h4' color='blue-gray' className='align-center pt-1'>
                {calendarData.name}
              </Typography>
            </div>
            <div className='flex flex-row-reverse h-full'>
              <button className='self-end h-full w-10' onClick={handleSelectEvent}>
                <XMarkIcon className='h-full w-full' />
              </button>
            </div>
          </div>
          <div className='w-full h-5/6 flex flex-row gap-x-2'>
            <div className='h-full w-2/5 bg-white shadow-md rounded-xl'>
              <PieChart
                series={[
                  {
                    data: configPieChartData,
                    highlightScope: { faded: 'global', highlighted: 'item' },
                    faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                    paddingAngle: 1,
                    cornerRadius: 5,
                    startAngle: 0,
                    innerRadius: '5%',
                    outerRadius: '80%',
                    endAngle: 360,
                    cx: '70%',
                    cy: '25%'
                  }
                ]}
                width={330}
                height={440}
                slotProps={{
                  legend: {
                    direction: 'column',
                    position: { vertical: 'bottom', horizontal: 'middle' },
                    padding: 60,
                    itemMarkWidth: 20,
                    itemMarkHeight: 10,
                    markGap: 5,
                    itemGap: 8,
                    labelStyle: {
                      fontSize: 14,
                      fill: 'blue-gray-700'
                    }
                  }
                }}
              />
            </div>
            <div className='flex flex-col flex-start h-ful w-3/5 shadow-md rounded-e-lg'>
              <div className='flex flex-row p-4 gap-x-2 items-stretch'>
                <div
                  className='h-14 w-14 rounded  flex justify-center items-center'
                  style={{
                    backgroundColor: '#b9e4c9'
                  }}
                >
                  <MapPinIcon className='h-full w-full' color='#356859' />
                </div>
                <div className='flex flex-col gap-y-1 h-full w-full'>
                  <Typography variant='small' style={{ color: '#356859' }} className='font-bold'>
                    Vị trí áp dụng
                  </Typography>
                  <Typography variant='h5' color='blue-gray'>
                    Pole-23, Đường 3, HCMUT-CS2
                  </Typography>
                </div>
              </div>
              <div className='flex flex-row p-4 gap-x-2 items-stretch'>
                <div
                  className='h-14 w-14 rounded  flex justify-center items-center'
                  style={{
                    backgroundColor: '#b9e4c9'
                  }}
                >
                  <ClockIcon className='h-full w-full' color='#356859' />
                </div>
                <div className='flex flex-col gap-y-1 h-full w-full'>
                  <Typography variant='small' style={{ color: '#356859' }} className='font-bold'>
                    Ngày bắt đầu áp dụng
                  </Typography>
                  <Typography variant='h5' color='blue-gray'>
                    20/10/2021
                  </Typography>
                </div>
              </div>
              <div className='flex flex-row p-4 gap-x-2 items-stretch'>
                <div
                  className='h-14 w-14 rounded  flex justify-center items-center'
                  style={{
                    backgroundColor: '#b9e4c9'
                  }}
                >
                  <ArrowPathIcon className='h-full w-full' color='#356859' />
                </div>
                <div className='flex flex-col gap-y-1 h-full w-full'>
                  <Typography variant='small' style={{ color: '#356859' }} className='font-bold'>
                    Lặp lại
                  </Typography>
                  <Typography variant='h5' color='blue-gray'>
                    Mỗi 2 tuần vào T2, T4, T6
                  </Typography>
                </div>
              </div>
              <div className='flex flex-row p-4 gap-x-2 items-stretch'>
                <div
                  className='h-14 w-14 rounded  flex justify-center items-center'
                  style={{
                    backgroundColor: '#b9e4c9'
                  }}
                >
                  <ClockIcon className='h-full w-full' color='#356859' />
                </div>
                <div className='flex flex-col gap-y-1 h-full w-full'>
                  <Typography variant='small' style={{ color: '#356859' }} className='font-bold'>
                    Ngày kết thúc
                  </Typography>
                  <Typography variant='h5' color='blue-gray'>
                    Không xác định
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

const locales = {
  'en-US': enUS
};
const now = startOfDay(new Date());
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});
//event repeat of Event type

const myEvents: Event[] = [
  {
    title: 'Lịch mặc định',
    start: subDays(now, 33),
    end: subDays(now, 23),
    allDay: true,
    resource: {
      id: '6',
      color: '#33E0FF'
    }
  },
  {
    title: 'Lịch giờ Trái Đất',
    start: subDays(now, 23),
    end: subDays(now, 20),
    allDay: true,
    resource: {
      id: '1',
      color: '#dc0909'
    }
  },
  {
    title: 'Lịch mặc định',
    start: subDays(now, 20),
    end: subDays(now, 10),
    allDay: true,
    resource: {
      id: '6',
      color: '#33E0FF'
    }
  },
  {
    title: 'Lịch chạy bộ',
    start: subDays(now, 10),
    end: subDays(now, 9),
    allDay: true,
    resource: {
      id: '3',
      color: '#dac225'
    }
  },
  {
    title: 'Lịch mặc định',
    start: subDays(now, 9),
    end: now,
    allDay: true,
    resource: {
      id: '6',
      color: '#33E0FF'
    }
  },
  {
    title: 'Lịch đón quan khách',
    start: now,
    end: addDays(now, 2),
    allDay: true,
    resource: {
      id: '4',
      color: '#151aa8'
    }
  },
  {
    title: 'Lịch mặc định',
    start: addDays(now, 2),
    end: addDays(now, 10),
    allDay: true,
    resource: {
      id: '6',
      color: '#33E0FF'
    }
  }
];

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
      end: '23:30',
      level: '100'
    },
    {
      start: '23:30',
      end: '23:59',
      level: '55'
    }
  ],
  scheduler: [
    {
      area: 'HCMUT-CS1'
    },
    {
      area: 'HCMUT-CS2',
      children: [
        {
          road: 'Đường 1'
        },
        {
          road: 'Đường 2'
        },
        {
          road: 'Đường 3',
          children: [
            {
              name: 'Pole-1'
            },
            {
              name: 'Pole-2'
            }
          ]
        }
      ]
    }
  ]
};
