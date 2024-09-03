import { MyPieChart } from '@/components/charts/PieChart';
import { DoubleBarChart } from '@/components/charts/PowerConsumption';

export function DashboardPage() {
  return (
    <div className='flex flex-row'>
      <div className='w-3/4'>
        <DoubleBarChart />
      </div>
      <div className='w-1/4 mr-4'>
        <MyPieChart />
      </div>
    </div>
  );
}
