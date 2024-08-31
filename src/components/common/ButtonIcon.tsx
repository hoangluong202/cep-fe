type ButtonIconProps = {
  icon: JSX.Element;
  className?: string;
  onClick?: () => void;
};

export const ButtonIcon = ({ icon, className, onClick }: ButtonIconProps) => (
  <button
    className={`group/button flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100${className}`}
    onClick={onClick}
  >
    {icon}
  </button>
);
