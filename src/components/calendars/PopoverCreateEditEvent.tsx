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
import { formatDate } from '@/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';

const FormSchema = z.object({
  dob: z.date({
    required_error: 'A date of birth is required.'
  })
});

export function CreateEvent() {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate('/calendar');
  };
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 pl-4 flex flex-col gap-4'>
        <FormField
          control={form.control}
          name='dob'
          render={({ field }) => (
            <FormItem className='flex flex-col gap-3'>
              <textarea
                className='w-[450px] text-[28px] font-normal tracking-[.00625em] resize-none overflow-hidden font-sans py-1 border-b-[1px] border-slate-500 focus:border-b-2 focus:border-blue-700 outline-none caret-blue-700'
                defaultValue={'Thêm tiêu đề'}
                rows={1}
                cols={10}
                placeholder='Thêm tiêu đề'
                wrap='off'
              />
              <div className='flex items-center gap-4'>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[200px] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          formatDate({ date: field.value, type: 'start' })
                        ) : (
                          <span>Ngày bắt đầu</span>
                        )}
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
                <p>đến</p>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[200px] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          formatDate({ date: field.value, type: 'start' })
                        ) : (
                          <span>Ngày kết thúc</span>
                        )}
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
              </div>
              <Select>
                <SelectTrigger className='w-[200px] focus:outline-white focus:rounded-none'>
                  <SelectValue placeholder='Lặp lại' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='light'>Không lặp lại</SelectItem>
                  <SelectItem value='dark'>Tùy chỉnh</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
              <div className='flex items-center gap-4'>
                <MapPinned className='h-5 w-5' />
                <Select>
                  <SelectTrigger className='w-[200px] focus:outline-white focus:rounded-none'>
                    <SelectValue placeholder='Vị trí áp dụng' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='light'>Trường BK cơ sở 1</SelectItem>
                    <SelectItem value='dark'>Trường BK cơ sở 2</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className='w-[200px] focus:outline-white focus:rounded-none'>
                    <SelectValue placeholder='Vị trí áp dụng' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='light'>Sân A5</SelectItem>
                    <SelectItem value='dark'>Sân H1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='flex items-center gap-4'>
                <CalendarCheck className='h-5 w-5' />
                <Select>
                  <SelectTrigger className='w-[240px] focus:outline-white focus:rounded-none'>
                    <SelectValue placeholder='Mẫu chiếu sáng trong ngày' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='1'>Chiếu sáng lễ</SelectItem>
                    <SelectItem value='2'>Chiếu sáng đá bóng</SelectItem>
                    <SelectItem value='3'>Chiếu sáng khai giảng</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </FormItem>
          )}
        />
        <Button className='w-20 mt-0' type='submit' onClick={handleSubmit}>
          Lưu
        </Button>
      </form>
    </Form>
  );
}
