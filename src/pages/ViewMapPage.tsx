import { useFilterSmartPoleStore, useSmartPoleStore } from '@states';
import { FilterWithBreadscrums, SimpleMap } from '@components';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { smartPoleService } from '@services';
import { retryQueryFn } from '@utils';

export function ViewMapPage() {
  const { area, road, name } = useFilterSmartPoleStore();

  const { data: smartPoles } = useQuery({
    queryKey: ['/api/poles', area, road, name],
    queryFn: () => smartPoleService.getBy(area, road, name),
    retry: retryQueryFn
  });
  console.log('SmartPoles', smartPoles);

  const { getAllSmartPoles, getAllAreas } = useSmartPoleStore();
  console.log('In page view map');

  useEffect(() => {
    getAllSmartPoles();
    getAllAreas();
  }, []);

  return (
    <div className='flex flex-col h-full gap-y-2'>
      <FilterWithBreadscrums />
      <SimpleMap />
    </div>
  );
}
