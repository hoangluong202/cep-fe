import { PairLocation, Position, TPoleData } from '@/types/smartPole';
import { faker } from '@faker-js/faker';

export const generateSmartPole = (): TPoleData[] => {
  let id: number = 1;
  const poles: TPoleData[] = [];
  const areas = ['hcmut1', 'hcmut2'];
  const distancesBetweenPoles = 25;
  const pairsLocation1 = [
    [10.772154517587094, 106.65799078417935, 10.773973404329478, 106.66141965196553],
    [10.772900034045186, 106.66057025910759, 10.774600991655372, 106.65958636895377]
  ];
  const pairsLocation2 = [
    [10.879581718567092, 106.80506817435548, 10.881214517372676, 106.80612433797691],
    [10.879514898028798, 106.80526521255692, 10.88049780898303, 106.8059399048784],
    [10.880399641876274, 106.80741689225768, 10.882045506520996, 106.8048302579133],
    [10.879452600546452, 106.80519804362596, 10.88024275291121, 106.80393910293876],
    [10.879792385828841, 106.80702536364485, 10.881080660861091, 106.8050095484772],
    [10.880621599755438, 106.80473344646668, 10.880171722814598, 106.80541198754605],
    [10.880500334787325, 106.80748321093425, 10.882131160979615, 106.80488639755671],
    [10.881781905048289, 106.80607683920181, 10.88148992441128, 106.8060820666026],
    [10.880792495983851, 106.80419573461363, 10.880351574223042, 106.80393217927262],
    [10.880666344583583, 106.80577049653942, 10.881199424655708, 106.80611310911006],
    [10.880539504022975, 106.80596452718419, 10.881074203638493, 106.80628303949877],
    [10.879034630246244, 106.80517898908967, 10.880392523424032, 106.80609532500617],
    [10.878384676799945, 106.80609970560249, 10.879010129097457, 106.80520511776747]
  ];

  const formatPairsLocation = (pairsLocation1: number[][]): PairLocation[] => {
    return pairsLocation1.map((pairLocation) => {
      return {
        start: {
          lat: pairLocation[0],
          lng: pairLocation[1]
        },
        end: {
          lat: pairLocation[2],
          lng: pairLocation[3]
        }
      };
    });
  };

  /**
   * Using Haversine formula to calculate the distance between two points
   */
  const calculateDistance = (start: Position, end: Position): number => {
    const R = 6371 * 1000; // Radius of the earth in m
    const dLat = deg2rad(end.lat - start.lat); // deg2rad below
    const dLng = deg2rad(end.lng - start.lng);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(start.lat)) *
        Math.cos(deg2rad(end.lat)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in m
    return Math.round(distance);
  };
  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
  };
  const amountOfPoles = (start: Position, end: Position): number => {
    return Math.floor(calculateDistance(start, end) / distancesBetweenPoles);
  };

  areas.forEach((area) => {
    const pairLocations =
      area === 'hcmut1' ? formatPairsLocation(pairsLocation1) : formatPairsLocation(pairsLocation2);
    for (const pairLocation of pairLocations) {
      const amount = amountOfPoles(pairLocation.start, pairLocation.end);
      for (let i = 0; i <= amount; i++) {
        const status = faker.number.int({ min: 0, max: 10 }) === 0 ? false : true;
        const lightLevel = status ? faker.number.int({ min: 0, max: 100 }) : 0;
        const poleId = id++;
        const power = 100;
        const voltage = 220;
        const pole: TPoleData = {
          id: poleId.toString(),
          areaKey: area,
          position: {
            lat: ((amount - i) * pairLocation.start.lat + i * pairLocation.end.lat) / amount,
            lng: ((amount - i) * pairLocation.start.lng + i * pairLocation.end.lng) / amount
          },
          status: status,
          dimming: lightLevel,
          burningDuration: faker.number.int({
            min: 0,
            max: 1000
          }),
          frequency: faker.number.int({ min: 0, max: 100 }),
          current: parseFloat((power / voltage).toFixed(2)),
          voltage: voltage,
          power: power
        };
        poles.push(pole);
      }
    }
  });

  return poles;
};
