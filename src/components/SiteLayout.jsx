import { Outlet } from "react-router";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function SiteLayout() {
  return (
    <div className="flex min-h-full flex-col">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
