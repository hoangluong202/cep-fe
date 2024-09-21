import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Map, Calendar, Bell, Lightbulb, CirclePower, Info } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from './useAuth';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';

export const AppNav: Component<{ menu: RouteMenu }> = ({ menu }) => {
  const pathName = useLocation().pathname;
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const menuItems = menu.filter((item) => item.type === 'menu-item');
  const AppNavItemIcon = (key: string) => {
    switch (key) {
      case '/dashboard':
        return <Home className='h-5 w-5' />;
      case '/map':
        return <Map className='h-5 w-5' />;
      case '/calendar':
        return <Calendar className='h-5 w-5' />;
      case '/alarms':
        return <Bell className='h-5 w-5' />;
      case '/poles':
        return <Lightbulb className='h-5 w-5' />;
      default:
        return <Home className='h-5 w-5' />;
    }
  };
  const AppNavItem: Component<{ path: string; icon: JSX.Element; label: string }> = ({
    path,
    icon,
    label
  }) => (
    <div id={path}>
      <Tooltip>
        <TooltipTrigger
          className={`hover:bg-gray-200 ${path === pathName ? 'bg-gray-200' : ''}`}
          asChild
        >
          <Link
            to={path}
            className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 hover:bg-gray-200 active:bg-gray-300'
          >
            {icon}
            <span className='sr-only'>{label}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side='right'>{label}</TooltipContent>
      </Tooltip>
    </div>
  );

  return (
    <aside className='fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex'>
      <nav className='flex flex-col items-center gap-4 px-2 sm:py-4'>
        <Avatar className='flex items-center justify-center'>
          <AvatarImage src='./../../../src/assets/imgs/logobk.png' className='h-6 w-6' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {menuItems.map((item) => {
          return (
            <AppNavItem
              key={item.path}
              path={item.path}
              icon={AppNavItemIcon(item.path)}
              label={item.name}
            />
          );
        })}
      </nav>
      <nav className='mt-auto flex flex-col items-center gap-4 px-2 sm:py-4'>
        <Dialog>
          <DialogTrigger>
            <div
              className={`group/button flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100`}
            >
              <CirclePower color='#fb7185' />
            </div>
          </DialogTrigger>
          <DialogContent>
            <div className='flex flex-row gap-3'>
              <div className='flex items-center'>
                <Info color='#fb7185' />
              </div>
              <div className='flex flex-col'>
                <div className='text-lg font-medium leading-6 text-gray-900'>
                  Xác nhận đăng xuất
                </div>
                <div className='text-sm text-gray-500"'>
                  Bạn có chắc muốn đăng xuất? Bạn sẽ cần đăng nhập lại để truy cập ứng dụng.
                </div>
              </div>
            </div>
            <div className='flex justify-end gap-x-2'>
              <Button variant='outline'>Đóng</Button>
              <Button variant='destructive' onClick={handleLogout}>
                Đăng xuất
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </nav>
    </aside>
  );
};
