import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import AllArtifacts from "./Pages/AllArtifacts.jsx";
import LogIn from "./Pages/LogIn.jsx";
import Register from "./Pages/Register.jsx";
import AddArtifact from "./Pages/AddArtifact.jsx";
import MyArtifacts from "./Pages/MyArtifacts.jsx";
import LikedArtifact from "./Pages/LikedArtifact.jsx";
import ArtifactDetails from "./Pages/ArtifactDetails.jsx";
import AuthProtect from "./components/ProtectedRoute/AuthProtect.jsx";
import ComProtect from "./components/ProtectedRoute/ComProtect.jsx";
import Error from "./Pages/Error.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/artifacts",
        element: <AllArtifacts />,
      },
      {
        path: "/add-artifact",
        element: (
          <ComProtect>
            <AddArtifact />
          </ComProtect>
        ),
      },
      {
        path: "/my-artifacts",
        element: (
          <ComProtect>
            <MyArtifacts />
          </ComProtect>
        ),
      },
      {
        path: "/liked-artifacts",
        element: (
          <ComProtect>
            <LikedArtifact />
          </ComProtect>
        ),
      },
      {
        path: "/artifacts-details/:id",
        element: (
          <ComProtect>
            <ArtifactDetails />
          </ComProtect>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthProtect>
            <LogIn />,
          </AuthProtect>
        ),
      },
      {
        path: "/register",
        element: (
          <AuthProtect>
            <Register />
          </AuthProtect>
        ),
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
