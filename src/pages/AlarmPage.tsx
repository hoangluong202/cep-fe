import { columns } from '@/components/alarms/columns';
import { DataTable } from '@/components/alarms/data-table';
import { ALARM_ERROR, ALARM_STATUS, AREA, PRIORITY } from '@/constants';
import { TAlarmData } from '@/types/alarm';
import { faker } from '@faker-js/faker';

function getData(): TAlarmData[] {
  // Fetch data from your API here.
  const length = 160;
  const data: TAlarmData[] = [];
  for (let i = 0; i < length; i++) {
    data.push({
      id: i.toString(),
      name: `BUG-${i}`,
      time: faker.date.recent().toLocaleString(),
      area: faker.helpers.arrayElement(AREA).key,
      poleId: faker.number.int().toString(),
      errType: faker.helpers.arrayElement(ALARM_ERROR).key,
      priority: faker.helpers.arrayElement(PRIORITY).key,
      status: faker.helpers.arrayElement(ALARM_STATUS).key
    });
  }

  return data;
}
export function AlarmPage() {
  const data = getData();

  return (
    <div className='container mx-auto py-1'>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
