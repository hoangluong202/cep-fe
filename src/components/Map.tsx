import { APIProvider, Map, InfoWindow, useMarkerRef, Marker } from '@vis.gl/react-google-maps';
import { useState } from 'react';
import yellowLightBubIcon from '@assets/yellowLightBub.svg';
import redLightBubIcon from '@assets/redLightBub.svg';
import { PoleCard } from '@components';
import { generateSmartPole } from '@utils';

const SmartPolePosition: Position[] = [];

type Position = {
  lat: number;
  lng: number;
};

/**
 * Using Haversine formula to calculate the distance between two points
 */
const calculateDistance = (point1: Position, point2: Position) => {
  const R = 6371 * 1000; // Radius of the earth in m
  const dLat = deg2rad(point2.lat - point1.lat); // deg2rad below
  const dLng = deg2rad(point2.lng - point1.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(point1.lat)) *
      Math.cos(deg2rad(point2.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in m
  return Math.round(distance);
};
const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
};

const generatePositonInRoad = (start: Position, end: Position, distance: number) => {
  const lengthRoad = calculateDistance(start, end);
  const n = Math.floor(lengthRoad / distance);

  for (let i = 1; i < n; i++) {
    const lat = ((n - i) * start.lat + i * end.lat) / n;
    const lng = ((n - i) * start.lng + i * end.lng) / n;
    SmartPolePosition.push({ lat, lng });
  }
  SmartPolePosition.push(start);
  SmartPolePosition.push(end);
};

const point1 = { lat: 10.77215316412856, lng: 106.65799003519278 };
const point2 = { lat: 10.773974974999247, lng: 106.66141726168081 };
generatePositonInRoad(point1, point2, 25);

//test gen smartpole
type SmartPole = {
  id: string;
  area: string;
  road: string;
  position: Position;
  status: boolean;
  level: number;
  burningHours: number;
  frequency: number;
};
const smartPoles: SmartPole[] = generateSmartPole(point1, point2, 25, 'HCMUT CS1', 'Đường 1');

const defaultProps = {
  center: {
    lat: 10.77404592132156,
    lng: 106.65984371362426
  },
  zoom: 16
};

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
          url: smartPole.status ? yellowLightBubIcon : redLightBubIcon,
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

export function SimpleMap() {
  return (
    // Important! Always set the container height explicitly
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}>
      <Map
        style={{
          width: '100%',
          height: '100vh',
          borderRadius: '10px',
          boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)'
        }}
        defaultZoom={defaultProps.zoom}
        defaultCenter={defaultProps.center}
        mapTypeId='terrain'
        styles={defaultStyle}
      >
        {smartPoles.map((smartPole, index) => (
          <MarkerWithInfo key={index} smartPole={smartPole} />
        ))}
      </Map>
    </APIProvider>
  );
}
