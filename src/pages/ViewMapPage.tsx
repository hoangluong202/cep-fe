import { FilterSmartPole, SimpleMap } from '@components';

export function ViewMapPage() {
  return (
    <div className='flex flex-col h-full gap-y-2'>
      <FilterSmartPole />
      <SimpleMap />
    </div>
  );
}
