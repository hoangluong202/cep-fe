import { LabelList, Pie, PieChart } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

const chartData = [
  { area: 'hcmut1', pc: 24150, fill: 'var(--color-hcmut1)' },
  { area: 'hcmut2', pc: 18250, fill: 'var(--color-hcmut2)' }
];

const totalValue = chartData.reduce((acc, item) => acc + item.pc, 0);

const chartConfig = {
  pc: {
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

export const MyPieChart = () => {
  return (
    <Card className='flex flex-col'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>Phân bổ tiêu thụ điện năng</CardTitle>
        <CardDescription>Tháng 8/2024</CardDescription>
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer config={chartConfig} className='mx-auto aspect-square max-h-[250px]'>
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey='pc' hideLabel />} />
            <Pie data={chartData} dataKey='pc'>
              <LabelList
                dataKey='area'
                className='fill-background'
                stroke='none'
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) => {
                  const pc = chartData.find((item) => item.area === value)?.pc ?? 0;
                  return `${((pc / totalValue) * 100).toFixed(1)}%`;
                }}
              />
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey='area' />}
              className='-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center'
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
