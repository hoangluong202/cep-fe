import { Select, Option } from '@material-tailwind/react';
import { smartPoleService } from '@services';
import { useFilterSmartPoleStore } from '@states';
import { useQuery } from '@tanstack/react-query';
import { retryQueryFn } from '@utils';

export const FilterSmartPole = () => {
  const { area, road, name, setRoad, setArea, setName } = useFilterSmartPoleStore();

  const { data: areasList } = useQuery({
    queryKey: ['/api/areas'],
    queryFn: () => smartPoleService.getAllAreas(),
    retry: retryQueryFn
  });

  const { data: roadsList } = useQuery({
    queryKey: ['/api/roads', area],
    queryFn: () => smartPoleService.getRoadsByArea(area),
    retry: retryQueryFn
  });

  const { data: polesList } = useQuery({
    queryKey: ['/api/poles', area, road],
    queryFn: () => smartPoleService.getSmartPoleNameByAreaAndRoad(area, road),
    retry: retryQueryFn
  });

  if (!areasList) {
    return ['Default'];
  }

  if (!roadsList) {
    return ['Default'];
  }

  if (!polesList) {
    return ['Default'];
  }

  return (
    <div className='flex flex-row-reverse gap-x-4'>
      <div className='w-48'>
        <Select
          label='Chọn Smart Pole'
          animate={animation}
          onChange={(changedSmartPole) => {
            setName(changedSmartPole);
          }}
          selected={() => name}
          disabled={!road}
          value={name}
        >
          {polesList.map((road) => (
            <Option key={road} value={road}>
              {road}
            </Option>
          ))}
        </Select>
      </div>
      <div className='w-48'>
        <Select
          label='Chọn đường'
          animate={animation}
          onChange={(changedRoad) => {
            setRoad(changedRoad);
            setName(undefined);
          }}
          selected={() => road}
          disabled={!area}
          value={road}
        >
          {roadsList.map((road) => (
            <Option key={road} value={road}>
              {road}
            </Option>
          ))}
        </Select>
      </div>
      <div className='w-48'>
        <Select
          label='Chọn khu vực'
          animate={animation}
          onChange={(changedArea) => {
            setArea(changedArea);
            setRoad(undefined);
            setName(undefined);
          }}
          selected={() => area}
          value={area}
        >
          {areasList.map((area) => (
            <Option key={area} value={area}>
              {area}
            </Option>
          ))}
        </Select>
      </div>
    </div>
  );
};

const animation = {
  mount: { y: 0 },
  unmount: { y: 25 }
};
