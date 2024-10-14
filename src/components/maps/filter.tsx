import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LIGHT_STATUS } from '@/constants';
import { locationService } from '@/services';
import { useFilterSmartPoleStore } from '@/states';
import { useQuery } from '@tanstack/react-query';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';

const AreaSelect = () => {
  const { areaSelected, setAreaSelected, setCenter, setGroupSelected, resetZoom } =
    useFilterSmartPoleStore();
  const { refetch } = useQuery({
    queryKey: ['currentArea', areaSelected],
    queryFn: () => locationService.getAreaByKey(areaSelected)
  });
  const { data: areasData } = useQuery({
    queryKey: ['areas'],
    queryFn: () => locationService.getAllAreas()
  });
  const handleAreaChange = async (val: string) => {
    setAreaSelected(val);
    setGroupSelected(undefined);
    resetZoom();
    const { data: newCurAreaData } = await refetch();
    //TODO: initial with numeric value from API
    setCenter({
      lat: parseFloat(newCurAreaData?.latitude.toString() || '0'),
      lng: parseFloat(newCurAreaData?.longitude.toString() || '0')
    });
  };
  return (
    <Select onValueChange={handleAreaChange} value={areaSelected}>
      <SelectTrigger className='w-[150px]'>
        <SelectValue placeholder='Chọn khu vực' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Khu vực</SelectLabel>
          {areasData?.map((item) => (
            <SelectItem key={item.id} value={item.areaKey}>
              {item.areaName}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

const GroupSelect = () => {
  const { areaSelected, groupSelected, setGroupSelected } = useFilterSmartPoleStore();
  const [magicKey, setMagicKey] = useState<string>('1');
  const { data: groupsData } = useQuery({
    queryKey: ['groups', areaSelected],
    queryFn: () => locationService.getGroupsByArea(areaSelected),
    enabled: !!areaSelected
  });

  useEffect(() => {
    if (areaSelected) {
      setMagicKey(new Date().getTime().toString());
    }
  }, [areaSelected]);

  const handleResetGroup = () => {
    setGroupSelected(undefined);
  };
  const handleGroupChange = (val: string) => {
    setGroupSelected(val);
  };

  return (
    <Select key={magicKey} value={groupSelected} onValueChange={handleGroupChange}>
      <SelectTrigger className='w-[150px]' disabled={!groupsData || groupsData.length === 0}>
        <SelectValue placeholder='Chọn nhóm' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Nhóm</SelectLabel>
          {groupsData?.map((item) => (
            <SelectItem key={item.id} value={item.groupKey}>
              {item.groupName}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectSeparator />
        <Button
          className='w-full px-2'
          variant='secondary'
          size='sm'
          onClick={() => {
            setMagicKey(new Date().getTime().toString());
            handleResetGroup();
          }}
        >
          Clear
        </Button>
      </SelectContent>
    </Select>
  );
};

const StatusFilter = () => {
  const { statusSelected, setStatusSelected } = useFilterSmartPoleStore();
  return (
    <Tabs value={statusSelected}>
      <TabsList>
        {LIGHT_STATUS.map((stat) => {
          return (
            <TabsTrigger
              key={stat.key}
              value={stat.key}
              onClick={(val) => setStatusSelected(val ? stat.key : 'none')}
            >
              {stat.label}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
};

export const MapSmartPoleFilter = () => {
  console.log('render MapSmartPoleFilter');
  return (
    <div className='flex items-stretch gap-2 absolute top-4 left-8 z-10'>
      <div className='flex flex-row items-center gap-2'>
        <AreaSelect />
        <GroupSelect />
      </div>
      <StatusFilter />
      <></>
    </div>
  );
};
