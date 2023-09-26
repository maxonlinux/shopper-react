interface IProps {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  title: string;
  icon: string;

}

function Button({
  onClick = () => {},
  className = "",
  title,
  icon,
  disabled = false,
}: IProps) {
  return (
    <button
      className={`flex items-center gap-2 py-1 px-3 rounded-lg font-[500] h-10 ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="ic font-[500] text-lg leading-none">{icon}</span>
      <span className="text-sm leading-none">{title}</span>
    </button>
  );
}

export default Button;
