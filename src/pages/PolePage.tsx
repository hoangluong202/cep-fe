import { columns } from '@/components/poles/column';
import { DataTable } from '@/components/poles/data-table';
import { TPoleData } from '@/types/smartPole';
import { generateSmartPole } from '@/utils';

export function PolePage() {
  //fake data
  const poles: TPoleData[] = generateSmartPole();

  return (
    <div className='container mx-auto py-1'>
      <DataTable columns={columns} data={poles} />
    </div>
  );
}
