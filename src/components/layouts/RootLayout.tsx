import { Outlet } from "react-router-dom";
import Toaster from "../Toaster/Toaster";
import Header from "../Header/Header";
import Footer from "../Footer";

function RootLayout() {
  return (
    <>
      <Toaster />
      <Header />
      <main className="p-2 flex-1 overflow-x-hidden overflow-y-scroll">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default RootLayout;
