import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import StateHandler from "../../components/ResponseStatusHandler/ResponseStatusHandler";
import {
  BrowserRouter,
  Link,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import AdminProductsPage from "./AdminProductsPage";

function AdminPage() {
  // Declare hooks and constants
  const { search } = useLocation();

  const queryParams = new URLSearchParams(search);
  const page = parseInt(queryParams.get("page") ?? "1");
  const limit = parseInt(queryParams.get("limit") ?? "12");

  // Hooks
  // useEffect(() => {
  //   getProducts();
  // }, [getProducts]);

  return (
    <>
      <div className="h-full flex gap-2">
        <div className="flex flex-col border-r border-gray-100 px-2">
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                className="text-sm flex items-center gap-2 font-[500] px-4 py-2 hover:bg-gray-100 rounded-md"
                to="/admin/products"
              >
                <span className="ic text-lg leading-none">warehouse</span>
                <span className="leading-none">Products</span>
              </Link>
            </li>
            <li>
              <Link
                className="text-sm flex items-center gap-2 font-[500] px-4 py-2 hover:bg-gray-100 rounded-md"
                to="/admin/categories"
              >
                <span className="ic text-lg leading-none">category</span>
                <span className="leading-none">Categories</span>
              </Link>
            </li>
            <li>
              <Link
                className="text-sm flex items-center gap-2 font-[500] px-4 py-2 hover:bg-gray-100 rounded-md"
                to="/admin/soon"
              >
                <span className="ic text-lg leading-none">warehouse</span>
                <span className="leading-none">Manage products</span>
              </Link>
            </li>
          </ul>
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default AdminPage;
