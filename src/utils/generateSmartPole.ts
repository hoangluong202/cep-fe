import { faker } from '@faker-js/faker';

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

/**
 * Using Haversine formula to calculate the distance between two points
 */
const calculateDistance = (point1: Position, point2: Position): number => {
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

export const LOCATION = [
  {
    area: 'HCMUT CS1',
    road: ['Đường 1', 'Đường 2', 'Đường 3', 'Đường 4', 'Đường 5']
  },
  {
    area: 'HCMUT CS2',
    road: ['Đường 1', 'Đường 2', 'Đường 3', 'Đường 4', 'Đường 5', 'Đường 6', 'Đường 7']
  }
];

export const generateSmartPole = (
  start: Position,
  end: Position,
  distance: number,
  area: string,
  road: string
): SmartPole[] => {
  const smartPoles: SmartPole[] = [];

  const lengthRoad = calculateDistance(start, end);
  const n = Math.floor(lengthRoad / distance);

  const itemStart: SmartPole = {
    id: '0',
    area: area,
    road: road,
    position: start,
    status: faker.datatype.boolean(),
    level: faker.number.int({ min: 0, max: 100 }),
    burningHours: faker.number.float({ min: 10, max: 300, multipleOf: 0.02 }),
    frequency: faker.number.int({ min: 0, max: 100 })
  };
  smartPoles.push(itemStart);
  for (let i = 1; i < n; i++) {
    const lat = ((n - i) * start.lat + i * end.lat) / n;
    const lng = ((n - i) * start.lng + i * end.lng) / n;
    const item: SmartPole = {
      id: i.toString(),
      area: area,
      road: road,
      position: { lat, lng },
      status: faker.datatype.boolean(),
      level: faker.number.int({ min: 0, max: 100 }),
      burningHours: faker.number.float({ min: 10, max: 300, multipleOf: 0.02 }),
      frequency: faker.number.int({ min: 0, max: 100 })
    };
    smartPoles.push(item);
  }
  return smartPoles;
};
