import * as React from 'react';
import { CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { faker } from '@faker-js/faker';

const getLastRangeDays = (range: number) =>
  Array.from({ length: range }, (_, index) => {
    const now = new Date();
    const date = new Date();
    date.setDate(now.getDate() - range + index);

    return date
      .toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      })
      .replace(/(\d+)\/(\d+)\/(\d+)/, '$2-$1-$3');
  });

const chartData = (range: number) =>
  getLastRangeDays(range).map((date) => ({
    date,
    hcmut1: faker.number.int({ min: 250, max: 1750 }),
    hcmut2: faker.number.int({ min: 250, max: 750 })
  }));

interface ChartData {
  date: string;
  hcmut1: number;
  hcmut2: number;
}
const cumulativeChartData = (range: number) =>
  chartData(range).reduce((acc: ChartData[], current, index) => {
    const prevHcmut1 = index > 0 ? acc[index - 1].hcmut1 : 0;
    const prevHcmut2 = index > 0 ? acc[index - 1].hcmut2 : 0;

    acc.push({
      date: current.date,
      hcmut1: current.hcmut1 + prevHcmut1,
      hcmut2: current.hcmut2 + prevHcmut2
    });

    return acc;
  }, []);

const chartConfig = {
  A: {
    label: 'Điện năng tiêu thụ'
  },
  hcmut1: {
    label: 'BK CS1',
    color: 'hsl(var(--chart-1))'
  },
  hcmut2: {
    label: 'BK CS2',
    color: 'hsl(var(--chart-2))'
  }
} satisfies ChartConfig;

export function MyLineChart() {
  const [timeRange, setTimeRange] = React.useState('7');

  return (
    <Card className='min-h-384'>
      <CardHeader className='flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row'>
        <div className='grid flex-1 gap-1 text-center sm:text-left'>
          <CardTitle>Sự tăng trưởng tiêu thụ điện năng</CardTitle>
          <CardDescription>Thể hiện điện năng tiêu thụ tích lũy 7 ngày gần đây</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className='w-[160px] rounded-lg sm:ml-auto' aria-label='Select a value'>
            <SelectValue placeholder='3 tháng gần đây' />
          </SelectTrigger>
          <SelectContent className='rounded-xl'>
            <SelectItem value='30' className='rounded-lg'>
              30 ngày gần đây
            </SelectItem>
            <SelectItem value='7' className='rounded-lg'>
              7 ngày gần đây
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
        <ChartContainer config={chartConfig} className='aspect-auto h-[260px] w-full'>
          <LineChart
            accessibilityLayer
            data={cumulativeChartData(parseInt(timeRange))}
            margin={{
              left: 12,
              right: 24,
              top: 24,
              bottom: 24
            }}
          >
            <CartesianGrid vertical={false} />
            <ChartLegend content={<ChartLegendContent />} />
            <XAxis
              dataKey='date'
              tickMargin={12}
              tickFormatter={(value) => `${value.split('-')[0]}-${value.split('-')[1]}`}
            />
            <YAxis tickMargin={12} tickFormatter={(value) => `${value} kWh`} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey='hcmut1'
              type='monotone'
              stroke='var(--color-hcmut1)'
              strokeWidth={2}
              dot={{
                fill: 'var(--color-hcmut1)'
              }}
              activeDot={{
                r: 6
              }}
            >
              <LabelList position='top' offset={12} className='fill-foreground' fontSize={12} />
            </Line>
            <Line
              dataKey='hcmut2'
              type='monotone'
              stroke='var(--color-hcmut2)'
              dot={{
                fill: 'var(--color-hcmut2)'
              }}
              strokeWidth={2}
            >
              <LabelList position='bottom' offset={12} className='fill-foreground' fontSize={12} />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
