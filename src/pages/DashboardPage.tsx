import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MyLineChart } from '@/components/charts/LineChart';
import { MyPieChart } from '@/components/charts/PieChart';
import { DoubleBarChart } from '@/components/charts/PowerConsumption';
import {
  ArrowBigRight,
  Calendar,
  Check,
  CirclePower,
  DollarSign,
  LayoutTemplate,
  Lightbulb,
  Loader,
  ShieldAlert,
  Zap
} from 'lucide-react';

export function DashboardPage() {
  return (
    <div className='grid grid-cols-4 grid-rows-9 gap-2 p-3'>
      <Card1 />
      <div className='col-start-1 row-start-2'>
        <Card5 />
      </div>
      <div className='col-start-1 row-start-3'>
        <Card6 />
      </div>
      <div className='row-span-3 col-start-1 row-start-4'>
        <MyPieChart />
      </div>
      <div className='col-start-2 row-start-1'>
        <Card2 />
      </div>
      <div className='col-start-3 row-start-1'>
        <Card3 />
      </div>
      <div className='col-start-4 row-start-1'>
        <Card4 />
      </div>
      <div className='col-span-3 row-span-5 col-start-2 row-start-2'>
        <DoubleBarChart />
      </div>
      <div className='col-span-4 row-span-3 row-start-7'>
        <MyLineChart />
      </div>
    </div>
  );
}

const Card1 = () => (
  <Card>
    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
      <CardTitle className='text-sm font-bold'>Trụ đèn</CardTitle>
      <Lightbulb className='h-4 w-4 text-muted-foreground' />
    </CardHeader>
    <CardContent>
      <div className='text-2xl font-bold'>+330 thiết bị</div>
      <p className='text-xs text-muted-foreground'>+2 khu vực quản lý</p>
    </CardContent>
  </Card>
);

const Card2 = () => (
  <Card>
    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
      <CardTitle className='text-sm font-bold'>Trạng thái trụ đèn</CardTitle>
      <Loader className='h-4 w-4 text-muted-foreground' />
    </CardHeader>
    <CardContent>
      <div className='flex flex-row items-center gap-2'>
        <p className='text-2xl font-bold'>+329</p>
        <Check className='h-4 w-4 text-muted-foreground text-green-500' />
        <p className='text-2xl font-bold ml-2'>+0</p>
        <CirclePower className='h-4 w-4 text-muted-foreground text-yellow-500' />
        <p className='text-2xl font-bold ml-2'>+1</p>
        <ShieldAlert className='h-4 w-4 text-muted-foreground text-red-500' />
      </div>
      <p className='text-xs text-muted-foreground'>+1 thiết bị gặp sự cố</p>
    </CardContent>
  </Card>
);

const Card3 = () => (
  <Card>
    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
      <CardTitle className='text-sm font-bold'>Mẫu chiếu sáng</CardTitle>
      <LayoutTemplate className='h-4 w-4 text-muted-foreground' />
    </CardHeader>
    <CardContent>
      <div className='text-2xl font-bold'>+4 mẫu</div>
      <p className='text-xs text-muted-foreground'>+2 mẫu tạo mới trong hôm nay</p>
    </CardContent>
  </Card>
);

const Card4 = () => (
  <Card>
    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
      <CardTitle className='text-sm font-bold'>Lịch</CardTitle>
      <Calendar className='h-4 w-4 text-muted-foreground' />
    </CardHeader>
    <CardContent>
      <div className='flex flex-row items-center gap-2'>
        <p className='text-2xl font-bold'>+22</p>
        <Check className='h-4 w-4 text-muted-foreground text-sky-500' />
        <p className='text-2xl font-bold ml-2'>+3</p>
        <Loader className='h-4 w-4 text-muted-foreground text-green-500' />
        <p className='text-2xl font-bold ml-2'>+14</p>
        <ArrowBigRight className='h-4 w-4 text-muted-foreground text-orange-500' />
      </div>
      <p className='text-xs text-muted-foreground'>+17 sự kiện đang sắp được thực hiện</p>
    </CardContent>
  </Card>
);

const Card5 = () => (
  <Card>
    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
      <CardTitle className='text-sm font-bold'>Điện năng tiêu thụ tháng này</CardTitle>
      <Zap className='h-4 w-4 text-muted-foreground' />
    </CardHeader>
    <CardContent>
      <div className='text-2xl font-bold'>+15000 kWh</div>
      <p className='text-xs text-muted-foreground'>-53.1% so với tháng trước</p>
    </CardContent>
  </Card>
);

const Card6 = () => (
  <Card>
    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
      <CardTitle className='text-sm font-bold'>Chi phí tháng này</CardTitle>
      <DollarSign className='h-4 w-4 text-muted-foreground' />
    </CardHeader>
    <CardContent>
      <div className='text-2xl font-bold'>+45,000,000 VND</div>
      <p className='text-xs text-muted-foreground'>-50% so với tháng trước</p>
    </CardContent>
  </Card>
);
