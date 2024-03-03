import { APIProvider, Map, InfoWindow, useMarkerRef, Marker } from '@vis.gl/react-google-maps';
import { useState } from 'react';
import { Card, CardBody, CardFooter, Typography, Button } from '@material-tailwind/react';

const HCMUT_CORNERS = [
  { lat: 10.770692797316515, lng: 106.65826141343352 },
  { lat: 10.774569690082894, lng: 106.6620894625359 },
  { lat: 10.77634012117674, lng: 106.66002415769374 },
  { lat: 10.772852090456192, lng: 106.6575775799744 },
  { lat: 10.77404592132156, lng: 106.65984371362426 }
];

interface MarkerWithInfoProps {
  position: { lat: number; lng: number };
  key: number;
}

const MarkerWithInfo: React.FC<MarkerWithInfoProps> = ({ position }) => {
  const [infowindowOpen, setInfowindowOpen] = useState(false);
  const [markerRef, marker] = useMarkerRef();
  return (
    <>
      <Marker
        ref={markerRef}
        position={position}
        icon={{
          url: 'https://pic.onlinewebfonts.com/thumbnails/icons_709501.svg',
          scaledSize: { width: 25, height: 25, equals: () => true }
        }}
        onMouseOver={() => setInfowindowOpen(true)}
        onMouseOut={() => setInfowindowOpen(false)}
      />

      {infowindowOpen && (
        <InfoWindow anchor={marker}>
          <Card className='mt-6 w-96'>
            <CardBody>
              <Typography variant='h5' color='blue-gray' className='mb-2'>
                UI/UX Review Check
              </Typography>
              <Typography>
                The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to
                &quot;Naviglio&quot; where you can enjoy the main night life in Barcelona.
              </Typography>
            </CardBody>
            <CardFooter className='pt-0'>
              <Button>Read More</Button>
            </CardFooter>
          </Card>
        </InfoWindow>
      )}
    </>
  );
};

export function SimpleMap() {
  const defaultProps = {
    center: {
      lat: 10.77404592132156,
      lng: 106.65984371362426
    },
    zoom: 16
  };

  return (
    // Important! Always set the container height explicitly
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}>
      <Map
        style={{ width: '100%', height: '100vh' }}
        zoom={defaultProps.zoom}
        center={defaultProps.center}
        mapId={'key'}
      >
        {HCMUT_CORNERS.map((corner, index) => (
          <MarkerWithInfo key={index} position={corner} />
        ))}
      </Map>
    </APIProvider>
  );
}
