import React, { JSX } from "react";
import LoginPage from "../../pages/LoginPage";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";

interface AuthGuardProps {
  children: ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps): JSX.Element => {
const {user,accessToken} = useAuth();
  const navigate = useNavigate();

  if (!accessToken) {
    navigate("/login", { replace: true }); // Redirect to login page if not authenticated
    return <LoginPage />; // Redirect to login page if not authenticated
  }
  localStorage.setItem("username", user?.username || "");
  return <>{children}</>;
};
