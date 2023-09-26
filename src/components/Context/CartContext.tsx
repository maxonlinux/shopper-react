import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import {
  ICart,
  ICartContext,
  ICartProduct,
  InitialCart,
} from "../../types/cart";

// Set default context to prevent TS errors
const CartContext = createContext<ICartContext>({
  cart: InitialCart,
  addItem: () => {},
  removeItem: (_id: string) => {},
  emptyCart: () => {},
  increaseItemQuantity: (_id: string) => {},
  decreaseItemQuantity: (_id: string) => {},
});

// Context hook
export const useCart = () => useContext(CartContext);

// Set provider wrapper
function CartProvider({ children }: { children: ReactNode }) {
  // State
  const [cart, setCart] = useState<ICart>(InitialCart);

  // Helper function
  const calculateTotal = (products: ICartProduct[]) =>
    +products
      .reduce((total, product) => total + product.price * product.quantity, 0)
      .toFixed(2);

  // Add item
  const addItem = useCallback(
    (product: ICartProduct) => {
      // Find existing item by id
      const existingProduct = cart.products.find(
        (item) => item._id === product._id
      );
      const products = existingProduct
        ? // If exists in cart
          cart.products.map((product) =>
            product._id === product._id
              ? { ...product, quantity: product.quantity + 1 }
              : product
          )
        : // If new
          [...cart.products, { ...product, quantity: 1 }];

      const total = calculateTotal(products);

      setCart((cart) => ({
        ...cart,
        products,
        total,
      }));
    },
    [cart.products, calculateTotal]
  );

  // Remove item
  const removeItem = useCallback(
    (id: string) => {
      const products = cart.products.filter((product) => product._id !== id);
      const total = calculateTotal(products);

      setCart((cart) => ({
        ...cart,
        products,
        total,
      }));
    },
    [cart.products, calculateTotal]
  );

  const emptyCart = useCallback(() => {
    setCart(InitialCart);
  }, []);

  // Increase item quantity
  const increaseItemQuantity = useCallback(
    (productId: string) => {
      const products = cart.products.map((product) =>
        product._id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );
      const total = calculateTotal(products);

      setCart((cart) => ({
        ...cart,
        products,
        total,
      }));
    },
    [cart.products, calculateTotal]
  );

  // Decrease item quantity
  const decreaseItemQuantity = useCallback(
    (productId: string) => {
      const products = cart.products
        .map((product) =>
          product._id === productId
            ? { ...product, quantity: Math.max(product.quantity - 1, 0) }
            : product
        )
        .filter((product) => product.quantity > 0);
      const total = calculateTotal(products);

      setCart((cart) => ({
        ...cart,
        products,
        total,
      }));
    },
    [cart.products, calculateTotal]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        increaseItemQuantity,
        decreaseItemQuantity,
        emptyCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
