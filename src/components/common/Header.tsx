import {
  Navbar,
  Typography,
  Menu,
  MenuHandler,
  Button,
  Avatar,
  MenuList,
  MenuItem
} from '@material-tailwind/react';
import { createElement, useState } from 'react';
import { ChevronDownIcon, PowerIcon } from '@heroicons/react/24/solid';
import logo from '@assets/logobk.png';
import { useMenuBarStore } from '@states';
import { Link } from 'react-router-dom';
import { useAuthMutation, useListenEvent } from '@hooks';

export const Header: Component<{ mainMenu: RouteMenu; subMenu: RouteMenu }> = ({
  mainMenu,
  subMenu
}) => {
  const { setSelectedMenu } = useMenuBarStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { logout } = useAuthMutation();

  const handleOpenDialog = () => {
    setOpenDialog(!openDialog);
  };

  useListenEvent('logout', handleOpenDialog);

  return (
    <Navbar className='flex items-center justify-between text-blue-gray-900 px-6 py-3 max-w-full'>
      <div className='flex items-center gap-2 text-blue-gray-900'>
        <Avatar className='border border-gray-900 p-0.5' src={logo} />
        <Typography as='a' href='#' variant='h5' className='mr-4 cursor-pointer py-1.5'>
          Lập lịch chiếu sáng
        </Typography>
      </div>
      <ul className='my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6'>
        {mainMenu.map((mainMenuItem, index) => (
          <Typography
            key={index}
            as='li'
            variant='small'
            color='blue-gray'
            className='p-1 font-medium'
          >
            <Link
              to={mainMenuItem.type === 'main-item' ? mainMenuItem.path : '#'}
              onClick={() => setSelectedMenu(mainMenuItem.name)}
              className='flex items-center hover:text-blue-500 transition-colors'
            >
              {mainMenuItem.name}
            </Link>
          </Typography>
        ))}
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement='bottom-end'>
          <MenuHandler>
            <Button
              variant='text'
              color='blue-gray'
              className='flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto'
            >
              <Avatar
                variant='circular'
                size='sm'
                alt='tania andrew'
                className='border border-gray-900 p-0.5'
                src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80'
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`h-3 w-3 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}
              />
            </Button>
          </MenuHandler>
          <MenuList className='p-1'>
            {subMenu.map((subMenuItem, key) => {
              const isLastItem = key === subMenu.length - 1;
              return (
                <MenuItem
                  key={subMenuItem.name}
                  onClick={() => {
                    setSelectedMenu(subMenuItem.name);
                    if (subMenuItem.type === 'logout-btn') {
                      subMenuItem.onClick();
                      logout.mutateAsync();
                    }
                  }}
                  className={`flex items-center gap-2 rounded ${
                    isLastItem ? 'hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10' : ''
                  }`}
                >
                  {createElement(PowerIcon, {
                    className: `h-4 w-4 ${isLastItem ? 'text-red-500' : ''}`,
                    strokeWidth: 2
                  })}
                  <Typography
                    as='span'
                    variant='small'
                    className='font-normal'
                    color={isLastItem ? 'red' : 'inherit'}
                  >
                    {subMenuItem.name}
                  </Typography>
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
      </ul>
    </Navbar>
  );
};
