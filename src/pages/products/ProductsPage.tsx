import { useRouteLoaderData, useSearchParams } from "react-router-dom";
import Pagination from "../../components/Pagination";
import Products from "../../components/Products/Products";
import { AxiosResponse } from "axios";
import { IProduct } from "../../types/product";

function ProductsPage() {
  const response = useRouteLoaderData("products") as AxiosResponse;
  const products = response.data.items as IProduct[];

  const [searchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "10");
  const totalItems = response.data.total;

  return (
    <>
      <Products products={products} />
      <Pagination
        itemsPerPage={limit}
        totalItems={totalItems}
        currentPage={page}
      />
    </>
  );
}

export default ProductsPage;
