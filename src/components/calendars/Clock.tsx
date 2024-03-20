// import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

export const Clock = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateCalendar />
    </LocalizationProvider>
  );
};
