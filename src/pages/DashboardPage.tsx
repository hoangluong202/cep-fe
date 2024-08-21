import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function DashboardPage() {
  return (
    <>
      <Tabs defaultValue='all'>
        <TabsList>
          <TabsTrigger value='all' onClick={(val) => console.log(val)}>
            Tất cả
          </TabsTrigger>
          <TabsTrigger value='active'>Đang bật</TabsTrigger>
          <TabsTrigger value='inactive'>Đang tắt</TabsTrigger>
        </TabsList>
      </Tabs>
    </>
  );
}
