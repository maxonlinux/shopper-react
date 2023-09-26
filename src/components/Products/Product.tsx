import { Link } from "react-router-dom";
import { IProduct } from "../../types/product";
import Button from "../Button";
import { useEffect, useState } from "react";
import { useCart } from "../Context/CartContext";

interface IProps {
  product: IProduct;
}

function Product({ product }: IProps) {
  const [isInCart, setIsInCart] = useState(false);

  const { cart, addItem, removeItem } = useCart();

  const handleAddToCart = () => {
    if (isInCart) {
      removeItem(product._id);
    } else {
      addItem({
        _id: product._id,
        title: product.title,
        price: product.price,
        quantity: 1,
      });
    }
  };

  const PurchaseButtons = () => (
    <>
      <Button
        className="bg-accent/20 text-accent disabled:opacity-50"
        title="Buy now"
        icon="shopping_bag"
      ></Button>
      <Button
        title={isInCart ? "In Cart" : "Add to Cart"}
        icon={isInCart ? "done" : "add"}
        className={`disabled:opacity-50 ${isInCart ? "text-green-500" : ""}`}
        onClick={handleAddToCart}
      ></Button>
    </>
  );

  // If item is in cart
  const checkIfInCart = (product: IProduct) => {
    const productInCart = cart.products.find(
      (item) => item._id === product._id
    );
    return !!productInCart;
  };

  // Hooks
  useEffect(() => {
    setIsInCart(checkIfInCart(product));
  }, [cart]);

  return (
    <div className="border border-gray-100 p-3 rounded-lg">
      <div className="flex gap-4">
        <Link className="shrink-0" to={"/products/" + product._id}>
          <img
            className="rounded-md h-20 w-20 bg-gray-100 object-contain"
            src={product.image}
            alt={"Picture of" + product.title}
          />
        </Link>
        <div>
          <div className="font-[500] leading-none">
            <Link className="hover:text-accent" to={"/products/" + product._id}>
              {product.title}
            </Link>
          </div>
          <div className="flex gap-2 items-center mt-2">
            <div className="flex items-start">
              <span className="text-xs leading-[1.2]">$</span>
              <span className="text-xl leading-none">
                {String(product.price).split(".")[0]}
              </span>
              <span className="text-xs leading-[1.2]">
                {String(product.price).split(".")[1]}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="leading-none mt-2 text-sm">{product.description}</div>
      <div className="flex gap-2 mt-3">
        {product.available ? (
          <PurchaseButtons />
        ) : (
          <Button title="Notify me when in stock" icon="notifications" />
        )}
      </div>
    </div>
  );
}

export default Product;
