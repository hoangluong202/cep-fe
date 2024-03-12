import { APIProvider, Map, InfoWindow, useMarkerRef, Marker } from '@vis.gl/react-google-maps';
import { useState } from 'react';
import yellowLightBubIcon from '@assets/yellowLightBub.svg';
import redLightBubIcon from '@assets/redLightBub.svg';
import { PoleCard } from '@components';
import { generateSmartPole } from '@utils';

type Position = {
  lat: number;
  lng: number;
};

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

const smartPoles: SmartPole[] = [];
const smartPolesRoad1 = generateSmartPole(
  { lat: 10.77215316412856, lng: 106.65799003519278 },
  { lat: 10.773974974999247, lng: 106.66141726168081 },
  25,
  'HCMUT CS1',
  'Đường 1'
);
const smartPolesRoad2 = generateSmartPole(
  { lat: 10.773974974999247, lng: 106.66141726168081 },
  { lat: 10.775679455221816, lng: 106.6604880783368 },
  25,
  'HCMUT CS1',
  'Đường 2'
);
const smartPolesRoad3 = generateSmartPole(
  { lat: 10.772883143628613, lng: 106.66058715774557 },
  { lat: 10.774613743655923, lng: 106.65961387490945 },
  25,
  'HCMUT CS1',
  'Đường 3'
);
const smartPolesRoad4 = generateSmartPole(
  { lat: 10.774240810012396, lng: 106.66022957877695 },
  { lat: 10.773513318242129, lng: 106.65884960121063 },
  25,
  'HCMUT CS1',
  'Đường 4'
);
const smartPolesRoad5 = generateSmartPole(
  { lat: 10.772510479403829, lng: 106.6598805608222 },
  { lat: 10.773360899892282, lng: 106.6593498886552 },
  25,
  'HCMUT CS1',
  'Đường 5'
);
smartPoles.push(
  ...smartPolesRoad1,
  ...smartPolesRoad2,
  ...smartPolesRoad3,
  ...smartPolesRoad4,
  ...smartPolesRoad5
);

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
