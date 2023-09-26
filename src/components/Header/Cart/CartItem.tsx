import { Link } from "react-router-dom";
import { ICartProduct } from "../../../types/cart";
import { useCart } from "../../Context/CartContext";

interface IProps {
  product: ICartProduct;
}

function CartItem({ product }: IProps) {
  const { increaseItemQuantity, decreaseItemQuantity, emptyCart } = useCart();

  const btnClass = "w-8 h-8 text-gray-600 transition hover:opacity-75 ic";

  return (
    <div className="flex gap-4 p-3">
      <img
        className="rounded-md h-16 w-16 bg-gray-100 shrink-0"
        src="https://picsum.photos/200"
        alt={"Picture of" + product.title}
      />
      <div className="flex flex-col gap-2 w-full">
        <div className="font-[500] leading-none">
          <Link
            className="hover:text-accent text-sm"
            to={"/products/" + product._id}
          >
            {product.title}
          </Link>
        </div>
        <div className="flex gap-4 items-center justify-between">
          <span className="text-sm">${product.price}</span>
          <div>
            <div className="flex items-center border border-gray-200 rounded">
              <button
                type="button"
                className={btnClass}
                onClick={() => decreaseItemQuantity(product._id)}
              >
                remove
              </button>
              <span className="sm:text-sm">{product.quantity}</span>
              <button
                type="button"
                className={btnClass}
                onClick={() => increaseItemQuantity(product._id)}
              >
                add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
