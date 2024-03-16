import { Select, Option, Breadcrumbs } from '@material-tailwind/react';
import { useSmartPoleStore } from '@states';
import { useEffect, useMemo } from 'react';

const FilterRoad = () => {
  const { area, road, roads, setRoad, getSmartPoleByAreaAndRoad } = useSmartPoleStore();
  const roadsList = useMemo(() => ['All', ...roads], [roads]);

  //when area or road change, get smartPole by area and road
  useEffect(() => {
    getSmartPoleByAreaAndRoad(area, road);
  }, [area, road, getSmartPoleByAreaAndRoad]);

  return (
    <div className='w-72'>
      <Select
        label='Select Road'
        animate={{
          mount: { y: 0 },
          unmount: { y: 25 }
        }}
        onChange={(changedRoad) => {
          if (changedRoad !== road) {
            setRoad(changedRoad);
          }
        }}
        disabled={!area}
        value={road}
      >
        {roadsList.map((road) => (
          <Option key={road} value={road === 'All' ? undefined : road}>
            {road}
          </Option>
        ))}
      </Select>
    </div>
  );
};

const FilterArea = () => {
  const {
    areas,
    setZoom,
    setCenter,
    setArea,
    setRoad,
    getRoadsByArea,
    getSmartPoleByAreaAndRoad,
    getAllSmartPoles
  } = useSmartPoleStore();

  const areasList = useMemo(() => ['All', ...areas], [areas]);

  return (
    <div className='w-72'>
      <Select
        label='Select Area'
        animate={{
          mount: { y: 0 },
          unmount: { y: 25 }
        }}
        onChange={(changedArea) => {
          if (changedArea === 'All' || !changedArea) {
            setArea(undefined);
            setRoad(undefined);
            setZoom(9);
            setCenter({ lat: 10.773017439609882, lng: 106.65962377272723 });
            getAllSmartPoles();
          } else {
            setArea(changedArea);
            setRoad(undefined);
            getRoadsByArea(changedArea);
            setZoom(16);
            changedArea === 'HCMUT CS1'
              ? setCenter({ lat: 10.773017439609882, lng: 106.65962377272723 })
              : setCenter({ lat: 10.880526881399694, lng: 106.80539702296404 });
            getSmartPoleByAreaAndRoad(changedArea);
          }
        }}
      >
        {areasList.map((area) => (
          <Option key={area} value={area}>
            {area}
          </Option>
        ))}
      </Select>
    </div>
  );
};

const BreadcrumbsViewMap = () => {
  const { area, road } = useSmartPoleStore();
  return (
    <Breadcrumbs className='order-first'>
      <a href='#' className='opacity-60 flex flex-row gap-x-0.5'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 16 16'
          fill='currentColor'
          className='w-4 h-4'
        >
          <path
            fillRule='evenodd'
            d='m7.539 14.841.003.003.002.002a.755.755 0 0 0 .912 0l.002-.002.003-.003.012-.009a5.57 5.57 0 0 0 .19-.153 15.588 15.588 0 0 0 2.046-2.082c1.101-1.362 2.291-3.342 2.291-5.597A5 5 0 0 0 3 7c0 2.255 1.19 4.235 2.292 5.597a15.591 15.591 0 0 0 2.046 2.082 8.916 8.916 0 0 0 .189.153l.012.01ZM8 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z'
            clipRule='evenodd'
          />
        </svg>

        <span>View Map</span>
      </a>
      {area && area !== 'All' && (
        <a href='#' className='opacity-60'>
          <span>{area}</span>
        </a>
      )}
      {road && road !== 'All' && (
        <a href='#' className='opacity-60'>
          <span>{road}</span>
        </a>
      )}
    </Breadcrumbs>
  );
};

export const Filter = () => {
  return (
    <div className='flex justify-between'>
      <div>
        <BreadcrumbsViewMap />
      </div>
      <div className='flex flex-row-reverse gap-x-4'>
        <FilterRoad />
        <FilterArea />
      </div>
    </div>
  );
};
