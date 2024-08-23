import { Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { useState } from 'react';
import greenLightBubIcon from '@assets/greenLightBub.svg';
import redLightBubIcon from '@assets/redLightBub.svg';
import { AppSkeleton } from '@components';
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
import smartPoleImage from '@assets/pole.png';

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
const CardSmartPoleInfo: Component<{ smartPole?: SmartPole }> = ({ smartPole }) => {
  return (
    <div className='flex flex-col w-80 bg-slate-200 h-full'>
      <img src={smartPoleImage} alt='smartPoleImage' />
      <div className='flex-col pl-4 gap-2 py-4'>
        <p className='font-medium text-lg pt-4'>Đèn {smartPole?.id}</p>
        <p className='font-normal text-sm'>
          {smartPole?.road}, khu vực {smartPole?.area}
        </p>
        <p className='pt-2 text-base font-light'>
          {smartPole?.status === true ? 'Đang bật' : 'Đang tắt'}
        </p>
        <p className='text-base font-light'>Số lần bật tắt: {smartPole?.frequency} lần</p>
        <p className='text-base font-light'>Thời gian chiếu sáng: {smartPole?.burningHours} giờ</p>
      </div>
    </div>
  );
};

export function MapPage() {
  const { area, status } = useFilterSmartPoleStore();
  const [showCard, setShowCard] = useState(false);
  const [selectedSmartPoleId, setSelectedSmartPoleId] = useState<string | null>(null);
  const handleMarkerClick = (smartPoleId: string) => {
    setSelectedSmartPoleId(smartPoleId);
    if (selectedSmartPoleId === smartPoleId) setShowCard(!showCard);
  };
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
      >
        {smartPoles?.map((smartPole) => (
          <AdvancedMarker
            key={smartPole.id}
            position={smartPole.position}
            onClick={() => handleMarkerClick(smartPole.id)}
          >
            <img
              src={smartPole.status ? greenLightBubIcon : redLightBubIcon}
              width={smartPole.id === selectedSmartPoleId && showCard ? 40 : 20}
              height={20}
            />
          </AdvancedMarker>
        ))}
      </Map>
      <div className='flex items-stretch gap-2 absolute top-4 left-8 z-10'>
        <AreaSelect />
        <StatusFilter />
      </div>

      <div className='absolute left-4 top-0 z-0 h-full'>
        {showCard && (
          <CardSmartPoleInfo
            smartPole={smartPoles?.find((item) => item.id === selectedSmartPoleId)}
          />
        )}
      </div>
    </div>
  );
}
