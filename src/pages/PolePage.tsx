import { columns } from '@/components/alarms/columns';
import { DataTable } from '@/components/alarms/data-table';
import { ALARM_ERROR, ALARM_STATUS, AREA, PRIORITY } from '@/constants';
import { TAlarmData } from '@/types/alarm';
import { faker } from '@faker-js/faker';

function getData(): TAlarmData[] {
  // Fetch data from your API here.
  const length = 150;
  const data: TAlarmData[] = [];
  for (let i = 0; i < length; i++) {
    data.push({
      id: i.toString(),
      name: `BUG-${i}`,
      time: faker.date.recent().toLocaleString('vi-VI', { timeZone: 'Asia/Ho_Chi_Minh' }),
      area: faker.helpers.arrayElement(AREA).key,
      poleId: faker.number.int().toString(),
      errType: faker.helpers.arrayElement(ALARM_ERROR).key,
      priority: faker.helpers.arrayElement(PRIORITY).key,
      status: faker.helpers.arrayElement(ALARM_STATUS).key
    });
  }

  data.sort((a, b) => {
    return new Date(b.time).getTime() - new Date(a.time).getTime();
  });

  return data;
}
export function PolePage() {
  const data = getData();

  return (
    <div className='container mx-auto py-1'>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
