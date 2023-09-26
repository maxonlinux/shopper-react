import { IProduct } from "../../types/product";
import Product from "./Product";

interface IProps {
  products: IProduct[];
}

function Products({ products }: IProps) {
  return (
    <div
      className="grid grid-cols-3 grid-flow-dense gap-2
      max-lg:grid-cols-2 
      max-sm:grid-cols-1"
    >
      {products.map((product: IProduct) => (
        <Product product={product} key={product._id} />
      ))}
    </div>
  );
}

export default Products;
