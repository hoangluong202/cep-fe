import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Link, useLocation } from 'react-router-dom';
import { Home, Settings, Map, Calendar, Bell, Lightbulb } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const AppNav: Component<{ menu: RouteMenu }> = ({ menu }) => {
  const pathName = useLocation().pathname;
  const menuItems = menu.filter((item) => item.type === 'menu-item');
  const AppNavItemIcon = (key: string) => {
    switch (key) {
      case '/dashboard':
        return <Home className='h-5 w-5' />;
      case '/map':
        return <Map className='h-5 w-5' />;
      case '/calendar':
        return <Calendar className='h-5 w-5' />;
      case '/alarm':
        return <Bell className='h-5 w-5' />;
      case '/pole':
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
          return <AppNavItem path={item.path} icon={AppNavItemIcon(item.path)} label={item.name} />;
        })}
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
