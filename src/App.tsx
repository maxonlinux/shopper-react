import { Link, RouterProvider, createBrowserRouter } from "react-router-dom";
import RouteProtector from "./components/RouteProtector/RouteProtector";
import { UserRole } from "./types/user";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import AdminPage from "./pages/admin/AdminPage";
import ProductsPage from "./pages/products/ProductsPage";
import ProductPage from "./pages/products/ProductPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import RootLayout from "./components/layouts/RootLayout";
import api from "./axios/config";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      id: "root",
      element: <RootLayout />,
      loader: async () => await api.get("/categories"),
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "login",
          element: (
            <RouteProtector onlyForRoles={[UserRole.Guest]}>
              <LoginPage />
            </RouteProtector>
          ),
        },
        {
          path: "register",
          element: (
            <RouteProtector onlyForRoles={[UserRole.Guest]}>
              <RegisterPage />
            </RouteProtector>
          ),
        },
        {
          path: "admin",
          element: (
            <RouteProtector onlyForRoles={[UserRole.Admin]}>
              <AdminPage />
            </RouteProtector>
          ),
          children: [{ path: "products", element: <AdminProductsPage /> }],
        },
        {
          path: "products",
          children: [
            {
              index: true,
              id: "products",
              loader: async ({ request }) => {
                const url = new URL(request.url);
                const page = url.searchParams.get("page") ?? 1;
                const limit = url.searchParams.get("limit") ?? 10;
                return api.get("/products", {
                  params: { page, limit },
                });
              },
              element: <ProductsPage />,
            },
            {
              path: ":productId",
              element: <ProductPage />,
              loader: async ({ params }) =>
                api.get("/products/" + params.productId),
              errorElement: (
                <div className="flex flex-col h-full items-center justify-center px-8">
                  <div className=" flex flex-col gap-8">
                    <div>
                      <div className="text-4xl font-[700]">Oops...</div>
                      <div className="mt-2">
                        Product does not exist or has been removed.
                      </div>
                    </div>
                    <Link
                      className="button-md bg-accent/10 text-accent"
                      to=".."
                    >
                      <span className="ic">west</span>
                      Go back
                    </Link>
                  </div>
                </div>
              ),
            },
          ],
        },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
