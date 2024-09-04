import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { faker } from '@faker-js/faker';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[200px] justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar mode='single' selected={date} onSelect={setDate} initialFocus />
      </PopoverContent>
    </Popover>
  );
}

export const description = 'A multiple bar chart';
const chartData = [
  {
    month: 'January',
    hcmut1: faker.number.int({ min: 250, max: 750 }) * 30,
    hcmut2: faker.number.int({ min: 250, max: 750 }) * 30
  },
  {
    month: 'February',
    hcmut1: faker.number.int({ min: 250, max: 750 }) * 30,
    hcmut2: faker.number.int({ min: 250, max: 750 }) * 30
  },
  {
    month: 'March',
    hcmut1: faker.number.int({ min: 250, max: 750 }) * 30,
    hcmut2: faker.number.int({ min: 250, max: 750 }) * 30
  },
  {
    month: 'April',
    hcmut1: faker.number.int({ min: 250, max: 750 }) * 30,
    hcmut2: faker.number.int({ min: 250, max: 750 }) * 30
  },
  {
    month: 'May',
    hcmut1: faker.number.int({ min: 250, max: 750 }) * 30,
    hcmut2: faker.number.int({ min: 250, max: 750 }) * 30
  },
  {
    month: 'June',
    hcmut1: faker.number.int({ min: 250, max: 750 }) * 30,
    hcmut2: faker.number.int({ min: 250, max: 750 }) * 30
  },
  {
    month: 'July',
    hcmut1: faker.number.int({ min: 250, max: 750 }) * 30,
    hcmut2: faker.number.int({ min: 250, max: 750 }) * 30
  },
  {
    month: 'August',
    hcmut1: faker.number.int({ min: 250, max: 750 }) * 30,
    hcmut2: faker.number.int({ min: 250, max: 750 }) * 30
  },
  {
    month: 'September',
    hcmut1: faker.number.int({ min: 250, max: 750 }) * 30,
    hcmut2: faker.number.int({ min: 250, max: 750 }) * 30
  },
  {
    month: 'October',
    hcmut1: faker.number.int({ min: 250, max: 750 }) * 30,
    hcmut2: faker.number.int({ min: 250, max: 750 }) * 30
  },
  {
    month: 'November',
    hcmut1: faker.number.int({ min: 250, max: 750 }) * 30,
    hcmut2: faker.number.int({ min: 250, max: 750 }) * 30
  },
  {
    month: 'December',
    hcmut1: faker.number.int({ min: 250, max: 750 }) * 30,
    hcmut2: faker.number.int({ min: 250, max: 750 }) * 30
  }
];
const chartConfig = {
  hcmut1: {
    label: 'BK CS1',
    color: 'hsl(var(--chart-1))'
  },
  hcmut2: {
    label: 'BK CS2',
    color: 'hsl(var(--chart-2))'
  }
} satisfies ChartConfig;
export const DoubleBarChart = () => {
  return (
    <Card>
      <CardHeader className='flex flex-row justify-between '>
        <div className='flex flex-col'>
          <CardTitle>Điện năng tiêu thụ của từng khu vực</CardTitle>
          <CardDescription>Năm 2023</CardDescription>
        </div>
        <div className='flex flex-row-reverse gap-2'>
          <Tabs>
            <TabsList>
              <TabsTrigger value='year'>Năm</TabsTrigger>
              <TabsTrigger value='month'>Tháng</TabsTrigger>
              <TabsTrigger value='day'>Ngày</TabsTrigger>
            </TabsList>
          </Tabs>
          <DatePickerDemo />
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              right: 24,
              top: 24,
              bottom: 24
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='month'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis tickMargin={5} tickFormatter={(value) => `${value} kWh`} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator='dashed' />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey='hcmut1' fill='var(--color-hcmut1)' radius={4}>
              <LabelList position='top' offset={12} className='fill-foreground' fontSize={12} />
            </Bar>
            <Bar dataKey='hcmut2' fill='var(--color-hcmut2)' radius={4}>
              <LabelList position='top' offset={12} className='fill-foreground' fontSize={12} />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
