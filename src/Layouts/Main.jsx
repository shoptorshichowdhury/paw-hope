import Footer from "@/Pages/Shared/Footer/Footer";
import Navbar from "@/Pages/Shared/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className="font-poppins">
      <Navbar></Navbar>
      <div className="min-h-[calc(100vh-246px)]">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Main;
