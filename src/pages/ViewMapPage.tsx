import { useSmartPoleStore } from '@states';
import { SimpleMap, Filter } from '@components';
import { useEffect } from 'react';

export function ViewMapPage() {
  const { getAllSmartPoles, getAllAreas } = useSmartPoleStore();
  console.log('In page view map');

  useEffect(() => {
    getAllSmartPoles();
    getAllAreas();
  }, []);

  return (
    <div className='flex flex-col h-full gap-y-2'>
      <Filter />
      <SimpleMap />
    </div>
  );
}
