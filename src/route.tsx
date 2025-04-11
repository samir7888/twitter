import Home from "./pages/Home";
import { AuthGuard } from "./components/Auth/AuthGuard";
import LoginPage from "./pages/LoginPage";
import AuthLayout from "./components/layout/AuthLayout";
import HomeLayout from "./components/layout/HomeLayout";
import Me from "./pages/Me";
import Persist from "./lib/Persist";
import { RegisterPage } from "./pages/RegisterPage";
import path from "path";
import SinglePost from "./components/home/SinglePost";

export const routes = [
  {
    path: "/",
    element: (
      <AuthGuard>
        <AuthLayout />
      </AuthGuard>
    ),
    children: [
      { index: true, element: <LoginPage /> },
      { path: "login", element: <LoginPage /> },
    ],
  },
  { path: "signup", element: <RegisterPage /> },

  {
    path: "/home",
    element: (
      <AuthGuard>
        <Persist>
          <HomeLayout />
        </Persist>
      </AuthGuard>
    ),
    children: [
      { index: true, element: <Home /> },
  
    ],
  },
  {
    path: "/:username",
    element: (
      <Persist>
        <HomeLayout />
      </Persist>
    ),
    children: [{ index: true, element: <Me /> },    { path:"status/:postId", element: <SinglePost /> }],
  },
  {
    path: "/settings",
    element: (
      <AuthGuard>
        <Persist>
          <HomeLayout />
        </Persist>
      </AuthGuard>
    ),
    children: [{ path: "profile", element: <Me /> }],
  },
];
