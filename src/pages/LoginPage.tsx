import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import { UserCircleIcon, KeyIcon } from '@heroicons/react/24/outline';
import { authService, server } from '@services';
import { useUserQuery } from '@hooks';
import { useMutation } from '@tanstack/react-query';
import { NavigateFunction, useNavigate } from 'react-router-dom';

export function LoginPage() {
  const navigate: NavigateFunction = useNavigate();
  const {
    info: { refetch }
  } = useUserQuery();

  const { register, handleSubmit } = useForm<LoginFormData>();

  const loginNormal = useMutation({
    mutationKey: ['loginNormal'],
    mutationFn: async (data: LoginFormData) => {
      const response = await authService.login(data);
      const { access_token } = response;
      localStorage.setItem('authToken', access_token);
      server.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      return response;
    }
  });
  const submit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      await loginNormal.mutateAsync(data);
      await refetch();
      toast.success('Login successfully!');
      navigate('/map');
    } catch (err) {
      const errorMessage = (err as ResponseError).message;
      toast.error(errorMessage);
    }
  };

  return (
    <div className="h-screen grid grid-cols-3 gap-8 bg-center bg-cover bg-fixed bg-no-repeat bg-[url('/src/assets/background-login.jpg')]">
      <div className='grid col-span-2 grid-rows-3 gap-4 ml-24'>
        <p className='row-span-2 font-sans text-3xl font-bold text-white self-end'>
          Hệ thống lập lịch chiếu sáng cho đèn đường thông minh
        </p>
        <p className='font-sans text-base text-white font-medium'>
          Phục vụ cho việc lên kế hoạch chiếu sáng và giám sát điện năng tiêu thụ cho hệ thống đèn
          đường thông minh. Sử dụng tiêu chuẩn NEMA cho đèn LED, kết nối thông qua mạng NB-IoT và
          phát triển hệ thống lập lịch, giám sát theo mô hình Microservices.
        </p>
      </div>

      <Card className='mt-24' color='transparent' shadow={false}>
        <Typography variant='h4' color='white'>
          Đăng nhập
        </Typography>
        <p className='mt-1 font-normal text-white'>Nhập tài khoản và mật khẩu để đăng nhập</p>
        <form className='mt-8 mb-2 w-72 md:w-80 max-w-screen-lg' onSubmit={handleSubmit(submit)}>
          <div className='mb-4 flex flex-col gap-6'>
            <Input
              id='auth-username'
              size='lg'
              label='Tài khoản'
              icon={<UserCircleIcon color='white' />}
              {...register('username', {
                required: true,
                minLength: 5
              })}
              color='white'
              crossOrigin=''
            />
            <Input
              id='auth-password'
              type='password'
              size='lg'
              icon={<KeyIcon color='white' />}
              label='Mật khẩu'
              color='white'
              {...register('password', {
                required: true,
                minLength: 8
              })}
              crossOrigin=''
            />
          </div>

          <Button className='mt-6 bg-blue-500' fullWidth type='submit'>
            ĐĂNG NHẬP
          </Button>
        </form>
      </Card>
    </div>
  );
}
