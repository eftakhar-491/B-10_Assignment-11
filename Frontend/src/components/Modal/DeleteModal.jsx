import React, { useContext } from "react";
import useAxiosSecure from "../../hooks/useSecureAxios";
import { useMutation } from "@tanstack/react-query";
import { AuthContext } from "../../Firebase/AuthProvider";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function DeleteModal({ data, setDeleteModal }) {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const quaryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["deleteArtifact"],
    mutationFn: async () => {
      const res = await axiosSecure.delete(
        `/artifacts/delete/${data._id}?email=${user?.email}`
      );
      return res.data;
    },
    onSuccess: () => {
      quaryClient.invalidateQueries(["myartifacts"]);
      setDeleteModal({ isOpen: false, data: {} });
      navigate("/artifacts");
      toast.warning("Artifact Deleted");
    },
  });
  function handelDelete(e) {
    e.preventDefault();
    mutate();
  }
  return (
    <>
      <section className="flex items-center justify-center backdrop-blur-lg overflow-y-auto fixed w-screen h-screen z-50">
        <div className="w-11/12 md:w-[500px] border p-3 rounded-xl text-white shadow-2xl ">
          <h1 className="text-2xl text-center">Are you Sure? </h1>
          <div className="text-center">you want to delete this artifact?</div>
          <div className="flex flex-col md:flex-row md:gap-3">
            <button
              onClick={handelDelete}
              className="w-full justify-center  active:scale-95 hover:bg-[#853438] flex items-center gap-2 text-lg mt-5 border-2 px-6 py-1 rounded-xl"
            >
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
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>{" "}
              Delete Artifact{" "}
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setDeleteModal({ isOpen: false, data: {} });
              }}
              className="w-full justify-center  active:scale-95 hover:bg-[#153438] flex items-center gap-2 text-lg mt-5 border-2 px-6 py-1 rounded-xl"
            >
              Cancel
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
