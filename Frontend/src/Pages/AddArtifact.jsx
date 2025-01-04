import React, { useContext } from "react";
import world from "../assets/lottie/world.json";
import bg from "../assets/bg.png";
import Lottie from "lottie-react";
import Nav from "../components/Header/Nav";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Firebase/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useSecureAxios";
import Footer from "../components/Footer/Footer";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";

export default function AddArtifact() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const {
    data,
    mutate: addArtifacts,
    isError,
  } = useMutation({
    mutationFn: (data) =>
      axiosSecure.post(`/artifacts?email=${user?.email}`, data),
  });
  const handelAddArtifact = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const pureFormData = Object.fromEntries(formData.entries());
    const data = {
      ...pureFormData,
      createdAt: new Date().toLocaleDateString(),
      creatorEmail: user?.email,
      creatorName: user?.displayName,
      like: 0,
    };

    addArtifacts(data, {
      onSuccess: () => {
        toast.success("Artifact Added Successfully");
        e.target.reset();
      },
    });
  };

  return (
    <>
      <Helmet>
        <title>Add Artifact</title>
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
          <form
            onSubmit={handelAddArtifact}
            className="shadow-2xl mt-0 border-2 p-4 rounded-lg w-11/12 md:max-w-xl mx-auto text-white"
          >
            <label className="text-2xl font-Cinzel block  text-center font-bold">
              Add Artifact Info
            </label>
            <div className="relative z-0 w-full mt-2 mb-5 group">
              <input
                type="text"
                name="creator"
                id="creator"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                disabled
                defaultValue={user?.displayName}
              />
              <label
                htmlFor="creator"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Your Names
              </label>
            </div>
            <div className="relative z-0 w-full mt-2 mb-5 group">
              <input
                type="email"
                name="creatorEmail"
                id="creatorEmail"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                disabled
                defaultValue={user?.email}
              />
              <label
                htmlFor="creatorEmail"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Your Email
              </label>
            </div>

            <div className="relative z-0 w-full mt-2 mb-5 group">
              <input
                type="text"
                name="artifactName"
                id="artifactName"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="artifactName"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Artifact Name
              </label>
            </div>
            <div className="relative z-0 w-full mt-2 mb-5 group">
              <input
                type="url"
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
                Artifact Image (Valid URL)
              </label>
            </div>
            <div>
              <label
                htmlFor="artifactsType"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select your artifact type
              </label>
              <select
                name="artifactsType"
                id="countries"
                className="bg-[#112D31]/50 backdrop-blur-sm  border text-white border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
              >
                <option value="Tools">Tools</option>
                <option value="Weapons">Weapons</option>
                <option value="Documents">Documents</option>
                <option value="Writings">Writings</option>
              </select>
            </div>

            <div className="relative z-0 w-full mt-2 mb-5 group">
              <textarea
                name="artifactContext"
                id="message"
                rows="4"
                className="block p-3 w-full text-sm text-white rounded-lg border border-white focus:ring-blue-500 focus:border-blue-500 bg-transparent"
                placeholder="Historical Context..."
                required
              ></textarea>
            </div>

            <div className="relative flex-1">
              <label className="text-sm">Discovered At</label>
              <input
                name="discoveredAt"
                id="default-datepicker"
                type="date"
                className=" border border-white text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 bg-transparent"
                placeholder="Select date"
                required
              />
            </div>

            <div className="relative z-0 w-full mt-5 mb-5 group">
              <input
                type="text"
                name="discoveredBy"
                id="discoveredBy"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="discoveredBy"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Discovered By
              </label>
            </div>
            <div className="relative z-0 w-full mt-2 mb-5 group">
              <input
                type="text"
                name="presentLocation"
                id="presentLocation"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="presentLocation"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Present Location
              </label>
            </div>

            <button
              type="submit"
              className="w-full justify-center  active:scale-95 hover:bg-[#153438] flex items-center gap-2 text-lg mt-5 border-2 px-6 py-1 rounded-xl"
            >
              Add Artifact{" "}
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
          </form>
          <Footer />
        </div>
      </section>
    </>
  );
}
