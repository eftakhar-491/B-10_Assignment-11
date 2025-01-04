import React, { useContext, useEffect, useState } from "react";
import world from "../assets/lottie/world.json";
import bg from "../assets/bg.png";
import Lottie from "lottie-react";
import Nav from "../components/Header/Nav";
import loader from "../assets/lottie/loader.json";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Firebase/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useSecureAxios";

import UptateArtifactModal from "../components/Modal/UptateArtifactModal";
import DeleteModal from "../components/Modal/DeleteModal";
import Footer from "../components/Footer/Footer";
import { Helmet } from "react-helmet-async";
export default function MyArtifacts() {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);
  const [modal, setModal] = useState({ isOpen: false, data: {} });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, data: {} });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["myartifacts"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/artifacts/myartifacts?email=${user?.email}`
      );

      return res.data;
    },
    // enabled: !loading,
  });

  return (
    <>
      <Helmet>
        <title>My Artifacts</title>
      </Helmet>
      <section
        style={{ backgroundImage: ` url(${bg})` }}
        className="fixed  h-screen w-full bg-cover bg-center bg-no-repeat"
      >
        <div className=" w-[600px] mx-auto absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Lottie animationData={world} loop={true}></Lottie>
        </div>
        <div className="fixed overflow-y-auto  w-screen backdrop-blur-lg bg-[#3FAEBB]/5 h-screen">
          <Nav />
          {isError && (
            <h1 className="text-3xl font-Roboto text-white text-center py-10">
              Data not found
            </h1>
          )}{" "}
          {isLoading || data.length === 0 ? (
            isLoading ? (
              <div className="max-w-[250px] mx-auto">
                <Lottie animationData={loader} loop={true}></Lottie>
              </div>
            ) : (
              <h1 className="text-2xl font-Roboto text-white text-center py-40">
                You are not added anything
              </h1>
            )
          ) : (
            <section className="min-h-screen w-11/12 mx-auto lg:w-4/5">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-white border-b-2 uppercase bg-transparent ">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Artifacr Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Artifacr Type
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Present Location
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Likes
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, i) => (
                      <tr key={"i" + i} className="bg-transparent border-b ">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {item.artifactName}
                        </th>
                        <td className="px-6 py-4">{item.artifactsType}</td>
                        <td className="px-6 py-4">{item.presentLocation}</td>
                        <td className="px-6 py-4 flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="size-4"
                          >
                            <path d="M1 8.25a1.25 1.25 0 1 1 2.5 0v7.5a1.25 1.25 0 1 1-2.5 0v-7.5ZM11 3V1.7c0-.268.14-.526.395-.607A2 2 0 0 1 14 3c0 .995-.182 1.948-.514 2.826-.204.54.166 1.174.744 1.174h2.52c1.243 0 2.261 1.01 2.146 2.247a23.864 23.864 0 0 1-1.341 5.974C17.153 16.323 16.072 17 14.9 17h-3.192a3 3 0 0 1-1.341-.317l-2.734-1.366A3 3 0 0 0 6.292 15H5V8h.963c.685 0 1.258-.483 1.612-1.068a4.011 4.011 0 0 1 2.166-1.73c.432-.143.853-.386 1.011-.814.16-.432.248-.9.248-1.388Z" />
                          </svg>
                          {item.like}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            onClick={() => {
                              setModal({ isOpen: true, data: item });
                            }}
                            className="cursor-pointer mr-2 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </span>
                          |
                          <span
                            onClick={() =>
                              setDeleteModal({ isOpen: true, data: item })
                            }
                            className="cursor-pointer ml-2 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Delete
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
          <Footer />
        </div>
      </section>
      {modal.isOpen && (
        <UptateArtifactModal data={modal.data} setModal={setModal} />
      )}
      {deleteModal.isOpen && (
        <DeleteModal data={deleteModal.data} setDeleteModal={setDeleteModal} />
      )}
    </>
  );
}
