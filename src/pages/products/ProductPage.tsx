import { useLoaderData } from "react-router-dom";
import { AxiosResponse } from "axios";
import { IProduct } from "../../types/product";
import Button from "../../components/Button";

function ProductPage() {
  const product = useLoaderData() as AxiosResponse;

  const { _id, title, price, description, color, brand, category, image } =
    product.data as IProduct;
  return (
    <>
      <div className="2xl:px-20 md:py-12 md:px-6 sm:p-4 p-2">
        <div className="flex max-md:flex-col w-full items-center justify-center">
          <img
            className="md:w-96 w-full h-96 bg-gray-100 rounded-lg object-contain flex-shrink-0"
            alt={"Picture of " + title}
            src="https://m.media-amazon.com/images/I/61XXuPbzEkL._AC_UF894,1000_QL80_.jpg"
          />

          <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6 w-full">
            <div className="flex flex-col [&>div]:border-b [&>div]:border-gray-100">
              <div className="border-b border-gray-100 pb-6">
                <p className="text-sm leading-none text-gray-600 capitalize">
                  {category.name}
                </p>
                <h1
                  className="
							lg:text-2xl
							text-xl
							font-semibold
							lg:leading-6
							leading-7
							text-gray-800
							mt-2
						"
                >
                  {title}
                </h1>
              </div>
              <div className="py-4 flex items-center justify-between">
                <p className="text-base leading-4 text-gray-800">ID</p>
                <div className="flex items-center justify-center">
                  <p className="text-sm leading-none text-gray-600 mr-3">
                    {_id}
                  </p>
                </div>
              </div>
              <div className="py-4 flex items-center justify-between">
                <p className="text-base leading-4 text-gray-800">Brand</p>
                <div className="flex items-center justify-center">
                  <p className="text-sm leading-none text-gray-600 mr-3">
                    {brand}
                  </p>
                </div>
              </div>
              <div className="py-4 flex items-center justify-between">
                <p className="text-base leading-4 text-gray-800">Color</p>
                <div className="flex items-center justify-center">
                  <p className="text-sm leading-none text-gray-600">{color}</p>
                  <div className="w-6 h-6 bg-gradient-to-b from-gray-900 to-indigo-500 ml-3 mr-4 rounded-full cursor-pointer" />
                </div>
              </div>
            </div>
            <div className="py-4 text-xl font-[500]">${price}</div>
            <div className="flex gap-2">
              <Button
                className="bg-accent/20 text-accent"
                title="Buy now"
                icon="shopping_bag"
              />
              <Button title="Add to cart" icon="add" />
            </div>
          </div>
        </div>
        <div>
          <p className="xl:pr-48 text-base lg:leading-tight leading-normal text-gray-600 mt-7">
            {description}
          </p>
        </div>
      </div>
    </>
  );
}

export default ProductPage;
