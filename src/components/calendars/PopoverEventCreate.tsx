import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarCheck, CalendarIcon, MapPinned } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { calculatePosition, formatDate } from '@/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { CrossIcon } from '../common/icon';
import { GetBackConfirm } from './BackConfirm';
import { useCalendarStore } from '@/states';
import { useEffect, useState } from 'react';
import { AREA, GROUP, TEMPLATES } from '@/constants';
import { getByResourceId } from '@/utils/calendar';

const FormEventCreateSchema = z.object({
  name: z.string({
    required_error: 'Tên sự kiện không được để trống'
  }),
  startDate: z.date({
    required_error: 'Ngày bắt đầu không được để trống'
  }),
  endDate: z.date({
    required_error: 'Ngày kết thúc không được để trống'
  }),
  repeat: z.string({
    required_error: 'Lặp lại không được để trống'
  }),
  area: z.string({
    required_error: 'Khu vực không được để trống'
  }),
  group: z.string({
    required_error: 'Nhóm không được để trống'
  }),
  template: z.string({
    required_error: 'Mẫu chiếu sáng không được để trống'
  })
});

export function PopoverEventCreate() {
  const { eventCreate, events, setEvents, resetEventCreate } = useCalendarStore();
  const [t, setT] = useState('');
  const { areaKey, groupKey } = getByResourceId(eventCreate.data?.resourceId);
  const [displayEndDate, setDisplayEndDate] = useState(false);
  const isSameDayEvent = isSameDay(eventCreate.data?.start, eventCreate.data?.end);

  const form = useForm<z.infer<typeof FormEventCreateSchema>>({
    resolver: zodResolver(FormEventCreateSchema)
  });
  useEffect(() => {
    console.log('useEffect');
    if (eventCreate.data?.start && eventCreate.data?.end) {
      setDisplayEndDate(!isSameDayEvent);
      form.setValue('area', areaKey);
      form.setValue('group', groupKey ?? '');
      form.setValue('startDate', eventCreate.data?.start);
      form.setValue('endDate', eventCreate.data?.end);
      form.setValue('template', t);
    }
  }, [areaKey, eventCreate, form, groupKey, isSameDayEvent, t]);

  const handleShowEndDate = () => {
    setDisplayEndDate((prev) => !prev);
  };
  const { xR, yR } = setUpPosition({ clickX: eventCreate.clickX, clickY: eventCreate.clickY });
  const handleClose = () => {
    resetEventCreate();
  };
  const handleSubmit = () => {
    console.log('template', form.getValues('template'));
    onSubmit(form.getValues());
    setEvents([
      ...events,
      {
        id: events.length + 1,
        resourceId: eventCreate.data?.resourceId,
        title: form.getValues('name'),
        start: form.getValues('startDate'),
        end: form.getValues('endDate'),
        allDay: true,
        templateId: form.getValues('template'),
        backgroundColor: getColorTemplate(form.getValues('template'))
      }
    ]);
    resetEventCreate();
    form.reset();
  };

  function onSubmit(data: z.infer<typeof FormEventCreateSchema>) {
    console.log(data);
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      )
    });
  }

  return (
    eventCreate.visible && (
      <div
        className='flex flex-row gap-y-3 pr-2 pl-6 pt-2 pb-6 absolute w-[530px] rounded-lg border-2 z-10 bg-white shadow-2xl'
        style={{
          top: `${yR}px`,
          left: `${xR}px`
        }}
      >
        <div className='flex flex-row gap-1 items-start p-1'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 flex flex-col gap-4'>
              <div className='flex flex-col gap-3'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <textarea
                        {...field}
                        className='w-[450px] text-[28px] font-normal tracking-[.00625em] resize-none overflow-hidden font-sans py-1 border-b-[1px] border-slate-500 focus:border-b-2 focus:border-blue-700 outline-none caret-blue-700'
                        rows={1}
                        cols={10}
                        placeholder='Thêm tiêu đề'
                        wrap='off'
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='flex items-center gap-1'>
                  <FormField
                    control={form.control}
                    name='startDate'
                    render={({ field }) => (
                      <FormItem>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'w-[160px] pl-3 text-left font-normal',
                                  !field.value && 'text-muted-foreground'
                                )}
                              >
                                {!eventCreate.data?.start
                                  ? 'Ngày bắt đầu'
                                  : field.value
                                  ? formatDate({ date: field.value, type: 'start' })
                                  : formatDate({ date: eventCreate.data?.start, type: 'start' })}
                                <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className='w-auto p-0' align='start'>
                            <Calendar
                              mode='single'
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date('1900-01-01')}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {displayEndDate && (
                    <FormField
                      control={form.control}
                      name='endDate'
                      render={({ field }) => (
                        <div className='flex items-center'>
                          <p className='pr-1 text-[12px]'> đến </p>
                          <FormItem>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={'outline'}
                                    className={cn(
                                      'w-[160px] pl-3 text-left font-normal',
                                      !field.value && 'text-muted-foreground'
                                    )}
                                  >
                                    {!eventCreate.data?.end
                                      ? 'Ngày kết thúc'
                                      : field.value
                                      ? formatDate({ date: field.value, type: 'end' })
                                      : formatDate({ date: eventCreate.data?.end, type: 'end' })}
                                    <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className='w-auto p-0' align='start'>
                                <Calendar
                                  mode='single'
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => date < new Date('1900-01-01')}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </FormItem>
                        </div>
                      )}
                    />
                  )}
                  <Button
                    type='reset'
                    variant='outline'
                    className='text-[12px]'
                    onClick={handleShowEndDate}
                  >
                    {displayEndDate ? '- Một ngày' : '+ Nhiều ngày'}
                  </Button>
                </div>

                <FormField
                  control={form.control}
                  name='repeat'
                  render={({ field }) => (
                    <FormItem>
                      <Select {...field}>
                        <SelectTrigger className='w-[200px] focus:outline-white focus:rounded-none'>
                          <SelectValue placeholder='Lặp lại' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='light'>Không lặp lại</SelectItem>
                          <SelectItem value='dark'>Tùy chỉnh</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='flex items-center gap-4'>
                  <MapPinned className='h-5 w-5' />
                  <FormField
                    control={form.control}
                    name='area'
                    render={({ field }) => (
                      <FormItem>
                        <Select {...field}>
                          <SelectTrigger className='w-[200px] focus:outline-white focus:rounded-none'>
                            <SelectValue placeholder='Khu vực áp dụng' />
                          </SelectTrigger>
                          <SelectContent>
                            {AREA.map((area) => (
                              <SelectItem key={area.key} value={area.key}>
                                {area.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='group'
                    render={({ field }) => (
                      <FormItem>
                        <Select disabled={!form.watch('area')} {...field}>
                          <SelectTrigger className='w-[200px] focus:outline-white focus:rounded-none'>
                            <SelectValue placeholder='Nhóm áp dụng' />
                          </SelectTrigger>
                          <SelectContent>
                            {GROUP.map((group) => {
                              if (group.area === form.watch('area'))
                                return (
                                  <SelectItem key={group.key} value={group.key}>
                                    {group.label}
                                  </SelectItem>
                                );
                            })}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
                <div className='flex items-center gap-4'>
                  <CalendarCheck className='h-5 w-5' />
                  <FormField
                    control={form.control}
                    name='template'
                    render={({}) => (
                      <FormItem>
                        <Select onValueChange={(val) => setT(val)}>
                          <SelectTrigger className='w-[240px] focus:outline-white focus:rounded-none'>
                            <SelectValue placeholder='Mẫu chiếu sáng trong ngày' />
                          </SelectTrigger>
                          <SelectContent>
                            {TEMPLATES.map((t) => {
                              return (
                                <SelectItem key={t.id} value={t.id}>
                                  {t.name}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Button className='w-20 ml-auto' type='submit' onClick={handleSubmit}>
                Lưu
              </Button>
            </form>
          </Form>
          <GetBackConfirm icon={CrossIcon} handleGetBack={handleClose} />
        </div>
      </div>
    )
  );
}

const setUpPosition = ({ clickX, clickY }: { clickX: number; clickY: number }) => {
  const top = 100;
  const left = window.outerWidth / 6;
  const wElement = 530;
  const hElement = 415;
  const xCurElement = clickX;
  const yCurElement = clickY;
  const { xR, yR } = calculatePosition({
    top,
    left,
    wElement,
    hElement,
    xCurElement,
    yCurElement
  });
  return { xR, yR };
};

const isSameDay = (startDate: Date, endDate: Date) =>
  formatDate({ date: startDate, type: 'start' }) === formatDate({ date: endDate, type: 'end' });

const getColorTemplate = (id: string) => {
  const template = TEMPLATES.find((t) => t.id === id);
  return template?.color;
};
