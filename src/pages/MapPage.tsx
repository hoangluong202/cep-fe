import { Map, AdvancedMarker, MapControl, ControlPosition } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import lightOnIcon from '@assets/svg/light-on.svg';
import lightOffIcon from '@assets/svg/light-off.svg';
import lightChooseIcon from '@assets/svg/light-choose.svg';
import { UndoRedoControl } from '@components';
import { MapSmartPoleFilter } from '@/components/maps/filter';
import { useDrawingManager } from '@/components/maps/use-drawing-manager';
import { CardSmartPoleInfo } from '@/components/maps/pole-info';
import { CreateGroup } from '@/components/maps/CreateGroup';
import { useFilterSmartPoleStore } from '@/states';
import { useQuery } from '@tanstack/react-query';
import { smartPoleService } from '@/services';

const CreateIcon = (
  <svg width='36' height='36' viewBox='0 0 36 36'>
    <path fill='#34A853' d='M16 16v14h4V20z'></path>
    <path fill='#4285F4' d='M30 16H20l-4 4h14z'></path>
    <path fill='#FBBC05' d='M6 16v4h10l4-4z'></path>
    <path fill='#EA4335' d='M20 16V6h-4v14z'></path>
    <path fill='none' d='M0 0h36v36H0z'></path>
  </svg>
);

export function MapPage() {
  const [showCard, setShowCard] = useState(false);
  const [selectedSmartPoleId, setSelectedSmartPoleId] = useState<number | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const drawingManager = useDrawingManager(isDrawing);
  const { center, setCenter, zoom, setZoom, areaSelected, groupSelected, statusSelected } =
    useFilterSmartPoleStore();
  const [filteredSmartPoles, setFilteredSmartPoles] = useState<number[]>([]);

  const { data: smartPoles } = useQuery({
    queryKey: ['smartpoles', areaSelected, groupSelected, statusSelected],
    queryFn: () =>
      smartPoleService.getMany({
        areaKey: areaSelected,
        groupKey: groupSelected,
        status: statusSelected === 'on' ? true : statusSelected === 'off' ? false : undefined
      })
  });

  const handleMarkerClick = (smartPoleId: number) => {
    if (selectedSmartPoleId === smartPoleId) setShowCard(!showCard);
    else setShowCard(true);
    setSelectedSmartPoleId(smartPoleId);
  };

  const handleDataFromChild = (isDrawing: boolean) => {
    setIsDrawing(isDrawing);
  };

  useEffect(() => {
    if (drawingManager) {
      drawingManager.setDrawingMode(isDrawing ? google.maps.drawing.OverlayType.POLYLINE : null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      google.maps.event.addListener(drawingManager, 'overlaycomplete', (event: any) => {
        if (event.type === google.maps.drawing.OverlayType.POLYGON) {
          const polygon = event.overlay;
          const path = polygon.getPath();
          const getPolygonPoints = () => {
            const positions = [];
            for (let i = 0; i < path.getLength(); i++) {
              const latLng = path.getAt(i);
              positions.push({ lat: latLng.lat(), lng: latLng.lng() });
            }
            return positions;
          };
          const polygonPoints = new google.maps.Polygon({
            paths: getPolygonPoints()
          });
          smartPoles?.data?.filter((pole) => {
            if (google.maps.geometry.poly.containsLocation(pole.position, polygonPoints)) {
              pole.color = 'selected';
            }
          });
          const filtered = smartPoles?.data?.filter((pole) => pole.color === 'selected');
          setFilteredSmartPoles(filtered?.map((pole) => pole.id) || []);
        }
      });
    }
  }, [isDrawing, drawingManager]);

  return (
    <div className='relative h-screen w-full px-2'>
      <Map
        mapId='1'
        zoom={zoom}
        center={center}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        onCameraChanged={(ev) => {
          setCenter(ev.detail.center);
          setZoom(ev.detail.zoom);
        }}
      >
        {smartPoles?.data?.map((smartPole) => (
          <AdvancedMarker
            key={smartPole.id}
            position={smartPole.position}
            onClick={() => handleMarkerClick(smartPole.id)}
          >
            <img
              src={
                smartPole.color === 'selected'
                  ? lightChooseIcon
                  : smartPole.status
                  ? lightOnIcon
                  : lightOffIcon
              }
              width={smartPole.id === selectedSmartPoleId && showCard ? 40 : 20}
              height={20}
            />
          </AdvancedMarker>
        ))}
      </Map>
      {!isDrawing && (
        <>
          <MapSmartPoleFilter />
          <button
            className='absolute top-4 right-10 z-10 bg-white p-2 rounded-lg flex flex-col items-center gap-1'
            onClick={async () => {
              setIsDrawing(true);
            }}
          >
            {CreateIcon}
            <p className='font-bold text-[14px]'>Tạo nhóm</p>
          </button>
        </>
      )}
      {isDrawing && (
        <CreateGroup sendDataToParent={handleDataFromChild} smartPoleIds={filteredSmartPoles} />
      )}
      <div className='absolute left-4 top-1 z-0 h-full'>
        {showCard && (
          <CardSmartPoleInfo
            smartPole={smartPoles?.data?.find((item) => item.id === selectedSmartPoleId)}
          />
        )}
      </div>
      <MapControl position={ControlPosition.TOP_CENTER}>
        <UndoRedoControl drawingManager={drawingManager} isDrawing={isDrawing} />
      </MapControl>
    </div>
  );
}
