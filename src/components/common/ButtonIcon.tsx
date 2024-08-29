type ButtonIconProps = {
  icon: JSX.Element;
  onClick?: () => void;
};

export const ButtonIcon = ({ icon, onClick }: ButtonIconProps) => (
  <button
    className='flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100'
    onClick={onClick}
  >
    {icon}
  </button>
);
