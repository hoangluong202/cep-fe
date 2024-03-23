import { List, ListItem, ListItemPrefix, Dialog, Select } from '@material-tailwind/react';
import { Card, Input, Option, Button, Typography } from '@material-tailwind/react';
import { PlusIcon } from '@heroicons/react/24/solid';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import { AppSkeleton } from '@components';
import { retryQueryFn } from '@utils';
import { calendarService } from '@services';
import { useState } from 'react';

export const ListCalendar = () => {
  const { data: listCalendars, isLoading } = useQuery({
    queryKey: ['/api/calendars'],
    queryFn: () => calendarService.getAll(),
    retry: retryQueryFn
  });

  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(!openDialog);
  };

  // const mutation = useMutation({
  //   mutationFn: calendarService.create
  //   // onSuccess: () => {
  //   //   // Invalidate and refetch
  //   //   // queryClient.invalidateQueries({ queryKey: ['todos'] })
  //   // },
  // });
  if (isLoading) return <AppSkeleton />;
  return (
    <>
      <Card className='shadow-blue-gray-900/5'>
        <div className='mb-2 p-4'>
          <Typography variant='h5' color='blue-gray'>
            Lịch của tôi
          </Typography>
        </div>
        <List>
          {listCalendars?.map((calendar) => (
            <ListItem>
              <ListItemPrefix>
                <CalendarIcon className='h-5 w-5 ' fill={calendar.color} />
              </ListItemPrefix>
              {calendar.name}
            </ListItem>
          ))}
          <ListItem onClick={handleOpenDialog}>
            <ListItemPrefix>
              <PlusIcon className='h-5 w-5 ' />
            </ListItemPrefix>
            Thêm lịch mới
          </ListItem>
        </List>
      </Card>
      <Dialog open={openDialog} handler={handleOpenDialog}>
        <Card color='transparent' shadow={false} className='p-10'>
          <Typography variant='h4' color='blue-gray' className='align-center'>
            Tạo thêm lịch mới
          </Typography>
          <form className='mt-8 mb-2'>
            <div className='flex flex-row gap-x-6'>
              <div className='mb-1 flex flex-col gap-6 w-4/5'>
                <Typography variant='h6' color='blue-gray' className='-mb-3'>
                  Tên lịch mới
                </Typography>
                <Input
                  size='lg'
                  placeholder='Lịch cho ...'
                  className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
                  labelProps={{
                    className: 'before:content-none after:content-none'
                  }}
                  crossOrigin='true'
                />
              </div>
              <div className='mb-1 flex flex-col gap-6'>
                <Typography variant='h6' color='blue-gray' className='-mb-3'>
                  Chọn màu
                </Typography>
                <Input
                  type='color'
                  size='md'
                  // placeholder='Lịch cho ...'
                  // className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
                  // labelProps={{
                  //   className: 'before:content-none after:content-none'
                  // }}
                  crossOrigin='true'
                />
              </div>
            </div>

            <Typography variant='h6' color='blue-gray' className='align-center'>
              Cấu hình độ sáng
            </Typography>

            <div className='flex flex-row gap-x-6'>
              <Select
                label='Hour'
                onResize={() => {
                  width: '100px';
                }}
              >
                {[...Array(24).keys()].map((hour) => (
                  <Option>{hour}</Option>
                ))}
              </Select>

              <Select label='Minute'>
                {[...Array(60).keys()].map((hour) => (
                  <Option>{hour}</Option>
                ))}
              </Select>
              <Select label='Hour'>
                {[...Array(24).keys()].map((hour) => (
                  <Option>{hour}</Option>
                ))}
              </Select>
              <Select label='Minute'>
                {[...Array(60).keys()].map((hour) => (
                  <Option>{hour}</Option>
                ))}
              </Select>
            </div>

            <Button className='mt-6 w-full'>CREATE</Button>
          </form>
        </Card>
      </Dialog>
    </>
  );
};
