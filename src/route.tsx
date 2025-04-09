import Home from "./pages/Home";
import { AuthGuard } from "./components/Auth/AuthGuard";
import LoginPage from "./pages/LoginPage";
import AuthLayout from "./components/layout/AuthLayout";
import HomeLayout from "./components/layout/HomeLayout";
import Me from "./pages/Me";
import Persist from "./lib/Persist";

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
  {
    path: "/home",
    element: (
      <Persist>
        <HomeLayout />
      </Persist>
    ),
    children: [
      { index: true, element: <Home /> }
    ],
  },
  {
    path: "/:username",
    element: (
      <Persist>
        <HomeLayout />
      </Persist>
    ),
    children: [
      { index: true, element: <Me /> }
    ],
  },
  {
    path: "/settings",
    element: (
      <Persist>
        <HomeLayout />
      </Persist>
    ),
    children: [
      { path: "profile", element: <Me /> }
    ],
  },
];