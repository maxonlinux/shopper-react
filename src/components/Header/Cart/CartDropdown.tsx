import { Popover, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import CartItem from "./CartItem";
import { useCart } from "../../Context/CartContext";

function CartDropdown() {
  const { cart, addItem, removeItem, emptyCart } = useCart();
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    setTotalItems(
      cart.products.reduce((total, product) => total + product.quantity, 0)
    );
  }, [cart.products]);

  return (
    <Popover className="relative">
      <Popover.Button className="relative flex items-center">
        <span className="ic font-[300] text-2xl leading-none">
          shopping_cart
        </span>
        {totalItems !== 0 ? (
          <span className="absolute flex items-center justify-center -top-2 -right-1 text-[9px] rounded-full bg-red-500 min-w-[16px] h-[16px] px-1 text-white leading-none">
            {totalItems}
          </span>
        ) : null}
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="fixed z-10 right-0 top-0 p-2 pt-16 flex h-full justify-end pointer-events-none sm:w-96 max-sm:w-full">
          <div className="w-full h-fit flex flex-col rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 pointer-events-auto">
            <div className="p-4 border-b border-gray-100">
              <span>Cart ({cart.products.length})</span>
            </div>
            <div className="relative pb-4 overflow-y-scroll divide-y divide-gray-100">
              {cart.products.length !== 0 ? (
                cart.products.map((product) => (
                  <CartItem key={product._id} product={product} />
                ))
              ) : (
                <div className="px-4 pt-4 text-gray-700 text-sm">No items</div>
              )}
            </div>
            <div className="sticky bottom-0 w-full">
              <div className="absolute block left-0 bottom-0 w-full h-8 bg-gradient-to-t from-white to-transparent" />
            </div>
            <div className="p-2 border-t border-gray-100">
              <button
                className="flex items-center gap-2 p-3 pr-4 bg-accent text-white w-full rounded-md 
                disabled:opacity-30"
                disabled={cart.products.length === 0}
              >
                <span className="ic">shopping_cart_checkout</span>
                <span className="mr-auto">Checkout</span>
                {cart.total !== 0 ? (
                  <span className="text-sm">${cart.total}</span>
                ) : null}
              </button>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

export default CartDropdown;
