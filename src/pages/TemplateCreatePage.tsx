import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftFromLine, Ban, CirclePlus } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { ButtonIcon } from '@/components';
import { Slider } from '@/components/ui/slider';
import {
  TemplateDescription,
  TemplateLightSettingLabel
} from '@/components/calendars/TemplateDetail';

const lightSettingSchema = z.object({
  startHour: z.number().min(0).max(23),
  startMinute: z.number().min(0).max(59),
  endHour: z.number().min(0).max(23),
  endMinute: z.number().min(0).max(59),
  dimming: z.number().min(0).max(100)
});

export const formTemplateSchema = z.object({
  name: z.string(),
  color: z.string(),
  lightSettings: z.array(lightSettingSchema)
});

const defaultValues: TTemplateData = {
  id: '',
  name: '',
  color: '#00ff00',
  lightSettings: [
    {
      startHour: 20,
      startMinute: 0,
      endHour: 21,
      endMinute: 30,
      dimming: 50
    }
  ]
};

export function TemplateCreatePage() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate('/calendar');
  };
  const form = useForm<z.infer<typeof formTemplateSchema>>({
    resolver: zodResolver(formTemplateSchema),
    defaultValues: defaultValues
  });
  function onSubmit(data: z.infer<typeof formTemplateSchema>) {
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
    <div className='flex flex-col gap-4 w-[650px] pl-8 pt-2'>
      <Button variant='ghost' className='gap-2 w-fit border-2' onClick={handleGoBack}>
        <ArrowLeftFromLine />
        <span>Trở lại</span>
      </Button>
      <TemplateDescription />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          <div className='flex flex-row justify-between items-start mr-3'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='flex flex-col gap-3 max-w-[600px]'>
                  <FormControl>
                    <textarea
                      className='w-[450px] text-[28px] font-normal tracking-[.00625em] resize-none overflow-hidden font-sans py-1 border-b-[1px] border-slate-500 focus:border-b-2 focus:border-blue-700 outline-none caret-blue-700'
                      rows={1}
                      cols={10}
                      placeholder='Thêm tên mẫu'
                      wrap='off'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='color'
              render={({ field }) => (
                <FormItem className='flex flex-col gap-3 max-w-[600px]'>
                  <FormControl>
                    <input type='color' {...field} defaultValue='#00ff00' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='lightSettings'
            render={({ field }) => (
              <div className='flex flex-col gap-1'>
                <TemplateLightSettingLabel />
                <div className='flex flex-col gap-1 overflow-y-auto max-h-[320px] bg-gray-100 p-2 rounded-lg'>
                  {field.value.map((lightSetting, index) => (
                    <div key={index} className='flex flex-row items-center'>
                      <FormField
                        control={form.control}
                        name={`lightSettings.${index}.startHour`}
                        render={({ field }) => (
                          <FormItem className='w-[80px]'>
                            <Select
                              value={field.value?.toString()}
                              onValueChange={(val) => {
                                field.onChange(parseInt(val));
                              }}
                            >
                              <FormControl>
                                <SelectTrigger className='w-[80px] focus:outline-white focus:rounded-none'>
                                  <SelectValue placeholder='Giờ' {...field} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className='max-h-[200px]'>
                                {Array.from({ length: 24 }, (_, i) => (
                                  <SelectItem className='w-[100px]' key={i} value={i.toString()}>
                                    {i.toString().padStart(2, '0')}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <p className='pt-2'> : </p>
                      <FormField
                        control={form.control}
                        name={`lightSettings.${index}.startMinute`}
                        render={({ field }) => (
                          <FormItem className='w-[80px]'>
                            <Select
                              value={field.value?.toString()}
                              onValueChange={(val) => {
                                const updatedValue = parseInt(val);
                                field.onChange(updatedValue); //not trigger re-render
                              }}
                            >
                              <FormControl>
                                <SelectTrigger className='w-[80px] focus:outline-white focus:rounded-none'>
                                  <SelectValue placeholder='Phút' {...field} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className='max-h-[200px]'>
                                {Array.from({ length: 60 }, (_, i) => (
                                  <SelectItem className='w-[100px]' key={i} value={i.toString()}>
                                    {i.toString().padStart(2, '0')}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <p className='pt-2 px-3'> - </p>
                      <FormField
                        control={form.control}
                        name={`lightSettings.${index}.endHour`}
                        render={({ field }) => (
                          <FormItem className='w-[80px]'>
                            <Select
                              value={field.value?.toString()}
                              onValueChange={(val) => {
                                const updatedValue = parseInt(val);
                                field.onChange(updatedValue); // Update the form's internal state
                                // update to trigger re-render
                                const updatedLightSettings = [...form.getValues('lightSettings')];
                                updatedLightSettings[index].startMinute = updatedValue;
                                form.setValue('lightSettings', updatedLightSettings);
                              }}
                            >
                              <FormControl>
                                <SelectTrigger className='w-[80px] focus:outline-white focus:rounded-none'>
                                  <SelectValue placeholder='Giờ' {...field} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className='max-h-[200px]'>
                                {Array.from({ length: 24 }, (_, i) => (
                                  <SelectItem className='w-[100px]' key={i} value={i.toString()}>
                                    {i.toString().padStart(2, '0')}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <p className='pt-2'> : </p>
                      <FormField
                        control={form.control}
                        name={`lightSettings.${index}.endMinute`}
                        render={({ field }) => (
                          <FormItem className='w-[80px]'>
                            <Select
                              value={field.value?.toString()}
                              onValueChange={(val) => {
                                field.onChange(parseInt(val));
                              }}
                            >
                              <FormControl>
                                <SelectTrigger className='w-[80px] focus:outline-white focus:rounded-none'>
                                  <SelectValue placeholder='Phút' {...field} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className='max-h-[200px]'>
                                {Array.from({ length: 60 }, (_, i) => (
                                  <SelectItem className='w-[100px]' key={i} value={i.toString()}>
                                    {i.toString().padStart(2, '0')}
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
                        name={`lightSettings.${index}.dimming`}
                        render={({ field }) => (
                          <FormItem className='flex flex-row w-32 pt-1 mx-2 gap-2 items-center'>
                            <FormControl>
                              <Slider
                                className='w-32'
                                min={0}
                                max={100}
                                step={1}
                                value={[field.value ?? 0]}
                                onValueChange={(value) => field.onChange(value[0])}
                              />
                            </FormControl>
                            <div className='text-sm pb-2'>{field.value ?? 0}</div>
                            <br />
                          </FormItem>
                        )}
                      />
                      <ButtonIcon
                        icon={
                          <Ban
                            className={`${
                              field.value.length <= 1 ? 'text-gray-300' : 'text-red-500'
                            }`}
                          />
                        }
                        className='h-6 w-6 mx-2'
                        disabled={field.value.length <= 1}
                        type='button'
                        onClick={() => {
                          field.value.splice(index, 1);
                          form.setValue('lightSettings', field.value);
                        }}
                      />
                      {index === 0 && (
                        <ButtonIcon
                          icon={
                            <CirclePlus
                              className={`${
                                field.value[field.value.length - 1].endHour === 0
                                  ? 'text-gray-500'
                                  : 'text-black'
                              } `}
                            />
                          }
                          className='h-6 w-6 mx-2'
                          disabled={field.value[field.value.length - 1].endHour === 0}
                          type='button'
                          onClick={() => {
                            const last = field.value[field.value.length - 1];
                            field.value.push({
                              startHour: last.endHour,
                              startMinute: last.endMinute,
                              endHour: 0,
                              endMinute: 0,
                              dimming: 50
                            });
                            form.setValue('lightSettings', field.value);
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          />

          <div className='flex flex-row justify-end items-center gap-2'>
            <Button
              variant='outline'
              className='border-2'
              type='button'
              onClick={() => {
                form.reset(defaultValues);
              }}
            >
              Làm mới
            </Button>
            <Button
              className='w-20 mt-0'
              type='submit'
              disabled={!form.formState.isValid || form.formState.isSubmitting}
            >
              Lưu
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
