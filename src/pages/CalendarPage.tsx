import { ListCalendar, FilterSmartPole, SchedulerCalendar, SchedulerForm } from '@components';
import { CalendarIcon, ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Chip, Typography } from '@material-tailwind/react';
import { PieChart } from '@mui/x-charts';
import { useIsShowCalendar } from '@states';
import { differenceInMinutes, parse } from 'date-fns';

export const CalendarPage = () => {
  const { isShowCalendar } = useIsShowCalendar();

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

  const CollapseRow = ({
    isOpen,
    data,
    type,
    leaveNode
  }: {
    isOpen: boolean;
    data: string;
    type?: string;
    leaveNode?: boolean;
  }) => (
    <div
      className='flex flex-row gap-x-2'
      style={{
        paddingLeft: type === 'road' ? '25px' : type === 'pole' ? '50px' : '0px'
      }}
    >
      {leaveNode ? (
        <></>
      ) : isOpen ? (
        <ChevronDownIcon className='h-4 w-4' />
      ) : (
        <ChevronRightIcon className='h-4 w-4' />
      )}
      <p className='block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900'>
        {data}
      </p>
    </div>
  );

  const CalendarChip = ({
    calendarType,
    calendarName
  }: {
    calendarType?: string;
    calendarName?: string;
  }) => (
    <div className='flex flex-row gap-x-2'>
      <Chip
        variant='ghost'
        color={
          calendarType === 'area'
            ? 'light-blue'
            : calendarType === 'road'
            ? 'light-green'
            : 'orange'
        }
        size='sm'
        value={
          calendarType === 'area'
            ? 'Lịch khu vực'
            : calendarType === 'road'
            ? 'Lịch tuyến đường'
            : 'Lịch smart pole'
        }
        icon={
          <span
            className="mx-auto mt-1 block h-2 w-2 rounded-full bg-blue-900 content-['']"
            style={{
              backgroundColor:
                calendarType === 'area'
                  ? '#3b82f6'
                  : calendarType === 'road'
                  ? '#10b981'
                  : '#f59e0b'
            }}
          />
        }
      />
      <Chip
        variant='ghost'
        color='red'
        size='sm'
        value={`${calendarName}`}
        icon={<span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-red-900 content-['']" />}
      />
    </div>
  );

  return (
    <div className='flex flex-row gap-x-2 h-full'>
      <div className='w-1/5 100vw'>
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
        <div className='w-full h-full gap-x-2 p-2 bg-white shadow-md bg-clip-border rounded-xl'>
          <div className='w-full h-1/6 flex flex-row p-6 pl-10 gap-x-2'>
            <CalendarIcon className='h-10 w-10 ' fill={calendarData.color} />
            <Typography variant='h4' color='blue-gray' className='align-center pt-1'>
              {calendarData.name}
            </Typography>
          </div>
          <div className='w-full h-5/6 flex flex-row gap-x-2'>
            <div className='h-full w-2/5'>
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
                    cx: '80%',
                    cy: '25%'
                  }
                ]}
                width={330}
                height={440}
                slotProps={{
                  legend: {
                    direction: 'column',
                    position: { vertical: 'bottom', horizontal: 'middle' },
                    padding: 50,
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
            <div className='h-full w-3/5 text-gray-700 bg-white shadow-md'>
              <table className='w-full text-left table-auto rounded-lg '>
                <thead>
                  <tr>
                    <th className='p-4 border-b border-blue-gray-100 bg-blue-gray-50 rounded-tl-lg'>
                      <Typography variant='h6' color='blue-gray' className='align-center'>
                        Địa điểm áp dụng
                      </Typography>
                    </th>
                    <th className='p-4 border-b border-blue-gray-100 bg-blue-gray-50 rounded-tr-lg'>
                      <Typography variant='h6' color='blue-gray' className='align-center'>
                        Lịch
                      </Typography>
                    </th>
                  </tr>
                </thead>
                <tbody className='s'>
                  <tr>
                    <td className='p-4 border-b border-blue-gray-50'>
                      <button>
                        <CollapseRow isOpen={false} data={'HCMUT-CS1'} leaveNode={true} />
                      </button>
                    </td>
                    <td className='p-4 border-b border-blue-gray-50'>
                      <CalendarChip calendarType='area' calendarName='Lịch giờ Trái Đất' />
                    </td>
                  </tr>
                  <tr>
                    <td className='p-4 border-b border-blue-gray-50'>
                      <button>
                        <CollapseRow isOpen={true} data={'HCMUT-CS2'} />
                      </button>
                    </td>
                    <td className='p-4 border-b border-blue-gray-50'></td>
                  </tr>
                  <tr>
                    <td className='p-4 border-b border-blue-gray-50'>
                      <button>
                        <CollapseRow isOpen={false} data={'Đường 1'} type='road' leaveNode={true} />
                      </button>
                    </td>
                    <td className='p-4 border-b border-blue-gray-50'>
                      <CalendarChip calendarType='road' calendarName='Lịch giờ Trái Đất' />
                    </td>
                  </tr>
                  <tr>
                    <td className='p-4 border-b border-blue-gray-50'>
                      <button>
                        <CollapseRow isOpen={false} data={'Đường 2'} type='road' leaveNode={true} />
                      </button>
                    </td>
                    <td className='p-4 border-b border-blue-gray-50'>
                      <CalendarChip calendarType='road' calendarName='Lịch giờ Trái Đất' />
                    </td>
                  </tr>
                  <tr>
                    <td className='p-4 border-b border-blue-gray-50'>
                      <button>
                        <CollapseRow isOpen={true} data={'Đường 3'} type='road' />
                      </button>
                    </td>
                    <td className='p-4 border-b border-blue-gray-50'></td>
                  </tr>
                  <tr>
                    <td className='p-4 border-b border-blue-gray-50'>
                      <button>
                        <CollapseRow isOpen={false} data={'Pole-1'} type='pole' leaveNode={true} />
                      </button>
                    </td>
                    <td className='p-4 border-b border-blue-gray-50'>
                      <p className='block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900'>
                        <CalendarChip calendarType='pole' calendarName='Lịch giờ Trái Đất' />
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
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
