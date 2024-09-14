import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LIGHT_STATUS } from '@/constants';
import { useFilterSmartPoleStore } from '@/states';
import { SetStateAction, useState } from 'react';

const setUpViewMap = [
  {
    area: 'all',
    center: { lat: 10.826846427727276, lng: 106.68068577543532 },
    zoom: 12
  },
  {
    area: 'hcmut-1',
    center: { lat: 10.77392998449525, lng: 106.65959695077382 },
    zoom: 17
  },
  {
    area: 'hcmut-2',
    center: { lat: 10.880852145509786, lng: 106.80538147754153 },
    zoom: 17.2
  }
];
const AreaSelect = ({
  setZoom,
  setCenter
}: {
  setZoom: React.Dispatch<SetStateAction<number | undefined>>;
  setCenter: React.Dispatch<SetStateAction<{ lat: number; lng: number } | undefined>>;
}) => {
  const { area, setArea } = useFilterSmartPoleStore();
  const [, setGroup] = useState<string>('0');
  const areaData = [
    { value: 'all', label: 'Tất cả' },
    { value: 'hcmut-1', label: 'BK Cơ sở 1' },
    { value: 'hcmut-2', label: 'BK Cơ sở 2' }
  ];
  const groupData = [
    { value: '1', area: 'hcmut-1', label: 'Sân A3' },
    { value: '2', area: 'hcmut-1', label: 'Sân A5' },
    { value: '3', area: 'hcmut-2', label: 'Sân H1' },
    { value: '4', area: 'hcmut-2', label: 'Sân H6' }
  ];
  const filterGroupData = groupData.filter((item) => item.area === area);
  const handleAreaChange = (val: string) => {
    setArea(val);
    setZoom(setUpViewMap.find((item) => item.area === val)?.zoom);
    setCenter(setUpViewMap.find((item) => item.area === val)?.center);
  };
  const handleGroupChange = (val: string) => {
    setGroup(val);
  };
  return (
    <div className='flex flex-row items-center gap-2'>
      <Select onValueChange={handleAreaChange}>
        <SelectTrigger className='w-[150px]'>
          <SelectValue placeholder='Chọn khu vực' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Khu vực</SelectLabel>
            {areaData.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select onValueChange={handleGroupChange}>
        <SelectTrigger className='w-[150px]' disabled={filterGroupData.length === 0}>
          <SelectValue placeholder='Chọn nhóm' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Nhóm</SelectLabel>
            {filterGroupData.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

const StatusFilter = () => {
  const { status, setStatus } = useFilterSmartPoleStore();
  return (
    <Tabs value={status}>
      <TabsList>
        {LIGHT_STATUS.map((stat) => {
          return (
            <TabsTrigger
              key={stat.key}
              value={stat.key}
              onClick={(val) => setStatus(val ? stat.key : 'none')}
            >
              {stat.label}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
};

export { AreaSelect, StatusFilter };
