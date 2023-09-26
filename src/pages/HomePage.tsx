import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="container px-6 py-8 sm:py-12 mx-auto">
      <div className="items-center lg:flex">
        <div className="w-full lg:w-1/2">
          <div className="lg:max-w-lg">
            <h1 className="text-3xl font-bold text-gray-800 lg:text-4xl">
              The best shopping experience with{" "}
              <span className="text-accent">Shoper</span>
            </h1>

            <p className="mt-3 text-gray-600">
              Demo e-commerce React application that uses CRUD, reactivity,
              context and latest React Router Data API.
            </p>
            <p className="text-sm mt-2 text-gray-500">
              * Requires{" "}
              <Link
                className="text-accent hover:underline"
                to="https://github.com/maxonlinux/shopper-express"
              >
                shopper-express
              </Link>{" "}
              backend
            </p>
            <div className="flex gap-4 mt-8 max-sm:flex-col">
              <Link
                to="products"
                className="inline-flex gap-2 items-center justify-center px-5 py-3 text-base font-medium text-center text-accent rounded-lg bg-accent/10 hover:bg-accent/20 focus:ring-4 focus:ring-blue-300"
              >
                See products
                <span className="ic">east</span>
              </Link>
              <Link
                to="https://github.com/maxonlinux/shopper-react"
                className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100"
              >
                Check out GitHub
              </Link>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
          <img
            className="w-full h-full lg:max-w-3xl"
            src="https://merakiui.com/images/components/Catalogue-pana.svg"
            alt="Catalogue-pana.svg"
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
