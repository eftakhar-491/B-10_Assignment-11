import React, { useContext } from "react";
import world from "../assets/lottie/world.json";
import loader from "../assets/lottie/loader.json";
import bg from "../assets/bg.png";
import Lottie from "lottie-react";
import Nav from "../components/Header/Nav";
import goo from "../assets/google.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Firebase/AuthProvider";
import Footer from "../components/Footer/Footer";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
export default function Register() {
  const navigate = useNavigate();
  const {
    createUser,
    loading,
    setLoading,
    updateUserProfile,
    signInWithGoogle,
  } = useContext(AuthContext);
  function isPasswordValid(password) {
    const regex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
    return regex.test(password);
  }
  const handelEmailRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.floating_email.value;
    const pass = e.target.floating_password.value;
    if (!isPasswordValid(pass)) {
      toast.warning(
        "Password must contain 6 characters , 1 upper 1 lower case letter"
      );
      return;
    }
    createUser(email, pass)
      .then(() => {
        updateUserProfile(name, photo)
          .then(() => {
            toast.success("Register Success");
          })
          .catch(() => {
            toast.error("profile not updated");
          });
      })
      .catch(() => {
        toast.error("something went wrong");
      });
  };
  const handelGoogleRegister = (e) => {
    e.preventDefault();
    signInWithGoogle()
      .then(() => {
        toast.success("LogIn Success");
      })
      .catch(() => {
        toast.error("something went wrong");
      });
  };
  return (
    <>
      <Helmet>
        <title>Register</title>
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
              onSubmit={handelEmailRegister}
              className="shadow-2xl mt-8 border-2 p-4 rounded-lg w-11/12 md:max-w-md mx-auto text-white"
            >
              <label className="text-2xl font-Roboto font-bold">
                Create an account
              </label>
              <div className="relative z-0 w-full mt-2 mb-5 group">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Full Name
                </label>
              </div>
              <div className="relative z-0 w-full mt-2 mb-5 group">
                <input
                  type="text"
                  name="photo"
                  id="photo"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="photo"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Photo URL
                </label>
              </div>
              <div className="relative z-0 w-full mt-2 mb-5 group">
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

              <button
                type="submit"
                className="w-full justify-center  active:scale-95 hover:bg-[#153438] flex items-center gap-2 text-lg mt-5 border-2 px-6 py-1 rounded-xl"
              >
                Register Now{" "}
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
                onClick={handelGoogleRegister}
                className="w-full justify-center  active:scale-95 hover:bg-[#153438] flex items-center gap-2 text-lg mt-5 border-2 px-6 py-1 rounded-xl"
              >
                <img className="w-6" src={goo} alt="" />
                Continue with Google
              </button>
              <p className="mt-4 text-center">
                --- Have an account?{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="cursor-pointer "
                >
                  Login
                </span>{" "}
                ---
              </p>
            </form>
          )}{" "}
          <Footer />
        </div>
      </section>
    </>
  );
}
