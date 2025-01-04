import React, { useContext } from "react";
import world from "../assets/lottie/world.json";
import bg from "../assets/bg.png";
import Lottie from "lottie-react";
import loader from "../assets/lottie/loader.json";

import Nav from "../components/Header/Nav";
import goo from "../assets/google.png";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Firebase/AuthProvider";
import Footer from "../components/Footer/Footer";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
export default function LogIn() {
  const navigate = useNavigate();

  const { signInWithGoogle, setLoading, signIn, loading } =
    useContext(AuthContext);

  function handelGoogleLogin(e) {
    e.preventDefault();
    signInWithGoogle()
      .then(() => {
        toast.success("Login Success");
      })
      .catch(() => toast.error("something went wrong"));
  }
  function handelEmailPassLogin(e) {
    e.preventDefault();
    const email = e.target.floating_email.value;
    const pass = e.target.floating_password.value;

    signIn(email, pass)
      .then(() => {
        toast.success("Login Success");
      })
      .catch(() => {
        toast.error("something went wrong");
      });
  }
  return (
    <>
      <Helmet>
        <title>LogIn</title>
      </Helmet>
      <section
        style={{ backgroundImage: ` url(${bg})` }}
        className="fixed  h-screen w-full bg-cover bg-center bg-no-repeat"
      >
        <div className=" w-[600px] mx-auto absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Lottie animationData={world} loop={true}></Lottie>
        </div>
        <div className="fixed overflow-y-auto w-screen backdrop-blur-lg bg-[#3FAEBB]/5 h-screen">
          <Nav />
          {loading ? (
            <div className="max-w-[250px] mx-auto">
              <Lottie animationData={loader} loop={true}></Lottie>
            </div>
          ) : (
            <form
              onSubmit={handelEmailPassLogin}
              className="shadow-2xl mt-14 border-2 p-4 rounded-lg w-11/12 md:max-w-md mx-auto text-white"
            >
              <label className="text-2xl font-Roboto font-bold">
                Log In to ChronoCraft
              </label>
              <div className="relative z-0 w-full mb-5 mt-3  group">
                <input
                  type="email"
                  name="floating_email"
                  id="floating_email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Email address
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="password"
                  name="floating_password"
                  id="floating_password"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_password"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Password
                </label>
              </div>
              <p className="text-sm text-right -mt-3 cursor-pointer">
                Forget Password
              </p>
              <button
                type="submit"
                className="w-full justify-center  active:scale-95 hover:bg-[#153438] flex items-center gap-2 text-lg mt-5 border-2 px-6 py-1 rounded-xl"
              >
                LogIn{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </button>
              <p className="text-center mt-4">-------- OR --------</p>
              <button
                onClick={handelGoogleLogin}
                className="w-full justify-center  active:scale-95 hover:bg-[#153438] flex items-center gap-2 text-lg mt-5 border-2 px-6 py-1 rounded-xl"
              >
                <img className="w-6" src={goo} alt="" />
                Continue with Google
              </button>
              <p className="mt-4 text-center">
                --- Don't have an account?{" "}
                <span
                  onClick={() => navigate("/register")}
                  className="cursor-pointer "
                >
                  Register
                </span>{" "}
                ---
              </p>
            </form>
          )}
          <Footer />
        </div>
      </section>
    </>
  );
}
