import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';

export function useDrawingManager(
  drawingControl: boolean,
  initialValue: google.maps.drawing.DrawingManager | null = null
) {
  const map = useMap();
  const drawing = useMapsLibrary('drawing');

  const [drawingManager, setDrawingManager] = useState<google.maps.drawing.DrawingManager | null>(
    initialValue
  );

  useEffect(() => {
    if (!map || !drawing) return;

    // https://developers.google.com/maps/documentation/javascript/reference/drawing
    const newDrawingManager = new drawing.DrawingManager({
      map,
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: drawingControl,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [google.maps.drawing.OverlayType.POLYGON]
      },
      polygonOptions: {
        editable: true,
        draggable: true
      }
    });

    // Add event listener for overlaycomplete
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google.maps.event.addListener(newDrawingManager, 'overlaycomplete', (event: any) => {
      if (event.type === google.maps.drawing.OverlayType.POLYGON) {
        const polyline = event.overlay;
        const path = polyline.getPath();
        const positions = [];
        for (let i = 0; i < path.getLength(); i++) {
          const latLng = path.getAt(i);
          positions.push({ lat: latLng.lat(), lng: latLng.lng() });
        }
        console.log('Polygone positions:', positions);
        // You can store or use the positions as needed
      }
    });

    setDrawingManager(newDrawingManager);

    return () => {
      newDrawingManager.setMap(null);
    };
  }, [drawing, drawingControl, map]);

  return drawingManager;
}
