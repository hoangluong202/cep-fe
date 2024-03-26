import { cloneElement, useState } from 'react';
import {
  Card,
  Dialog,
  Select,
  Option,
  Typography,
  Checkbox,
  Radio
} from '@material-tailwind/react';
import { CalendarIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import { calendarService } from '@services';
import { retryQueryFn } from '@utils';
import { FilterSmartPole } from '@components';

export const FormUsingCalendar = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(!openDialog);
  };

  const [isManyDays, setIsManyDays] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  const { data: listCalendars } = useQuery({
    queryKey: ['/api/calendars'],
    queryFn: () => calendarService.getAll(),
    retry: retryQueryFn
  });

  return (
    <div className='h-full'>
      <button type='button' onClick={handleOpenDialog} className='h-full'>
        <PlusCircleIcon className='h-full w-8' />
      </button>
      <Dialog open={openDialog} handler={handleOpenDialog}>
        <Card color='transparent' shadow={false} className='p-5'>
          <Typography variant='h5' color='blue-gray'>
            Cài đặt lịch cho Smart Pole
          </Typography>
          <div className='flex flex-col items-start gap-y-3'>
            <div className='flex justify-between'>
              <div className='w-72 my-4'>
                <Select
                  size='lg'
                  label='Chọn lịch'
                  selected={(element) =>
                    element &&
                    cloneElement(element, {
                      disabled: true,
                      className: 'flex items-center opacity-100 px-0 gap-2 pointer-events-none'
                    })
                  }
                >
                  {listCalendars?.map(({ name, color }) => (
                    <Option key={name} value={name} className='flex items-center gap-2'>
                      <CalendarIcon className='h-5 w-5 rounded-full object-cover' fill={color} />
                      {name}
                    </Option>
                  ))}
                </Select>
              </div>

              <Checkbox
                label='Nhiều ngày'
                onChange={(event) => {
                  setIsManyDays(event.target.checked);
                }}
                className='text-blue-gray-400 font-normal'
                crossOrigin=''
              />
              <Checkbox
                label='Lặp lại'
                onChange={(event) => {
                  setIsRepeat(event.target.checked);
                }}
                crossOrigin=''
              />
            </div>
            <FilterSmartPole />
            <div className='flex flex-row gap-x-2'>
              {!isRepeat && (
                <div className='w-54'>
                  <div className='relative w-full min-w-[200px] h-10'>
                    <input
                      type='date'
                      className='peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900'
                      placeholder=' '
                    />
                    <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                      Ngày áp dụng
                    </label>
                  </div>
                </div>
              )}
              {isManyDays && !isRepeat && (
                <div className='w-54'>
                  <div className='relative w-full min-w-[200px] h-10'>
                    <input
                      type='date'
                      className='peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900'
                      placeholder=' '
                    />
                    <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                      Ngày kết thúc
                    </label>
                  </div>
                </div>
              )}
              {isRepeat && (
                <div className='flex flex-col gap-y-2.5'>
                  <div className='flex flex-row gap-x-3'>
                    <div className='pt-2 text-blue-gray-400 font-normal'> Lặp lại mỗi</div>
                    <div className='w-20'>
                      <div className='relative w-full min-w-[80px] h-10'>
                        <input
                          type='number'
                          defaultValue={1}
                          className='peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900'
                        />
                        <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal  truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900"></label>
                      </div>
                    </div>
                    <div className='w-48'>
                      <Select defaultValue='week'>
                        <Option value={'day'}>ngày</Option>
                        <Option value={'week'}>tuần</Option>
                        <Option value={'month'}>tháng</Option>
                        <Option value={'year'}>năm</Option>
                      </Select>
                    </div>
                  </div>
                  <div className='pt-2 text-blue-gray-400 font-normal '> Kết thúc</div>

                  <Radio
                    name='color'
                    color='blue'
                    label='Không bao giờ'
                    defaultChecked
                    crossOrigin=''
                    labelProps={{ color: 'text-blue-gray-400', fontWeight: 'font-normal' }}
                  />
                  <div className='flex flex-row gap-x-6'>
                    <Radio name='color' color='blue' label='Vào ngày' crossOrigin='' />
                    <div className='w-54'>
                      <div className='relative w-full min-w-[200px] h-10'>
                        <input
                          type='date'
                          className='peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900'
                          placeholder=' '
                        />
                        <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900"></label>
                      </div>
                    </div>
                  </div>

                  <div className='flex flex-row gap-x-16'>
                    <Radio name='color' color='blue' label='Sau' crossOrigin='' />
                    <div className='w-28'>
                      <div className='relative w-full min-w-[80px] h-10'>
                        <input
                          type='number'
                          defaultValue={1}
                          className='peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900'
                        />
                        <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal  truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                          Lần xuất hiện
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      </Dialog>
    </div>
  );
};
