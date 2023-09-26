export const InitialCart = {
  products: [],
  total: 0,
};

export interface ICart {
  products: ICartProduct[];
  total: number;
}

export interface ICartProduct {
  _id: string;
  title: string;
  price: number;
  quantity: number;
}

export interface ICartContext {
  cart: ICart;
  addItem: (product: ICartProduct) => void;
  removeItem: (id: string) => void;
  increaseItemQuantity: (_id: string) => void;
  decreaseItemQuantity: (_id: string) => void;
  emptyCart: () => void;
}
