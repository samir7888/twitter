import Home from "./pages/Home";
import { AuthGuard } from "./components/Auth/AuthGuard";
import LoginPage from "./pages/LoginPage";
import AuthLayout from "./components/layout/AuthLayout";
import HomeLayout from "./components/layout/HomeLayout";

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
    ],
  },
  {
    path: "/home",
    element: (
        <HomeLayout />
    ),
    children: [
      { path: "/home", element: <Home /> },
    ],
  },
];
