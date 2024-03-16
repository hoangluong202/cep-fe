import { APIProvider, Map, InfoWindow, useMarkerRef, Marker } from '@vis.gl/react-google-maps';
import { useState } from 'react';
import yellowLightBubIcon from '@assets/yellowLightBub.svg';
import redLightBubIcon from '@assets/redLightBub.svg';
import { PoleCard } from '@components';
import { useSmartPoleStore } from '@states';

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
  const { smartPoles, zoom, center, setZoom, setCenter } = useSmartPoleStore();
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
        zoom={zoom}
        center={center}
        mapTypeId='terrain'
        styles={defaultStyle}
        onCameraChanged={(ev) => {
          setCenter(ev.detail.center);
          setZoom(ev.detail.zoom);
        }}
      >
        {smartPoles.map((smartPole, index) => (
          <MarkerWithInfo key={index} smartPole={smartPole} />
        ))}
      </Map>
    </APIProvider>
  );
}
