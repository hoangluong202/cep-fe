import { Select, Option } from '@material-tailwind/react';
import { useSmartPoleStore } from '@states';
import { useEffect, useMemo } from 'react';

export const SelectRoad = () => {
  const { area, road, roads, setRoad, getSmartPoleByAreaAndRoad } = useSmartPoleStore();
  const roadsList = useMemo(() => ['All', ...roads], [roads]);
  const animation = {
    mount: { y: 0 },
    unmount: { y: 25 }
  };

  useEffect(() => {
    getSmartPoleByAreaAndRoad(area, road);
  }, [area, road, getSmartPoleByAreaAndRoad]);

  const handleChange = (changedRoad: string | undefined) => {
    if (changedRoad === 'All') {
      setRoad(undefined);
    } else {
      setRoad(changedRoad);
    }
  };

  return (
    <div className='w-72'>
      <Select
        label='Select Road'
        animate={animation}
        onChange={handleChange}
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
  );
};
