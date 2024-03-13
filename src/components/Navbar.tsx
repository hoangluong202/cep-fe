import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Menu,
  MenuHandler,
  Button,
  Avatar,
  MenuList,
  MenuItem
} from '@material-tailwind/react';
import { createElement, useEffect, useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon, PowerIcon } from '@heroicons/react/24/solid';
import hcmutLogo from '@assets/logobk.png';
import { useUserStore } from '@states';

// profile menu component
const profileMenuItems = [
  {
    label: 'Sign Out',
    icon: PowerIcon
  }
];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const { logout } = useUserStore();

  return (
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
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              // onClick={closeMenu}
              onClick={label === 'Sign Out' ? logout : closeMenu}
              className={`flex items-center gap-2 rounded ${
                isLastItem ? 'hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10' : ''
              }`}
            >
              {createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? 'text-red-500' : ''}`,
                strokeWidth: 2
              })}
              <Typography
                as='span'
                variant='small'
                className='font-normal'
                color={isLastItem ? 'red' : 'inherit'}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

function ApplicationName() {
  return (
    <div className='flex items-center gap-2 text-blue-gray-900'>
      <Avatar
        // variant='circular'
        // size='sm'
        // alt='tania andrew'
        className='border border-gray-900 p-0.5'
        src={hcmutLogo}
      />
      <Typography as='a' href='#' variant='h5' className='mr-4 cursor-pointer py-1.5'>
        Lighting Scheduling
      </Typography>
    </div>
  );
}

const listItems = [
  { title: 'Dashboard', href: '#' },
  { title: 'Inventory', href: '#' },
  { title: 'View Map', href: '#' },
  { title: 'Calendar', href: '#' },
  { title: 'Log', href: '#' }
];

function NavList() {
  return (
    <ul className='my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6'>
      {listItems.map((item) => (
        <Typography as='li' variant='small' color='blue-gray' className='p-1 font-medium'>
          <a href='#' className='flex items-center hover:text-blue-500 transition-colors'>
            {item.title}
          </a>
        </Typography>
      ))}
      <ProfileMenu />
    </ul>
  );
}

export function SimpleNavbar() {
  const [openNav, setOpenNav] = useState(false);

  const handleWindowResize = () => window.innerWidth >= 960 && setOpenNav(false);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <Navbar className='mx-auto max-w-screen-2xl px-6 py-3'>
      <div className='flex items-center justify-between text-blue-gray-900'>
        <ApplicationName />
        <div className='hidden lg:block'>
          <NavList />
        </div>
        <IconButton
          variant='text'
          className='ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden'
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className='h-6 w-6' strokeWidth={2} />
          ) : (
            <Bars3Icon className='h-6 w-6' strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}
