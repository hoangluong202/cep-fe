import { SubmitHandler, useForm } from 'react-hook-form';
import { useAuth } from '@hooks';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuthProvider } from '@/components/common/useAuthProvider';
import { toast } from '@/components/ui/use-toast';

export function LoginPage() {
  const navigate: NavigateFunction = useNavigate();
  const { saveToken } = useAuthProvider();
  const {
    login,
    me: { refetch }
  } = useAuth();
  const { register, handleSubmit } = useForm<LoginFormData>();
  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const response = await login.mutateAsync(data);
      saveToken(response.token);
      await refetch();
      toast({
        title: 'Đăng nhập thành công!',
        description: 'Chào mừng bạn quay trở lại'
      });
      navigate('/map');
    } catch (err) {
      const errorMessage = (err as ResponseError).message;
      //TODO: Show error message toasts, it's not working
      toast({
        title: 'Đăng nhập thất bại!',
        description: errorMessage
      });
    }
  };

  return (
    <div className="h-screen grid grid-cols-3 gap-8 bg-center bg-cover bg-fixed bg-no-repeat bg-[url('./../../src/assets/imgs/bg-login.jpeg')]">
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

      <div className='mt-24'>
        <p className='text-white text-2xl font-bold'>Đăng nhập</p>
        <p className='mt-1 font-normal text-white'>Nhập tài khoản và mật khẩu để đăng nhập</p>
        <form className='mt-8 mb-2 w-72 md:w-80 max-w-screen-lg' onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4 flex flex-col gap-4'>
            <div className='grid gap-2'>
              <p className='text-white font-bold'>Tài khoản</p>
              <Input
                id='auth-username'
                type='text'
                placeholder='luong.hoang'
                required
                {...register('username', {
                  required: true,
                  minLength: 5
                })}
              />
            </div>
            <div className='grid gap-2'>
              <p className='text-white font-bold'>Mật khẩu</p>
              <Input
                id='auth-password'
                type='password'
                required
                {...register('password', {
                  required: true,
                  minLength: 8
                })}
              />
            </div>
          </div>
          <Button className='w-full font-bold' type='submit'>
            ĐĂNG NHẬP
          </Button>
        </form>
      </div>
    </div>
  );
}
