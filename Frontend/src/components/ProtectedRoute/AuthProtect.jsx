import React, { useContext } from "react";
import { AuthContext } from "../../Firebase/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

export default function AuthProtect({ children }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  if (user) {
    return <Navigate to={location?.state?.his || "/"} />;
  }
  if (!user) {
    return children;
  }
}
