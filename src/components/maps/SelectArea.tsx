import { Select, Option } from '@material-tailwind/react';
import { useSmartPoleStore } from '@states';
import { useMemo } from 'react';

export const SelectArea = () => {
  const {
    areas,
    area,
    setZoom,
    setCenter,
    setArea,
    setRoad,
    getRoadsByArea,
    getSmartPoleByAreaAndRoad,
    getAllSmartPoles
  } = useSmartPoleStore();

  const areasList = useMemo(() => ['All', ...areas], [areas]);

  const animation = {
    mount: { y: 0 },
    unmount: { y: 25 }
  };

  const handleChange = (changedArea: string | undefined) => {
    if (!changedArea || changedArea === 'All') {
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
  };

  return (
    <div className='w-72'>
      <Select
        label='Select Area'
        animate={animation}
        onChange={handleChange}
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
  );
};
