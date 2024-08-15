import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import { UserCircleIcon, KeyIcon } from '@heroicons/react/24/outline';
import { authService, server } from '@services';
import { useUserQuery } from '@hooks';
import { useMutation } from '@tanstack/react-query';
// import { Navigate } from 'react-router-dom';
import { NavigateFunction, useNavigate } from 'react-router-dom';

export function LoginPage() {
  const navigate: NavigateFunction = useNavigate();
  const {
    info: { refetch }
  } = useUserQuery();

  // const { refetch } = useQuery({
  //   queryKey: ['api/users/1'],
  //   queryFn: () => userService.getInfo(1),
  //   retry(failureCount, error: ResponseError) {
  //     if (error.statusCode && error.statusCode >= 400 && error.statusCode < 500) return false;
  //     return failureCount < 0;
  //   }
  // });

  const { register, handleSubmit } = useForm<LoginFormData>();

  const loginNormal = useMutation({
    mutationKey: ['loginNormal'],
    mutationFn: async (data: LoginFormData) => {
      const response = await authService.login(data);
      const { access_token } = response;
      console.log('access_token', access_token);
      localStorage.setItem('authToken', access_token);
      server.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      console.log('server.defaults.headers.common', server.defaults.headers.common);
      return response;
    }
  });
  const submit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      console.log('login');
      await loginNormal.mutateAsync(data);
      await refetch();
      toast.success('Login successfully!');

      // console.log('authToken', authToken);
      // console.log('Navigating to /map');
      navigate('/map');
    } catch (err) {
      const errorMessage = (err as ResponseError).message;
      toast.error(errorMessage);
    }
  };

  return (
    <Card color='transparent' shadow={false}>
      <Typography variant='h4' color='blue-gray'>
        Login
      </Typography>
      <Typography color='gray' className='mt-1 font-normal'>
        Enter your username and password.
      </Typography>
      <form className='mt-8 mb-2 w-72 md:w-80 max-w-screen-lg' onSubmit={handleSubmit(submit)}>
        <div className='mb-4 flex flex-col gap-6'>
          <Input
            id='auth-username'
            size='lg'
            label='Username'
            icon={<UserCircleIcon />}
            {...register('username', {
              required: true,
              minLength: 5
            })}
            // type='email'
            crossOrigin=''
          />
          <Input
            id='auth-password'
            type='password'
            size='lg'
            icon={<KeyIcon />}
            label='Password'
            {...register('password', {
              required: true,
              minLength: 8
            })}
            crossOrigin=''
          />
        </div>

        <Button className='mt-6 bg-blue-500' fullWidth type='submit'>
          Login
        </Button>
      </form>
    </Card>
  );
}
