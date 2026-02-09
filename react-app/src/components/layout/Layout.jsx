import { Outlet } from "react-router-dom";
import Header from "./Header";
import MainNav from "./MainNav";
import Footer from "./Footer";
import CartDrawer from "../cart/CartDrawer";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <MainNav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
