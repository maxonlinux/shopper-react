export const InitialProduct = {
  _id: "",
  title: "",
  description: "",
  content: "",
  price: 0,
  image: "",
  available: true,
  category: { _id: "", name: "" },
  brand: "",
  color: "",
};

export interface IBaseProduct {
  _id: string;
  title: string;
  description: string;
  price: number;
  content: string;
  image: string;
  available: boolean;
  category: {
    name: string;
    _id: string;
  };
  brand: string;
  color: string;
}

export interface IProduct extends IBaseProduct {
  createdAt: string;
  updatedAt: string;
  category: {
    name: string;
    _id: string;
  };
}

export interface IProducts {
  products: IProduct[];
  total: number;
}

export type TCreateProduct = (product: IBaseProduct) => Promise<void>;
export type TEditProduct = (product: IBaseProduct) => Promise<void>;
export type TDeleteProduct = (id: string) => Promise<void>;
