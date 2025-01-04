import React, { useEffect, useState } from "react";

import axios from "axios";
import Lottie from "lottie-react";
import loader from "../assets/lottie/loader.json";
import { toast } from "react-toastify";

export default function Reviews() {
  const [fdata, setFdata] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APIURL}/artifacts/feedback`)
      .then((res) => {
        setFdata(res.data);
      })
      .catch(() => {
        toast.error("something went wrong ! reload the page");
      });
  }, []);

  return (
    <>
      <section className="my-8 w-11/12 mx-auto lg:w-4/5">
        <div className="container mx-auto flex flex-col items-center pb-6 mb-4 md:p-10 md:px-12">
          <h1 className="font-Cinzel font-semibold md:text-4xl leading-none text-center">
            --- What our Viewer are saying ---
          </h1>
          <p className="text-sm font-Roboto text-center max-w-[600px] mx-auto">
            See what our viewers have to say about their journey through history
            with ChronoCraft. Their stories and experiences bring the artifacts
            to life!
          </p>
        </div>
        {fdata?.length === 0 ? (
          <div className="max-w-[250px] mx-auto">
            <Lottie animationData={loader} loop={true}></Lottie>
          </div>
        ) : (
          <div className="container mx-auto grid grid-cols-1 gap-8 lg:gap-20 md:px-10 md:pb-10 lg:grid-cols-2">
            {fdata?.map((item, i) => (
              <div
                key={"R" + i}
                className="flex flex-col items-center md:mx-12 lg:mx-0"
              >
                <div className="relative text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    fill="currentColor"
                    className="absolute top-0 left-0 w-8 h-8 dark:text-gray-300"
                  >
                    <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                    <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
                  </svg>
                  <p className="md:px-6 px-4 py-1 text-lg italic">
                    {item?.message}
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    fill="currentColor"
                    className="absolute bottom-0 right-0 w-8 h-8 dark:text-gray-300"
                  >
                    <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
                    <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
                  </svg>
                </div>
                <span className="w-12 h-1 my-2 rounded-lg dark:bg-violet-600"></span>
                <p>{item?.name}</p>
              </div>
            ))}
          </div>
        )}{" "}
      </section>
    </>
  );
}
