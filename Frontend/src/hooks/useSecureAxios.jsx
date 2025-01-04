import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Firebase/AuthProvider";
export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_APIURL,
  withCredentials: true,
  timeout: 10000,
  headers: { "X-Custom-Header": "foobar" },
});

const useAxiosSecure = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => res,

      async (error) => {
        if (
          error?.response?.status === 401 ||
          error?.response?.status === 403
        ) {
          const res = await logOut();

          if (res.success) {
            alert("Session Expired, Please Login Again");
            navigate("/login");
          }
        }
      }
    );
  }, []);
  return axiosSecure;
};

export default useAxiosSecure;
