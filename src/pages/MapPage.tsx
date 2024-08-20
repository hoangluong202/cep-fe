import { Map, InfoWindow, useMarkerRef, Marker } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import greenLightBubIcon from '@assets/greenLightBub.svg';
import redLightBubIcon from '@assets/redLightBub.svg';
import {
  AppSkeleton,
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  PoleCard
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
import { ListFilter } from 'lucide-react';

const defaultStyle = [
  {
    featureType: 'all',
    elementType: 'all',
    stylers: [{ saturation: '32' }, { lightness: '-3' }, { visibility: 'on' }, { weight: '1.18' }]
  },
  {
    featureType: 'administrative',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }]
  },
  {
    featureType: 'landscape',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }]
  },
  {
    featureType: 'landscape.man_made',
    elementType: 'all',
    stylers: [{ saturation: '-70' }, { lightness: '14' }]
  },
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }]
  },
  {
    featureType: 'transit',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }]
  },
  {
    featureType: 'water',
    elementType: 'all',
    stylers: [{ saturation: '100' }, { lightness: '-14' }]
  },
  {
    featureType: 'water',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }, { lightness: '12' }]
  }
] as google.maps.MapTypeStyle[];

interface MarkerWithInfoProps {
  smartPole: SmartPole;
}

const MarkerWithInfo: Component<MarkerWithInfoProps> = ({ smartPole }) => {
  const [infowindowOpen, setInfowindowOpen] = useState(false);
  const [markerRef, marker] = useMarkerRef();
  return (
    <>
      <Marker
        ref={markerRef}
        position={smartPole.position}
        icon={{
          url: smartPole.status ? greenLightBubIcon : redLightBubIcon,
          scaledSize: {
            width: infowindowOpen ? 60 : 20,
            height: infowindowOpen ? 60 : 20,
            equals: () => true
          }
        }}
        onMouseOver={() => setInfowindowOpen(true)}
        onMouseOut={() => setInfowindowOpen(false)}
      />

      {infowindowOpen && (
        <InfoWindow anchor={marker}>
          <PoleCard smartPole={smartPole} />
        </InfoWindow>
      )}
    </>
  );
};

const AreaSelect = () => {
  const data = [
    { value: 'hcmut-cs1', label: 'HCMUT CS1' },
    { value: 'hcmut-cs2', label: 'HCMUT CS2' }
  ];
  return (
    <Select>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Chọn một khu vực' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Khu vực</SelectLabel>
          <SelectItem value={data[0].value}>{data[0].label}</SelectItem>
          <SelectItem value={data[1].value}>{data[1].label}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

const StatusFilter = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='sm' className='h-10 gap-1'>
          <ListFilter className='h-3.5 w-3.5' />
          <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>Lọc</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>Lọc theo trạng thái</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked>Hoạt động</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>Không hoạt động</DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export function MapPage() {
  const { area, road, name } = useFilterSmartPoleStore();
  const { data: smartPoles, isFetching } = useQuery({
    queryKey: ['/api/poles', area, road, name],
    queryFn: () => smartPoleService.getBy(area, road, name),
    retry: retryQueryFn
  });
  const [center, setCenter] = useState({ lat: 10.80552892012782, lng: 106.63993540154873 });
  const [zoom, setZoom] = useState(10);

  useEffect(() => {
    setCenter(smartPoles?.[0]?.position || { lat: 10.80552892012782, lng: 106.63993540154873 });
    setZoom(area ? 16 : 10);
  }, [smartPoles, area]);

  if (isFetching) {
    return <AppSkeleton />;
  }

  return (
    <div className='relative h-full w-full px-4'>
      <Map
        style={{
          width: '100%',
          borderRadius: '10px',
          boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)'
        }}
        zoom={zoom}
        center={center}
        mapTypeId='terrain'
        styles={defaultStyle}
        onCameraChanged={(ev) => {
          setCenter(ev.detail.center);
          setZoom(ev.detail.zoom);
        }}
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
