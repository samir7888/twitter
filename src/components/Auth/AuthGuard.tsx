import { useAuth } from "@/context/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

export const AuthGuard = ({children}:{children:React.ReactNode}) => {
  const { accessToken } = useAuth();
  const location = useLocation();

  // ✅ If user is not authenticated, redirect to login page
  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ✅ If authenticated, render the nested route
  return children;
};
