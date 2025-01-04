import { AuthContext } from "../../Firebase/AuthProvider";
import React, { useContext, useEffect } from "react";
import world from "../../assets/lottie/world.json";
import bg from "../../assets/bg.png";
import Lottie from "lottie-react";
import Nav from "../Header/Nav";
import { Navigate, useLocation } from "react-router-dom";
import loader from "../../assets/lottie/loader.json";

export default function ComProtect({ children }) {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <section
        style={{ backgroundImage: ` url(${bg})` }}
        className="fixed  h-screen w-full bg-cover bg-center bg-no-repeat"
      >
        <div className=" w-[600px] mx-auto absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Lottie animationData={world} loop={true}></Lottie>
        </div>
        <div className="fixed overflow-y-auto  w-screen backdrop-blur-lg bg-[#3FAEBB]/5 h-screen">
          <Nav />
          <div className="text-white">
            <div className="max-w-[250px] mx-auto">
              <Lottie animationData={loader} loop={true}></Lottie>
            </div>
          </div>
        </div>
      </section>
    );
  }
  if (!user)
    return <Navigate to="/login" state={{ his: location?.state?.his }} />;
  if (user) {
    return children;
  }
}
