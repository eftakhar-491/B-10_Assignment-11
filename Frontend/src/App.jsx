import React, { useState } from "react";
import "./components/style.css";
import { Outlet } from "react-router-dom";
import AuthProvider from "./Firebase/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import StateContext from "./context/StateContext";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const queryClient = new QueryClient();

export default function App() {
  const [detailsId, setDetailsId] = useState("");
  return (
    <>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <StateContext.Provider value={{ detailsId, setDetailsId }}>
            <AuthProvider>
              <Outlet />
              <ToastContainer />
            </AuthProvider>
          </StateContext.Provider>
        </QueryClientProvider>
      </HelmetProvider>
    </>
  );
}
