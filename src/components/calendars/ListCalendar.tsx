import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip
} from '@material-tailwind/react';

import { PlusIcon } from '@heroicons/react/24/solid';

import { CalendarIcon } from '@heroicons/react/24/outline';
// import { useState } from 'react';

export const ListCalendar = () => {
  // const [fill,setFill] = useState('rgb(34 211 238)');
  return (
    <Card className='h-[calc(100vh-2rem)] w-full max-w-[20rem] shadow-xl shadow-blue-gray-900/5'>
      <div className='mb-2 p-4'>
        <Typography variant='h5' color='blue-gray'>
          Lịch của tôi
        </Typography>
      </div>
      <List>
        <ListItem>
          <ListItemPrefix>
            <CalendarIcon className='h-5 w-5 ' fill='rgb(34 211 238)' />
          </ListItemPrefix>
          Lịch mặc định
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <CalendarIcon className='h-5 w-5' fill='rgb(74 222 128)' />
          </ListItemPrefix>
          Lịch nghỉ tết
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <CalendarIcon className='h-5 w-5' fill='rgb(253 224 71)' />
          </ListItemPrefix>
          Lịch sự kiện chạy bộ
          <ListItemSuffix>
            <Chip value='4' size='sm' variant='ghost' color='blue-gray' className='rounded-full' />
          </ListItemSuffix>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <CalendarIcon className='h-5 w-5' fill='rgb(249 115 22)' />
          </ListItemPrefix>
          Lịch đón quan khách
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <CalendarIcon className='h-5 w-5' fill='rgb(52 211 153)' />
          </ListItemPrefix>
          Lịch Halloween
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <CalendarIcon className='h-5 w-5' fill='rgb(190 18 60)' />
          </ListItemPrefix>
          Lịch giờ Trái Đất
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <PlusIcon className='h-5 w-5 ' />
          </ListItemPrefix>
          Thêm lịch mới
        </ListItem>
      </List>
    </Card>
  );
};
