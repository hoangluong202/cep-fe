import { List, ListItem, ListItemPrefix, Dialog, Switch } from '@material-tailwind/react';
import { Card, Button, Typography } from '@material-tailwind/react';
import { PlusIcon } from '@heroicons/react/24/solid';
import { CalendarIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useMutation, useQuery } from '@tanstack/react-query';
import { retryQueryFn } from '@utils';
import { calendarService } from '@services';
import { useState } from 'react';
import { useForm, SubmitHandler, useFieldArray, FieldArrayWithId } from 'react-hook-form';

export const ListCalendar = () => {
  const { register, handleSubmit, control } = useForm<CreateCalendarFormData>({
    defaultValues: {
      name: 'Lịch dành cho ...',
      color: '#000000',
      configLightLevel: [{ start: '00:00', end: '23:59', level: '50' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    name: 'configLightLevel',
    control
  });

  const onSubmit: SubmitHandler<CreateCalendarFormData> = (data) => {
    mutation.mutate({
      name: data.name,
      color: data.color,
      configLightLevel: data.configLightLevel
    });
  };

  const { data: listCalendars } = useQuery({
    queryKey: ['/api/calendars'],
    queryFn: () => calendarService.getAll(),
    retry: retryQueryFn
  });

  const [openFormDialog, setOpenFormDialog] = useState(false);
  const handleOpenFormDialog = () => {
    setOpenFormDialog(!openFormDialog);
  };

  const mutation = useMutation({
    mutationFn: calendarService.create
  });

  const ConfigLightItem: Component<{
    index: number;
    field: FieldArrayWithId<CreateCalendarFormData, 'configLightLevel', 'id'>;
  }> = ({ index, field }) => {
    const [level, setLevel] = useState(field.level);
    const [lastEndTime, setLastEndTime] = useState('23:59');

    return (
      <div key={field.id} className='flex flex-row gap-x-2 mt-2'>
        <div className='relative h-10 w-40 min-w-[150px] '>
          <input
            type='time'
            {...register(`configLightLevel.${index}.start`)}
            className='peer h-full w-full rounded-[7px]  !border  !border-gray-300 border-t-transparent bg-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700  shadow-lg shadow-gray-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2  focus:!border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 focus:ring-gray-900/10 disabled:border-0 disabled:bg-blue-gray-50'
          />
        </div>
        <div className='relative h-10 w-3'>
          <div className='absolute inset-0 pt-2'>-</div>
        </div>
        <div className='relative h-10 w-40 min-w-[150px] '>
          <input
            type='time'
            {...register(`configLightLevel.${index}.end`)}
            onChange={(e) => {
              if (index === fields.length - 1) {
                setLastEndTime(e.target.value);
              }
            }}
            className='peer h-full w-full rounded-[7px]  !border  !border-gray-300 border-t-transparent bg-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700  shadow-lg shadow-gray-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2  focus:!border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 focus:ring-gray-900/10 disabled:border-0 disabled:bg-blue-gray-50'
          />
        </div>

        <div className='relative h-10 w-60 min-w-[80px] mx-5'>
          <input
            type='range'
            min='0'
            max='100'
            step='1'
            {...register(`configLightLevel.${index}.level`)}
            onChange={(e) => {
              setLevel(e.target.value);
            }}
            className='mx-1 py-2.5 peer h-full w-full rounded-[7px] !border !border-gray-300 border-t-transparent bg-transparent bg-white p-0 font-sans text-sm font-normal text-blue-gray-700  shadow-lg shadow-gray-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2  focus:!border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 focus:ring-gray-900/10 disabled:border-0 disabled:bg-blue-gray-50'
          />
          <label className="mx-1 flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
            Độ sáng: {level}(%)
          </label>
        </div>

        <button type='button' className='hover:bg-violet-600'>
          <TrashIcon
            className='h-10 w-6'
            color='red'
            onClick={() => {
              if (fields.length > 1) {
                setLastEndTime(fields[fields.length - 2].end);
                remove(index);
              }
            }}
          />
        </button>
        <button
          type='button'
          className=''
          hidden={index !== fields.length - 1 || lastEndTime === '23:59'}
          onClick={() =>
            append({
              start: lastEndTime,
              end: '23:59',
              level: '50'
            })
          }
        >
          <PlusIcon className='h-10 w-6' />
        </button>
      </div>
    );
  };

  return (
    <>
      <Card className='shadow-blue-gray-900/5'>
        <div className='flex justify-between pt-4 pl-4'>
          <Typography variant='h5' color='blue-gray' className=''>
            Lịch của tôi
          </Typography>
          <div className='flex flex-row gap-x-2'>
            <Switch color='blue' crossOrigin='' className='' />
            <CalendarIcon className='h-6 w-6 mt-0.5 mr-2' />
          </div>
        </div>
        <List>
          {listCalendars?.map((calendar, index) => (
            <ListItem
              key={index}
              ripple={false}
              // onClick={() => {
              //   handleOpenViewDialog(calendar.id);
              // }}
            >
              <ListItemPrefix>
                <CalendarIcon className='h-5 w-5 ' fill={calendar.color} />
              </ListItemPrefix>
              {calendar.name}
            </ListItem>
          ))}
          <ListItem onClick={handleOpenFormDialog}>
            <ListItemPrefix>
              <PlusIcon className='h-5 w-5 ' />
            </ListItemPrefix>
            Thêm lịch mới
          </ListItem>
        </List>
      </Card>
      <Dialog open={openFormDialog} handler={handleOpenFormDialog}>
        <Card color='transparent' shadow={false} className='p-10'>
          <Typography variant='h4' color='blue-gray' className='align-center'>
            Tạo thêm lịch mới
          </Typography>
          <form className='mt-8 mb-2' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-row gap-x-6'>
              <div className='mb-1 flex flex-col gap-6 w-4/5'>
                <Typography variant='h6' color='blue-gray' className='-mb-3'>
                  Tên lịch mới
                </Typography>
                <div className='relative w-full min-w-[80px] h-10'>
                  <input
                    {...register('name')}
                    className='peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900'
                    type='text'
                  />
                  <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                    Tên lịch mới
                  </label>
                </div>
              </div>
              <div className='mb-1 flex flex-col gap-6 w-1/5'>
                <Typography variant='h6' color='blue-gray' className='-mb-3'>
                  Chọn màu
                </Typography>
                <div className='relative h-10 w-full min-w-[80px] '>
                  <input
                    {...register('color')}
                    type='color'
                    className='peer h-full w-full rounded-[7px]  !border  !border-gray-300 border-t-transparent bg-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700  shadow-lg shadow-gray-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2  focus:!border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 focus:ring-gray-900/10 disabled:border-0 disabled:bg-blue-gray-50'
                  />
                </div>
              </div>
            </div>

            <Typography variant='h6' color='blue-gray' className='align-center'>
              Cấu hình độ sáng
            </Typography>
            <div className='overflow-y-scroll max-h-72'>
              {fields.map((field, index) => (
                <ConfigLightItem key={index} index={index} field={field} />
              ))}
            </div>

            <div className='flex flex-row-reverse gap-x-2'>
              <Button type='submit' className='mt-6 w-48' onClick={handleOpenFormDialog}>
                Tạo
              </Button>
              <Button className='mt-6 w-48' onClick={handleOpenFormDialog}>
                Hủy
              </Button>
            </div>
          </form>
        </Card>
      </Dialog>
    </>
  );
};
