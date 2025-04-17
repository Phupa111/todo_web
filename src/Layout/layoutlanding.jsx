import Footer from "../components/fotter/fotter";
import NavbarApp from "../components/Navbar/navbar";
import { Outlet } from "react-router-dom";

const Layoutlanding = () => {
  return (
    <div className="flex flex-col">
      <NavbarApp />
      <Outlet />
      <Footer />
    </div>
  );
};
export default Layoutlanding;
