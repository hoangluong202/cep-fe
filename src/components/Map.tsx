import { APIProvider, Map, InfoWindow, useMarkerRef, Marker } from '@vis.gl/react-google-maps';
import { useState } from 'react';
import yellowLightBubIcon from '@assets/yellowLightBub.svg';
import { PoleCard } from '@components';

const HCMUT_CORNERS = [
  { lat: 10.770692797316515, lng: 106.65826141343352 },
  { lat: 10.774569690082894, lng: 106.6620894625359 },
  { lat: 10.77634012117674, lng: 106.66002415769374 },
  { lat: 10.772852090456192, lng: 106.6575775799744 },
  { lat: 10.77404592132156, lng: 106.65984371362426 },
  { lat: 10.77336083948916, lng: 106.66028359590184 }
];

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
  position: { lat: number; lng: number };
  key: number;
}

const MarkerWithInfo: Component<MarkerWithInfoProps> = ({ position }) => {
  const [infowindowOpen, setInfowindowOpen] = useState(false);
  const [markerRef, marker] = useMarkerRef();
  return (
    <>
      <Marker
        ref={markerRef}
        position={position}
        icon={{
          url: yellowLightBubIcon,
          scaledSize: { width: 20, height: 20, equals: () => true }
        }}
        onMouseOver={() => setInfowindowOpen(true)}
        onMouseOut={() => setInfowindowOpen(false)}
      />

      {infowindowOpen && (
        <InfoWindow anchor={marker}>
          <PoleCard />
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
        style={{ width: '100%', height: '100vh' }}
        defaultZoom={defaultProps.zoom}
        defaultCenter={defaultProps.center}
        // mapId={'key'}
        mapTypeId='terrain'
        styles={defaultStyle}
      >
        {HCMUT_CORNERS.map((corner, index) => (
          <MarkerWithInfo key={index} position={corner} />
        ))}
      </Map>
    </APIProvider>
  );
}
