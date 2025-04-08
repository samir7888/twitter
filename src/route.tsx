import Home from "./pages/Home";
import { AuthGuard } from "./components/Auth/AuthGuard";
import LoginPage from "./pages/LoginPage";
import AuthLayout from "./components/layout/AuthLayout";
import HomeLayout from "./components/layout/HomeLayout";
import Me from "./pages/Me";

export const routes = [
  {
    path: "/",
    element: (
      <AuthGuard>
        <AuthLayout />
      </AuthGuard>
    ),
    children: [
      { path: "/", element: <LoginPage /> },
      { path: "/login", element: <LoginPage /> },
      // Use a parameter instead of hardcoded username
    ],
  },
  {
    path: "/home",
    element: <HomeLayout />,
    children: [{ path: "/home", element: <Home /> }],
  },
  {
    path: "/:username",
    element: <HomeLayout />,
    children: [{ path: "/:username", element: <Me /> }],
  },
  {
    path: "/settings/profile",
    element: <HomeLayout />,
    children: [{ path: "/settings/profile", element: <Me /> }],
  },
];
