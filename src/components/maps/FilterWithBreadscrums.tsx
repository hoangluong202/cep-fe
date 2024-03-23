import { BreadcrumbsViewMap, SelectArea, SelectRoad } from '@components';

export const FilterWithBreadscrums = () => {
  return (
    <div className='flex justify-between'>
      <div>
        <BreadcrumbsViewMap />
      </div>
      <div className='flex flex-row-reverse gap-x-4'>
        <SelectRoad />
        <SelectArea />
      </div>
    </div>
  );
};
