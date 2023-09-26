import { Menu } from "@headlessui/react";

interface IProps {
  icon: string;
  title: string;
  activeClass: string;
  onClick: () => void;
}
function AccountItem({ icon, title, activeClass, onClick }: IProps) {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          className={`${
            active ? activeClass : "text-gray-900"
          } group flex w-full items-center rounded-md p-2 text-sm`}
          onClick={onClick}
        >
          <span className="ic mr-2 h-5 w-5">{icon}</span>
          {title}
        </button>
      )}
    </Menu.Item>
  );
}

export default AccountItem;
