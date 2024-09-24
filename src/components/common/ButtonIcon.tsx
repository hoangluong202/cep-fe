type ButtonIconProps = {
  icon: JSX.Element;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
};

export const ButtonIcon = ({ icon, className, disabled, type, onClick }: ButtonIconProps) => (
  <button
    className={`group/button flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 ${className}`}
    onClick={onClick}
    disabled={disabled}
    type={type}
  >
    {icon}
  </button>
);
