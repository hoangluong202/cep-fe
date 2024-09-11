import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Link, useLocation } from 'react-router-dom';
import { Home, Settings, Map, Calendar, Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const AppNav: Component<{ menu: RouteMenu }> = ({ menu }) => {
  const pathName = useLocation().pathname;
  const AppNavItem: Component<{ path: string; icon: JSX.Element; label: string }> = ({
    path,
    icon,
    label
  }) => (
    <>
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
    </>
  );

  return (
    <aside className='fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex'>
      <nav className='flex flex-col items-center gap-4 px-2 sm:py-4'>
        <Avatar>
          <AvatarImage src='src/assets/hcmut.png' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <AppNavItem
          path={menu[0].path}
          icon={<Home className='h-5 w-5' />}
          label='Bảng điều khiển'
        />
        <AppNavItem path={menu[1].path} icon={<Map className='h-5 w-5' />} label='Bản đồ' />
        <AppNavItem path={menu[2].path} icon={<Calendar className='h-5 w-5' />} label='Lịch' />
        <AppNavItem path={menu[3].path} icon={<Bell className='h-5 w-5' />} label='Cảnh báo' />
      </nav>
      <nav className='mt-auto flex flex-col items-center gap-4 px-2 sm:py-4'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to='/settings'
              className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
            >
              <Settings className='h-5 w-5' />
              <span className='sr-only'>Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side='right'>Settings</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
};
