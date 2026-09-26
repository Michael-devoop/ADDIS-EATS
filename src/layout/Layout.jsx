import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="main-wrapper">
      <Nav />

      {/* Main Content */}
      <div className="page-wrapper">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}