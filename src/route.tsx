import Home from "./pages/Home";
import { AuthGuard } from "./components/Auth/AuthGuard";
import LoginPage from "./pages/LoginPage";
import AuthLayout from "./components/layout/AuthLayout";
import HomeLayout from "./components/layout/HomeLayout";
import Me from "./pages/Me";
import Persist from "./lib/Persist";
import { RegisterPage } from "./pages/RegisterPage";
import SinglePost from "./components/Home/SinglePost";
import Social from "./pages/Social";

// ✅ Public Routes
const publicRoutes = [
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <RegisterPage /> },
    ],
  },
];

// ✅ Protected Routes (wrapped in Persist + AuthGuard)
const protectedRoutes = [
  {
    path: "/home",
    element: (
      <Persist>
        <AuthGuard>
          <HomeLayout />
        </AuthGuard>
      </Persist>
    ),
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: "/:username",
    element: (
      <Persist>
        <AuthGuard>
          <HomeLayout />
        </AuthGuard>
      </Persist>
    ),
    children: [
      { index: true, element: <Me /> },
      { path: "status/:postId", element: <SinglePost /> },
      { path: ":tab", element: <Social /> },
    ],
  },
  {
    path: "/settings",
    element: (
      <Persist>
        <AuthGuard>
          <HomeLayout />
        </AuthGuard>
      </Persist>
    ),
    children: [{ path: "profile", element: <Me /> }],
  },
];

// ✅ Combine them
export const routes = [...publicRoutes, ...protectedRoutes];
