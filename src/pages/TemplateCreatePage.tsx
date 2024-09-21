import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem } from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { Ban, CirclePlus, Settings } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { ButtonIcon } from '@/components';

const FormSchema = z.object({
  dob: z.date({
    required_error: 'A date of birth is required.'
  })
});

export function TemplateCreatePage() {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 p-8 flex flex-col gap-4'>
        <FormField
          control={form.control}
          name='dob'
          render={({}) => (
            <FormItem className='flex flex-col gap-3 max-w-[600px]'>
              <div className='flex flex-col gap-1'>
                <div className='flex flex-row justify-between items-center mr-3'>
                  <textarea
                    className='w-[450px] text-[28px] font-normal tracking-[.00625em] resize-none overflow-hidden font-sans py-1 border-b-[1px] border-slate-500 focus:border-b-2 focus:border-blue-700 outline-none caret-blue-700'
                    rows={1}
                    cols={10}
                    placeholder='Thêm tiêu đề'
                    wrap='off'
                  />
                  <input type='color' />
                </div>
              </div>

              <div className='flex flex-col gap-1'>
                <div className='flex flex-row items-center gap-4'>
                  <Settings />
                  <div className='flex flex-col'>
                    <p className='text-[18px] font-[600] text-black'> Mẫu chiếu sáng trong ngày</p>
                    <p className='text-[14px] font-[400] text-gray-500'>
                      Thiết lập cường độ chiếu sáng theo từng khung giờ
                    </p>
                  </div>
                </div>
                <div className='flex flex-row gap-24'>
                  <p className='pl-2 font-bold text-[14px]'>Bắt đầu từ</p>
                  <p className='pl-6 font-bold text-[14px]'> Kết thúc vào</p>
                  <p className='font-bold text-[14px]'>Độ sáng</p>
                </div>
                <div className='flex flex-row gap-24'>
                  <p className='pl-2 text-[14px] font-[400] text-gray-500'>(hh:mm)</p>
                  <p className='pl-10 text-[14px] font-[400] text-gray-500'>(hh:mm)</p>
                  <p className='pl-10 text-[14px] font-[400] text-gray-500'>%</p>
                </div>
                <div className='flex flex-col gap-1 h-[200px] overflow-y-auto bg-gray-100 p-2 rounded-lg'>
                  <div className='flex flex-row items-center'>
                    <Select>
                      <SelectTrigger className='w-[80px] focus:outline-white focus:rounded-none'>
                        <SelectValue placeholder='Giờ' />
                      </SelectTrigger>
                      <SelectContent className='max-h-[200px]'>
                        {Array.from({ length: 24 }, (_, i) => (
                          <SelectItem className='w-[100px]' key={i} value={i.toString()}>
                            {i.toString().padStart(2, '0')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p> : </p>
                    <Select>
                      <SelectTrigger className='w-[80px] focus:outline-white focus:rounded-none'>
                        <SelectValue placeholder='Phút' />
                      </SelectTrigger>
                      <SelectContent className='max-h-[200px]'>
                        {Array.from({ length: 60 }, (_, i) => (
                          <SelectItem className='w-[100px]' key={i} value={i.toString()}>
                            {i.toString().padStart(2, '0')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className='mx-3'> - </p>
                    <Select>
                      <SelectTrigger className='w-[80px] focus:outline-white focus:rounded-none'>
                        <SelectValue placeholder='Giờ' />
                      </SelectTrigger>
                      <SelectContent className='max-h-[200px]'>
                        {Array.from({ length: 24 }, (_, i) => (
                          <SelectItem className='w-[100px]' key={i} value={i.toString()}>
                            {i.toString().padStart(2, '0')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p> : </p>
                    <Select>
                      <SelectTrigger className='w-[80px] focus:outline-white focus:rounded-none'>
                        <SelectValue placeholder='Phút' />
                      </SelectTrigger>
                      <SelectContent className='max-h-[200px]'>
                        {Array.from({ length: 60 }, (_, i) => (
                          <SelectItem className='w-[100px]' key={i} value={i.toString()}>
                            {i.toString().padStart(2, '0')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger className='w-[150px] mx-4 focus:outline-white focus:rounded-none'>
                        <SelectValue placeholder='Độ sáng' />
                      </SelectTrigger>
                      <SelectContent className='max-h-[150px]'>
                        {Array.from({ length: 101 }, (_, i) => (
                          <SelectItem className='w-[100px]' key={i} value={i.toString()}>
                            {i.toString()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <ButtonIcon
                      icon={<Ban className='text-gray-500 group-hover/button:text-red-500' />}
                      className='h-6 w-6 mx-2'
                    />
                    <ButtonIcon
                      icon={<CirclePlus className='text-gray-500 group-hover/button:text-black' />}
                      className='h-6 w-6 mx-2'
                    />
                  </div>
                </div>
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
