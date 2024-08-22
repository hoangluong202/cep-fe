import { Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { useState } from 'react';
import greenLightBubIcon from '@assets/greenLightBub.svg';
import redLightBubIcon from '@assets/redLightBub.svg';
import {
  AppSkeleton,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@components';
import { useFilterSmartPoleStore } from '@states';
import { useQuery } from '@tanstack/react-query';
import { smartPoleService } from '@services';
import { retryQueryFn } from '@utils';
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

const MarkerWithInfo: Component<{
  smartPole: SmartPole;
}> = ({ smartPole }) => {
  const [infowindowOpen, setInfowindowOpen] = useState(false);
  return (
    <>
      <AdvancedMarker position={smartPole.position} onClick={() => setInfowindowOpen(true)}>
        <img src={smartPole.status ? greenLightBubIcon : redLightBubIcon} width={20} height={20} />
      </AdvancedMarker>
      {infowindowOpen && (
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

const AreaSelect = () => {
  const { setArea, area } = useFilterSmartPoleStore();
  const data = [
    { value: 'all', label: 'Tất cả' },
    { value: 'hcmut-1', label: 'HCMUT CS1' },
    { value: 'hcmut-2', label: 'HCMUT CS2' }
  ];
  return (
    <Select onValueChange={(val) => setArea(val)} value={area}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Chọn một khu vực' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Khu vực</SelectLabel>
          <SelectItem value={data[0].value}>{data[0].label}</SelectItem>
          <SelectItem value={data[1].value}>{data[1].label}</SelectItem>
          <SelectItem value={data[2].value}>{data[2].label}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

const StatusFilter = () => {
  const { status, setStatus } = useFilterSmartPoleStore();
  return (
    <Tabs value={status}>
      <TabsList>
        <TabsTrigger value='all' onClick={(val) => setStatus(val ? 'all' : 'bug')}>
          Tất cả
        </TabsTrigger>
        <TabsTrigger value='active' onClick={(val) => setStatus(val ? 'active' : 'bug')}>
          Đang bật
        </TabsTrigger>
        <TabsTrigger value='inactive' onClick={(val) => setStatus(val ? 'inactive' : 'bug')}>
          Đang tắt
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export function MapPage() {
  const { area, status } = useFilterSmartPoleStore();
  const { data: smartPoles, isFetching } = useQuery({
    queryKey: ['/api/poles', area, status],
    queryFn: () => smartPoleService.getBy(area, status),
    retry: retryQueryFn
  });

  if (isFetching) {
    return <AppSkeleton />;
  }

  return (
    <div className='relative h-full w-full px-4'>
      <Map
        mapId='1'
        zoom={setUpViewMap.find((item) => item.area === area)?.zoom}
        center={setUpViewMap.find((item) => item.area === area)?.center}
        mapTypeId='terrain'
      >
        {smartPoles?.map((smartPole, index) => (
          <MarkerWithInfo key={index} smartPole={smartPole} />
        ))}
      </Map>
      <div className='flex items-stretch gap-2 absolute top-4 left-8'>
        <AreaSelect />
        <StatusFilter />
      </div>
    </div>
  );
}
