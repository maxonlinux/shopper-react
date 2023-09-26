import { Link } from "react-router-dom";
import MenuButton from "./MobileMenu/MenuButton.tsx";
import Search from "./Search.tsx";
import CartDropdown from "./Cart/CartDropdown.tsx";
import AccountDropdown from "./Account/AccountDropdown.tsx";
import { useUser } from "../Context/UserContext.tsx";

function Header() {
  const { user } = useUser();
  const LoginButton = () => (
    <Link className="flex items-center" to="/login">
      <span className="ic font-[300] text-2xl leading-none">
        account_circle
      </span>
    </Link>
  );

  return (
    <header className="bg-white px-4 py-2 border-b border-gray-100 font-[500]">
      <nav className="flex w-full items-center justify-between gap-4">
        <ul className="flex items-center gap-4">
          <li>
            <Link className="flex items-center gap-2 font-bold" to="/">
              <span className="ic text-xl">storefront</span>
              <span className="max-sm:hidden">SHOPPER</span>
            </Link>
          </li>
        </ul>
        <Search />
        <ul className="flex gap-4 items-center">
          <li>
            <CartDropdown />
          </li>
          <li className="max-sm:hidden">
            {user ? <AccountDropdown /> : <LoginButton />}
          </li>
          <li>
            <MenuButton />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
