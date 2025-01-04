import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import useAxiosSecure from "../hooks/useSecureAxios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Firebase/AuthProvider";
import loader from "../assets/lottie/loader.json";
import Lottie from "lottie-react";

export default function Featured() {
  const [z, setZ] = useState(true);

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const {
    data,
    isLoading,
    isError,
    isSuccess: x,
  } = useQuery({
    queryKey: ["featuredArtifacts"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/artifacts/home`);
      return res?.data;
    },
  });

  const { mutate, data: addFlikedata } = useMutation({
    mutationKey: ["artifactsMyLikes"],

    mutationFn: async (x) =>
      await axiosSecure.post(`/artifacts/likes?email=${user?.email}`, x),
    onSuccess: () => {
      queryClient.invalidateQueries(["featuredArtifacts", "artifactsLikes4"]);
      setZ(true);
    },
  });
  function handelFLike(clickedId) {
    if (!x || !y || !z) {
      return;
    }
    if (user) {
      mutate({ id: clickedId, email: user?.email });
      setZ(false);
    } else {
      navigate("/login");
    }
  }
  const { data: Flikes, isSuccess: y } = useQuery({
    queryKey: ["artifactsLikes4"],
    enabled: user?.email ? true : false,
    queryFn: async () =>
      await axiosSecure.get(`/artifacts/likes/${user?.email}`),
  });
  const likesFDataArr = Flikes?.data?.map((x) => x.id);

  return (
    <>
      <section className="mt-14">
        <div>
          <h1 className="text-xl md:text-4xl font-Cinzel text-center">
            ---Featured Artifacts---{" "}
          </h1>
          <p className="text-sm font-Roboto text-center max-w-[600px] mx-auto">
            Explore the treasures of time with our featured artifacts, each
            telling a unique story from history. Discover the wonders of the
            past and add a piece of legacy to your collection.
          </p>
        </div>
        {isError && (
          <h1 className="text-xl font-Rancho text-center py-44">
            Data Not found
          </h1>
        )}
        {isLoading ? (
          <div className="max-w-[250px] mx-auto">
            <Lottie animationData={loader} loop={true}></Lottie>
          </div>
        ) : (
          <div className="w-11/12 mx-auto lg:w-4/5 grid grid-cols-1 justify-items-center md:grid-cols-2 mt-10">
            {data?.map((item, i) => (
              <div
                key={"f" + i}
                className="w-[300px] xl:w-fit flex xl:flex-row flex-col items-center gap-4 p-5 rounded-xl shadow-lg"
              >
                <img
                  className="w-[260px] h-[250px] rounded-xl shadow-lg"
                  src={item?.photo}
                  alt=""
                />
                <div>
                  <h1 className="text-3xl font-Rancho">{item?.artifactName}</h1>
                  <p className="text-sm font-Roboto ">
                    {item?.artifactContext}
                  </p>
                  <div className="mt-3">
                    <div className="flex items-center gap-1">
                      <span
                        onClick={() => handelFLike(item?._id)}
                        className=" cursor-pointer"
                      >
                        {likesFDataArr?.includes(item._id) ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-6"
                          >
                            <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                            />
                          </svg>
                        )}
                      </span>
                      {item?.like} Likes
                    </div>
                    <button
                      onClick={() =>
                        navigate(`/artifacts-details/${item?._id}`)
                      }
                      className="active:scale-95 hover:border-black hover:bg-slate-200 flex items-center gap-2 text-lg mt-2 border-2 px-6 py-1 rounded-xl"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <button
          onClick={() => navigate("/artifacts")}
          className="font-Cinzel active:scale-95 mx-auto mt-7 hover:bg-slate-200 flex items-center gap-2 text-sm md:text-lg border-2 px-6 py-1 rounded-xl"
        >
          ---Show All Artifacts---
        </button>
      </section>
    </>
  );
}
