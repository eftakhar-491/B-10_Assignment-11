import React, { useContext } from "react";
import fb from "../../assets/icon/fb.png";
import yt from "../../assets/icon/yt.png";
import indin from "../../assets/icon/in.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Firebase/AuthProvider";
import useAxiosSecure from "../../hooks/useSecureAxios";
import { toast } from "react-toastify";
export default function Footer() {
  const { pathname } = useLocation();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  function handelFeedback(e) {
    e.preventDefault();
    if (!user?.email) {
      navigate("/login");
      return;
    }
    const feedBack = {
      email: user?.email,
      name: user?.displayName,
      message: e.target.feedBackMessage.value,
      time: Date.now(),
    };

    axiosSecure
      .post(`/artifacts/feedback?email=${user?.email}`, feedBack)
      .then(() => {
        toast.success("Feedback Sent");
        e.target.reset();
      })
      .catch(() => {
        toast.error("Something went wrong! try again");
      });
  }
  return (
    <>
      <footer
        className={` bottom-0 ${
          pathname === "/" ? "text-black" : "text-white"
        } mt-14`}
      >
        <hr />
        <div className="flex lg:flex-row flex-col gap-6 lg:items-center justify-between w-11/12 mx-auto py-10 lg:w-4/5">
          <div className="flex-1">
            <h1 className="text-3xl font-Cinzel font-semibold">Chrono Craft</h1>
            <ul className="text-sm font-Roboto mt-3">
              <Link to={"/"}>
                <li className="cursor-pointer">Home</li>
              </Link>
              <Link to={"/artifacts"}>
                <li className="cursor-pointer">All Artifacts</li>
              </Link>
            </ul>
            <div className=" flex gap-1 mt-2">
              <img className="w-9 h-9" src={fb} alt="" />
              <img className="w-9 h-9" src={indin} alt="" />
              <img className="w-9 h-9" src={yt} alt="" />
            </div>
          </div>

          <ul className="flex-1 fontRoboto text-sm">
            <li className="text-3xl font-Cinzel font-semibold mb-3">
              Condition's
            </li>
            <li>Privecy Policy</li>
            <li>Terms and Condition</li>
            <li>Copy rights</li>
          </ul>
          <form
            onSubmit={handelFeedback}
            className={`flex-1  border p-4 md:w-64 rounded-md shadow-sm ${
              pathname === "/" ? "text-black" : "text-white"
            }`}
          >
            <label className="text-3xl font-Cinzel font-semibold">
              FeedBack!
            </label>
            <div className="relative z-0 w-full mt-2 mb-5 group">
              <input
                type="email"
                name="feedBack"
                id="feedBack"
                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                disabled
                defaultValue={user?.email ? user?.email : ""}
              />
              <label
                htmlFor="seach"
                className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email
              </label>
            </div>
            <label className="text-sm font-semibold">FeedBack!</label>
            <div className="relative z-0 w-full mt-2 mb-5 group">
              <textarea
                name="feedBackMessage"
                id="message"
                rows="4"
                className="block p-3 w-full text-sm rounded-lg border border-white focus:ring-blue-500 focus:border-blue-500 bg-transparent"
                placeholder="Write you feed back here..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="border hover:bg-[#0E2A2E]/10 w-full  flex items-center justify-center rounded-lg h-10 "
            >
              Send
            </button>
          </form>
        </div>
        <hr />
        <p className="py-4 text-center text-sm">
          All Rights Reserved@CHRONO CRAFT
        </p>
      </footer>
    </>
  );
}
