import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useAuth } from "../../../hooks/useAuth";
import AccountItem from "./AccountItem";
import { useNavigate } from "react-router-dom";

function AccountDropdown() {
  const { logOut } = useAuth();
  const navigate = useNavigate()
  return (
    <div className="relative">
      <Menu>
        <Menu.Button className="flex items-center">
          <span className="ic font-[300] text-2xl leading-none">
            account_circle
          </span>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-6 w-56 origin-top-right divide-y divide-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="p-1">
              <AccountItem
                icon="admin_panel_settings"
                title="Admin panel"
                activeClass="bg-accent/10 text-accent"
                onClick={() => {navigate('/admin')}}
              />
               <AccountItem
                icon="manage_accounts"
                title="Account settings"
                activeClass="bg-accent/10 text-accent"
                onClick={() => {}}
              />
            </div>
            <div className="px-1 py-1">
              <AccountItem
                icon="logout"
                title="Log out"
                activeClass="bg-red-600/10 text-red-600"
                onClick={logOut}
              />
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

export default AccountDropdown;
